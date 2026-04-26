import React, { useState } from "react";
import "./CipherPage.css";

const Atbash = () => {
  const [text, setText] = useState("");
  
  const processText = (msg) => {
    let cipherText = '';
    let fw = 'abcdefghijklmnopqrstuvwxyz';
    let bw = 'zyxwvutsrqponmlkjihgfedcba';
    
    for (let i = 0; i < msg.length; i++) {
      let char = msg.charAt(i);
      let isUpper = char === char.toUpperCase();
      let index = fw.indexOf(char.toLowerCase());
      
      if (index !== -1) {
        let newChar = bw.charAt(index);
        cipherText += isUpper ? newChar.toUpperCase() : newChar;
      } else {
        cipherText += char;
      }
    }
    return cipherText;
  }

  const processed = processText(text);

  return (
    <div className="cipher-container">
      <div className="cipher-header">
        <h1>Atbash Cipher</h1>
        
        <div className="cipher-definition">
          <h3>What is it?</h3>
          <p>
            The Atbash cipher is a simple substitution cipher originally used to encode the Hebrew alphabet. 
            It works by substituting the first letter of an alphabet for the last, the second for the second to last, 
            and so on, reversing the alphabet. Because it is symmetric, the same process is used for both encryption 
            and decryption.
          </p>
        </div>

        <div className="cipher-example">
          <div className="cipher-example-title">Example</div>
          <div>Plaintext:  A B C ... X Y Z</div>
          <div>Ciphertext: Z Y X ... C B A</div>
        </div>
      </div>

      <div className="cipher-sandbox">
        <div className="sandbox-title">Interactive Sandbox</div>
        
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
              value={processed}
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

export default Atbash;