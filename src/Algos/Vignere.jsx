import React, { useState } from "react";
import "./CipherPage.css";

export const Vignere = () => {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("encode"); // 'encode' or 'decode'
  const [keyword, setKeyword] = useState("KEY");

  const encode = (msg, keyStr) => {
    if (!keyStr) return msg;
    let cipherText = '';
    let keyUpper = keyStr.toUpperCase().replace(/[^A-Z]/g, '');
    if (!keyUpper) return msg;
    
    let keyIndex = 0;
    for (let i = 0; i < msg.length; i++) {
      let asciiCode = msg.charCodeAt(i);
      if (asciiCode >= 65 && asciiCode <= 90) {
        let kCode = keyUpper.charCodeAt(keyIndex % keyUpper.length) - 65;
        cipherText += String.fromCharCode(((asciiCode - 65 + kCode) % 26) + 65);
        keyIndex++;
      } else if (asciiCode >= 97 && asciiCode <= 122) {
        let kCode = keyUpper.charCodeAt(keyIndex % keyUpper.length) - 65;
        cipherText += String.fromCharCode(((asciiCode - 97 + kCode) % 26) + 97);
        keyIndex++;
      } else {
        cipherText += String.fromCharCode(asciiCode);
      }
    }
    return cipherText;
  }

  const decode = (cpr, keyStr) => {
    if (!keyStr) return cpr;
    let msg = '';
    let keyUpper = keyStr.toUpperCase().replace(/[^A-Z]/g, '');
    if (!keyUpper) return cpr;
    
    let keyIndex = 0;
    for (let i = 0; i < cpr.length; i++) {
      let asciiCode = cpr.charCodeAt(i);
      if (asciiCode >= 65 && asciiCode <= 90) {
        let kCode = keyUpper.charCodeAt(keyIndex % keyUpper.length) - 65;
        let decodedCode = asciiCode - 65 - kCode;
        if (decodedCode < 0) decodedCode += 26;
        msg += String.fromCharCode((decodedCode % 26) + 65);
        keyIndex++;
      } else if (asciiCode >= 97 && asciiCode <= 122) {
        let kCode = keyUpper.charCodeAt(keyIndex % keyUpper.length) - 65;
        let decodedCode = asciiCode - 97 - kCode;
        if (decodedCode < 0) decodedCode += 26;
        msg += String.fromCharCode((decodedCode % 26) + 97);
        keyIndex++;
      } else {
        msg += String.fromCharCode(asciiCode);
      }
    }
    return msg;
  }

  const plaintext = mode === "encode" ? text : decode(text, keyword);
  const ciphertext = mode === "encode" ? encode(text, keyword) : text;

  return (
    <div className="cipher-container">
      <div className="cipher-header">
        <h1>Vigenère Cipher</h1>
        
        <div className="cipher-definition">
          <h3>What is it?</h3>
          <p>
            The Vigenère cipher is a method of encrypting alphabetic text by using a series of 
            interwoven Caesar ciphers, based on the letters of a keyword. It is a form of 
            polyalphabetic substitution. For three centuries it resisted all attempts to break it, 
            earning it the description <i>le chiffre indéchiffrable</i> (the indecipherable cipher).
          </p>
        </div>

        <div className="cipher-example">
          <div className="cipher-example-title">Example (Keyword = KEY)</div>
          <div>Plaintext:  HELLO WORLD</div>
          <div>Ciphertext: RIJVS UYVJN</div>
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
