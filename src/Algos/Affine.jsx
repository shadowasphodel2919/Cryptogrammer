import React, { useState } from "react";
import "./CipherPage.css";

export const Affine = () => {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("encode");
  const [A, setA] = useState(5);
  const [B, setB] = useState(8);

  const gcd = (a, b) => {
    a = Math.abs(a);
    b = Math.abs(b);
    if (!b) return a;
    return gcd(b, a % b);
  };

  const isCoprime = gcd(parseInt(A), 26) === 1;

  const findInvMod = (a, m) => {
    a = ((a % m) + m) % m;
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) {
        return x;
      }
    }
    return 1;
  };

  const encode = (msg, a, b) => {
    if (!isCoprime || isNaN(a) || isNaN(b)) return msg;
    let cipher = "";
    for (let i = 0; i < msg.length; i++) {
      let ch = msg.charCodeAt(i);
      if (ch >= 65 && ch <= 90) {
        let val = ((ch - 65) * a + b) % 26;
        if (val < 0) val += 26;
        cipher += String.fromCharCode(val + 65);
      } else if (ch >= 97 && ch <= 122) {
        let val = ((ch - 97) * a + b) % 26;
        if (val < 0) val += 26;
        cipher += String.fromCharCode(val + 97);
      } else {
        cipher += String.fromCharCode(ch);
      }
    }
    return cipher;
  };

  const decode = (cpr, a, b) => {
    if (!isCoprime || isNaN(a) || isNaN(b)) return cpr;
    let invA = findInvMod(a, 26);
    let msg = "";
    for (let i = 0; i < cpr.length; i++) {
      let ch = cpr.charCodeAt(i);
      if (ch >= 65 && ch <= 90) {
        let val = (invA * (ch - 65 - b)) % 26;
        if (val < 0) val += 26;
        msg += String.fromCharCode(val + 65);
      } else if (ch >= 97 && ch <= 122) {
        let val = (invA * (ch - 97 - b)) % 26;
        if (val < 0) val += 26;
        msg += String.fromCharCode(val + 97);
      } else {
        msg += String.fromCharCode(ch);
      }
    }
    return msg;
  };

  const parsedA = parseInt(A);
  const parsedB = parseInt(B);

  const plaintext = mode === "encode" ? text : decode(text, parsedA, parsedB);
  const ciphertext = mode === "encode" ? encode(text, parsedA, parsedB) : text;

  return (
    <div className="cipher-container">
      <div className="cipher-header">
        <h1>Affine Cipher</h1>
        
        <div className="cipher-definition">
          <h3>What is it?</h3>
          <p>
            The Affine cipher is a type of monoalphabetic substitution cipher, wherein each letter in an alphabet 
            is mapped to its numeric equivalent, encrypted using a simple mathematical function, and converted back 
            to a letter. The function used is <code>E(x) = (ax + b) mod 26</code>. 
            For decryption to work, <code>a</code> and the size of the alphabet (26) must be coprime.
          </p>
        </div>

        <div className="cipher-example">
          <div className="cipher-example-title">Example (A = 5, B = 8)</div>
          <div>Plaintext:  AFFINE CIPHER</div>
          <div>Ciphertext: IHHWVC SWFRCP</div>
        </div>
      </div>

      <div className="cipher-sandbox">
        <div className="sandbox-title">Interactive Sandbox</div>
        
        <div className="input-row">
          <div className="input-group">
            <label>Multiplier (A)</label>
            <input 
              type="number" 
              value={A} 
              onChange={(e) => setA(e.target.value)}
            />
            {!isCoprime && <span style={{ color: 'var(--color-warning)', fontSize: '0.8rem', marginTop: '4px' }}>'A' must be coprime with 26 (e.g., 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25).</span>}
          </div>
          <div className="input-group">
            <label>Shift (B)</label>
            <input 
              type="number" 
              value={B} 
              onChange={(e) => setB(e.target.value)}
            />
          </div>
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
              disabled={!isCoprime}
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
              disabled={!isCoprime}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Affine;
