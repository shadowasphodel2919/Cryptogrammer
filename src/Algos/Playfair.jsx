import React, { useState, useEffect } from "react";
import "./CipherPage.css";

const Playfair = () => {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("encode");
  const [key, setKey] = useState("SECRET");
  const [playSq, setPlaySq] = useState([]);
  const [error, setError] = useState("");

  const buildPlayfairSquare = (keyGen) => {
    let keyUpper = keyGen.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
    // Remove duplicates
    let uniqueKey = Array.from(new Set(keyUpper.split(''))).join('');
    
    let square = new Array(5);
    for(let i = 0; i < 5; i++){
      square[i] = new Array(5);
    }
    
    let j = 0, i = 0, k = 0;
    while(k < uniqueKey.length){
      square[i][j++] = uniqueKey.charAt(k);
      if(j === 5){
        j = 0;
        i++;
      }
      k++;
    }
    
    for(let ch = 65; ch <= 90; ch++){
      let char = String.fromCharCode(ch);
      if(char === 'J') continue;
      if(uniqueKey.indexOf(char) === -1){
        square[i][j++] = char;
        if(j === 5){
          j = 0;
          i++;
        }
        if(i === 5) break;
      }
    }
    return square;
  }

  useEffect(() => {
    setPlaySq(buildPlayfairSquare(key));
    if (/(.).*\1/.test(key)) {
      setError("Warning: Key has repeated characters. Duplicates are ignored.");
    } else {
      setError("");
    }
  }, [key]);

  const formatMessage = (msg) => {
    let newText = "";
    msg = msg.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
    let i = 0;
    for(i = 0; i < msg.length - 1; i += 2){
      if(msg[i] !== msg[i+1]){
        newText += msg[i] + msg[i+1];
      } else {
        newText += msg[i] + 'X';
        i--; // Re-evaluate the second character in the next pair
      }
    }
    if(i < msg.length) newText += msg[i];
    if(newText.length % 2 !== 0){
      newText += 'X';
    }
    return newText;
  }

  const processPair = (a, b, square, encodeMode) => {
    let indexA = [-1, -1], indexB = [-1, -1];
    for(let i = 0; i < 5; i++){
      for(let j = 0; j < 5; j++){
        if(square[i][j] === a) indexA = [i, j];
        if(square[i][j] === b) indexB = [i, j];
      }
    }
    
    // Fallback if char not found (shouldn't happen with sanitized input)
    if (indexA[0] === -1 || indexB[0] === -1) return a + b;

    let shift = encodeMode ? 1 : 4; // Adding 4 is equivalent to subtracting 1 modulo 5

    if(indexA[0] === indexB[0]){
      // Same row
      return square[indexA[0]][(indexA[1] + shift) % 5] + square[indexB[0]][(indexB[1] + shift) % 5];
    } else if(indexA[1] === indexB[1]){
      // Same column
      return square[(indexA[0] + shift) % 5][indexA[1]] + square[(indexB[0] + shift) % 5][indexB[1]];
    } else {
      // Rectangle
      return square[indexA[0]][indexB[1]] + square[indexB[0]][indexA[1]];
    }
  }

  const encode = (msg, keyStr) => {
    if (!msg || !keyStr) return msg;
    let square = buildPlayfairSquare(keyStr);
    let formattedMsg = formatMessage(msg);
    let res = '';
    for(let i = 0; i < formattedMsg.length - 1; i += 2){
      res += processPair(formattedMsg[i], formattedMsg[i+1], square, true);
    }
    return res;
  }

  const decode = (cpr, keyStr) => {
    if (!cpr || !keyStr) return cpr;
    let square = buildPlayfairSquare(keyStr);
    let formattedCpr = cpr.toUpperCase().replace(/[^A-Z]/g, '');
    if (formattedCpr.length % 2 !== 0) return cpr; // Invalid ciphertext length
    
    let res = '';
    for(let i = 0; i < formattedCpr.length - 1; i += 2){
      res += processPair(formattedCpr[i], formattedCpr[i+1], square, false);
    }
    return res;
  }

  const plaintext = mode === "encode" ? text : decode(text, key);
  const ciphertext = mode === "encode" ? encode(text, key) : text;

  return (
    <div className="cipher-container">
      <div className="cipher-header">
        <h1>Playfair Cipher</h1>
        
        <div className="cipher-definition">
          <h3>What is it?</h3>
          <p>
            The Playfair cipher is a manual symmetric encryption technique and was the first literal digraph 
            substitution cipher. The scheme encrypts pairs of letters (digraphs), instead of single letters 
            as is the case with simple substitution ciphers like Caesar. It uses a 5x5 grid of letters constructed 
            using a secret keyword.
          </p>
        </div>

        <div className="cipher-example">
          <div className="cipher-example-title">Example (Key = SECRET)</div>
          <div>Plaintext:  HELLO WORLD (Formatted to HELXLO WORLD)</div>
          <div>Ciphertext: CD QY NT VN TI</div>
        </div>
      </div>

      <div className="cipher-sandbox">
        <div className="sandbox-title">Interactive Sandbox</div>
        
        <div className="input-group">
          <label>Secret Key</label>
          <input 
            type="text" 
            value={key} 
            onChange={(e) => setKey(e.target.value.toUpperCase())}
            placeholder="Enter key (A-Z)"
          />
          {error && <span style={{ color: 'var(--color-warning)', fontSize: '0.8rem', marginTop: '4px' }}>{error}</span>}
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Plaintext</label>
            <textarea 
              value={plaintext}
              onChange={(e) => {
                setMode("encode");
                setText(e.target.value);
              }}
              placeholder="Type message here..."
            />
          </div>

          <div className="input-group">
            <label>Ciphertext</label>
            <textarea 
              value={ciphertext}
              onChange={(e) => {
                setMode("decode");
                setText(e.target.value);
              }}
              placeholder="Or type ciphertext here..."
            />
          </div>
        </div>

        {playSq.length > 0 && (
          <div style={{ marginTop: '1.5rem', alignSelf: 'center' }}>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', textAlign: 'center' }}>
              Playfair Key Square
            </div>
            <table style={{ borderCollapse: 'collapse', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', overflow: 'hidden' }}>
              <tbody>
                {playSq.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, columnIndex) => (
                      <td key={columnIndex} style={{ 
                        width: '40px', height: '40px', 
                        textAlign: 'center', 
                        border: '1px solid var(--border-color)',
                        color: 'var(--accent-color)',
                        fontWeight: 'bold',
                        fontSize: '1.2rem'
                      }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Playfair;
