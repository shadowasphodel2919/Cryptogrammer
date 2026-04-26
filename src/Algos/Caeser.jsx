import React, { useState } from "react";
import "./CipherPage.css";

export const Caeser = () => {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("encode"); // 'encode' or 'decode'
  const [shift, setShift] = useState(3);

  const encode = (msg, s) => {
    let cipherText = '';
    let modShift = parseInt(s) % 26 || 0;
    for (let i = 0; i < msg.length; i++) {
      let asciiCode = msg.charCodeAt(i);
      if (asciiCode >= 65 && asciiCode <= 90) {
        cipherText += String.fromCharCode(((asciiCode - 65 + modShift) % 26) + 65);
      } else if (asciiCode >= 97 && asciiCode <= 122) {
        cipherText += String.fromCharCode(((asciiCode - 97 + modShift) % 26) + 97);
      } else {
        cipherText += String.fromCharCode(asciiCode);
      }
    }
    return cipherText;
  }

  const decode = (cpr, s) => {
    let msg = '';
    let modShift = parseInt(s) % 26 || 0;
    for (let i = 0; i < cpr.length; i++) {
      let asciiCode = cpr.charCodeAt(i);
      if (asciiCode >= 65 && asciiCode <= 90) {
        let decodedCode = asciiCode - 65 - modShift;
        if (decodedCode < 0) decodedCode += 26;
        msg += String.fromCharCode((decodedCode % 26) + 65);
      } else if (asciiCode >= 97 && asciiCode <= 122) {
        let decodedCode = asciiCode - 97 - modShift;
        if (decodedCode < 0) decodedCode += 26;
        msg += String.fromCharCode((decodedCode % 26) + 97);
      } else {
        msg += String.fromCharCode(asciiCode);
      }
    }
    return msg;
  }

  const plaintext = mode === "encode" ? text : decode(text, shift);
  const ciphertext = mode === "encode" ? encode(text, shift) : text;

  return (
    <div className="cipher-container">
      <div className="cipher-header">
        <h1>Caesar Cipher</h1>
        
        <div className="cipher-definition">
          <h3>What is it?</h3>
          <p>
            The Caesar Cipher is one of the simplest and most widely known encryption techniques. 
            It is a type of substitution cipher in which each letter in the plaintext is replaced by a letter 
            some fixed number of positions down the alphabet. For example, with a left shift of 3, D would be replaced by A. 
            It is named after Julius Caesar, who used it in his private correspondence.
          </p>
        </div>

        <div className="cipher-example">
          <div className="cipher-example-title">Example (Shift = 3)</div>
          <div>Plaintext:  HELLO WORLD</div>
          <div>Ciphertext: KHOOR ZRUOG</div>
        </div>
      </div>

      <div className="cipher-sandbox">
        <div className="sandbox-title">Interactive Sandbox</div>
        
        <div className="input-group">
          <label>Shift (Key)</label>
          <input 
            type="number" 
            value={shift} 
            onChange={(e) => setShift(e.target.value)} 
          />
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
      </div>
    </div>
  );
}
