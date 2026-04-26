import React, { useState } from "react";
import "./CipherPage.css";

export const Beaufort = () => {
  const [text, setText] = useState("");
  const [keyword, setKeyword] = useState("KEY");

  const processText = (msg, keyStr) => {
    if (!keyStr) return msg;
    let cipherText = '';
    let keyUpper = keyStr.toUpperCase().replace(/[^A-Z]/g, '');
    if (!keyUpper) return msg;
    
    let keyIndex = 0;
    for (let i = 0; i < msg.length; i++) {
      let asciiCode = msg.charCodeAt(i);
      if (asciiCode >= 65 && asciiCode <= 90) {
        let kCode = keyUpper.charCodeAt(keyIndex % keyUpper.length) - 65;
        let mCode = asciiCode - 65;
        let cCode = (kCode - mCode + 26) % 26;
        cipherText += String.fromCharCode(cCode + 65);
        keyIndex++;
      } else if (asciiCode >= 97 && asciiCode <= 122) {
        let kCode = keyUpper.charCodeAt(keyIndex % keyUpper.length) - 65;
        let mCode = asciiCode - 97;
        let cCode = (kCode - mCode + 26) % 26;
        cipherText += String.fromCharCode(cCode + 97);
        keyIndex++;
      } else {
        cipherText += String.fromCharCode(asciiCode);
      }
    }
    return cipherText;
  }

  // Beaufort is symmetric, so encoding and decoding are the exact same operation!
  const processedText = processText(text, keyword);

  return (
    <div className="cipher-container">
      <div className="cipher-header">
        <h1>Beaufort Cipher</h1>
        
        <div className="cipher-definition">
          <h3>What is it?</h3>
          <p>
            The Beaufort cipher, created by Sir Francis Beaufort, is a substitution cipher similar to 
            the Vigenère cipher, with a slightly modified enciphering mechanism and tableau. 
            Its most famous application was in the rotor-based Hagelin M-209 cipher machine. 
            Unlike Vigenère, the Beaufort cipher is reciprocal (symmetric), meaning the encryption 
            and decryption algorithms are exactly the same.
          </p>
        </div>

        <div className="cipher-example">
          <div className="cipher-example-title">Example (Keyword = KEY)</div>
          <div>Plaintext:  HELLO WORLD</div>
          <div>Ciphertext: DANVB YEBXH</div>
        </div>
      </div>

      <div className="cipher-sandbox">
        <div className="sandbox-title">Interactive Sandbox</div>
        
        <div className="input-group">
          <label>Keyword</label>
          <input 
            type="text" 
            value={keyword} 
            onChange={(e) => setKeyword(e.target.value.toUpperCase())} 
            placeholder="Enter keyword (A-Z)"
          />
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Input Text</label>
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type message here to encode/decode..."
            />
          </div>

          <div className="input-group">
            <label>Output Text</label>
            <textarea 
              value={processedText}
              readOnly
              placeholder="Result will appear here..."
              style={{ borderColor: 'var(--accent-color)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Beaufort;
