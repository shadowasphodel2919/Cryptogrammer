import React, { useState } from "react";
import "./CipherPage.css";

const PolybiusCipher = () => {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("encode"); // 'encode' or 'decode'

  const polybiusGrid = [
    ['A', 'B', 'C', 'D', 'E'],
    ['F', 'G', 'H', 'I', 'K'], // J is mapped to I
    ['L', 'M', 'N', 'O', 'P'],
    ['Q', 'R', 'S', 'T', 'U'],
    ['V', 'W', 'X', 'Y', 'Z']
  ];

  const encode = (txt) => {
    if (!txt) return "";
    const upperCaseInput = txt.toUpperCase();
    
    function findCoordinates(letter) {
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          if (polybiusGrid[i][j] === letter) {
            return `${i + 1}${j + 1}`;
          }
        }
      }
      return "";
    }

    let result = "";
    for (let char of upperCaseInput) {
      if (char === 'J') char = 'I';
      
      if (char >= 'A' && char <= 'Z') {
        result += findCoordinates(char) + " ";
      } else if (char === ' ') {
        result += "  "; // double space for word separation
      } else {
        result += char + " "; // preserve punctuation
      }
    }
    return result.trim();
  };

  const decode = (cpr) => {
    if (!cpr) return "";
    let result = "";
    let i = 0;
    
    while (i < cpr.length) {
      if (cpr[i] === ' ') {
        if (i + 1 < cpr.length && cpr[i+1] === ' ') {
          result += ' ';
          i += 2;
        } else {
          i++;
        }
        continue;
      }

      // Check if we have two digits
      if (cpr[i] >= '1' && cpr[i] <= '5' && i + 1 < cpr.length && cpr[i+1] >= '1' && cpr[i+1] <= '5') {
        let row = parseInt(cpr[i]) - 1;
        let col = parseInt(cpr[i+1]) - 1;
        result += polybiusGrid[row][col];
        i += 2;
      } else {
        // If it's not a valid 1-5 digit pair, just append the character directly
        result += cpr[i];
        i++;
      }
    }
    return result;
  };

  const plaintext = mode === "encode" ? text : decode(text);
  const ciphertext = mode === "encode" ? encode(text) : text;

  return (
    <div className="cipher-container">
      <div className="cipher-header">
        <h1>Polybius Square</h1>
        
        <div className="cipher-definition">
          <h3>What is it?</h3>
          <p>
            The Polybius square is a device invented by the ancient Greek historian and scholar Polybius. 
            It is used to fractionate plaintext characters so that they can be represented by a smaller set of symbols, 
            which is useful for telegraphy, steganography, and cryptography. The alphabet is laid out in a 5x5 grid, 
            and each letter is replaced by its coordinates (row and column) in the grid.
          </p>
        </div>

        <div className="cipher-example">
          <div className="cipher-example-title">Example</div>
          <div>Plaintext:  HELLO WORLD</div>
          <div>Ciphertext: 23 15 31 31 34  52 34 42 31 14</div>
        </div>
      </div>

      <div className="cipher-sandbox">
        <div className="sandbox-title">Interactive Sandbox</div>

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
            <label>Ciphertext (Coordinates)</label>
            <textarea 
              value={ciphertext}
              onChange={(e) => {
                setMode("decode");
                setText(e.target.value);
              }}
              placeholder="e.g. 23 15 31 31 34"
            />
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', alignSelf: 'center' }}>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', textAlign: 'center' }}>
            The 5x5 Grid
          </div>
          <table style={{ borderCollapse: 'collapse', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', overflow: 'hidden' }}>
            <thead>
              <tr>
                <th></th>
                <th style={{ color: 'var(--accent-color)', padding: '10px' }}>1</th>
                <th style={{ color: 'var(--accent-color)', padding: '10px' }}>2</th>
                <th style={{ color: 'var(--accent-color)', padding: '10px' }}>3</th>
                <th style={{ color: 'var(--accent-color)', padding: '10px' }}>4</th>
                <th style={{ color: 'var(--accent-color)', padding: '10px' }}>5</th>
              </tr>
            </thead>
            <tbody>
              {polybiusGrid.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td style={{ color: 'var(--accent-color)', padding: '10px', fontWeight: 'bold' }}>{rowIndex + 1}</td>
                  {row.map((cell, columnIndex) => (
                    <td key={columnIndex} style={{ 
                      width: '40px', height: '40px', 
                      textAlign: 'center', 
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
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
          <p style={{ textAlign: 'center', marginTop: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>* I and J share the same cell (2,4)</p>
        </div>
      </div>
    </div>
  );
};

export default PolybiusCipher;
