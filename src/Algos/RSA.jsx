import React, { useState, useEffect } from "react";
import bigInt from "big-integer";
import "./CipherPage.css";

export const RSA = () => {
  const [p, setP] = useState("61");
  const [q, setQ] = useState("53");
  const [n, setN] = useState("");
  const [phi, setPhi] = useState("");
  const [eVal, setEVal] = useState("17");
  const [d, setD] = useState("");
  
  const [plaintext, setPlaintext] = useState("");
  const [encodedText, setEncodedText] = useState("");
  
  const [ciphertext, setCiphertext] = useState("");
  const [decodedText, setDecodedText] = useState("");

  const [error, setError] = useState("");

  const isPrime = (num) => {
    let n = parseInt(num);
    if (isNaN(n) || n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  };

  const gcd = (a, b) => {
    if (b === 0) return a;
    return gcd(b, a % b);
  };

  const modInverse = (a, m) => {
    let m0 = m;
    let y = 0;
    let x = 1;
    if (m === 1) return 0;
    while (a > 1) {
      let q = Math.floor(a / m);
      let t = m;
      m = a % m;
      a = t;
      t = y;
      y = x - q * y;
      x = t;
    }
    if (x < 0) x += m0;
    return x;
  };

  useEffect(() => {
    if (p && q) {
      if (!isPrime(p) || !isPrime(q)) {
        setError("Both P and Q must be prime numbers.");
        setN(""); setPhi(""); setD("");
        return;
      }
      
      let pInt = parseInt(p);
      let qInt = parseInt(q);
      
      if (pInt === qInt) {
        setError("P and Q must be different prime numbers.");
        return;
      }

      setError("");
      let calcN = pInt * qInt;
      let calcPhi = (pInt - 1) * (qInt - 1);
      
      setN(calcN.toString());
      setPhi(calcPhi.toString());

      let eInt = parseInt(eVal);
      if (!isNaN(eInt) && gcd(eInt, calcPhi) === 1 && eInt > 1 && eInt < calcPhi) {
        setD(modInverse(eInt, calcPhi).toString());
      } else {
        setD("Invalid 'e'");
      }
    }
  }, [p, q, eVal]);

  const handleEncrypt = (text) => {
    setPlaintext(text);
    if (!text || !n || !eVal || d === "Invalid 'e'") {
      setEncodedText("");
      return;
    }
    
    let encodedNum = [];
    for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i);
      let encodedChar = bigInt(charCode).pow(parseInt(eVal)).mod(parseInt(n));
      encodedNum.push(encodedChar.toString(10));
    }
    setEncodedText(encodedNum.join(" "));
  };

  const handleDecrypt = (text) => {
    setCiphertext(text);
    if (!text || !n || !d || d === "Invalid 'e'") {
      setDecodedText("");
      return;
    }

    try {
      let coded = text.trim().split(/\s+/);
      let decodedMessage = '';
      for (let i = 0; i < coded.length; i++) {
        if (!coded[i]) continue;
        let charCode = bigInt(coded[i]).pow(parseInt(d)).mod(parseInt(n));
        decodedMessage += String.fromCharCode(charCode.toJSNumber());
      }
      setDecodedText(decodedMessage);
    } catch (err) {
      setDecodedText("Error decoding. Ensure input is space-separated numbers.");
    }
  };

  return (
    <div className="cipher-container">
      <div className="cipher-header">
        <h1>RSA Algorithm</h1>
        
        <div className="cipher-definition">
          <h3>What is it?</h3>
          <p>
            RSA (Rivest–Shamir–Adleman) is a public-key cryptosystem that is widely used for secure data transmission. 
            In a public-key cryptosystem, the encryption key is public and distinct from the decryption key, which is kept secret (private). 
            This asymmetry is based on the practical difficulty of factoring the product of two large prime numbers, the "factoring problem".
          </p>
        </div>

        <div className="cipher-example">
          <div className="cipher-example-title">Key Generation Steps</div>
          <div>1. Choose two distinct prime numbers, <b>p</b> and <b>q</b>.</div>
          <div>2. Compute <b>n = p × q</b>.</div>
          <div>3. Compute the totient <b>φ(n) = (p − 1) × (q − 1)</b>.</div>
          <div>4. Choose an integer <b>e</b> such that 1 &lt; e &lt; φ(n) and e is coprime to φ(n).</div>
          <div>5. Determine <b>d</b> as <i>d ≡ e⁻¹ (mod φ(n))</i>.</div>
        </div>
      </div>

      <div className="cipher-sandbox">
        <div className="sandbox-title">RSA Key Generation</div>
        
        <div className="input-row" style={{ flexWrap: 'wrap' }}>
          <div className="input-group" style={{ flex: '1 1 100px' }}>
            <label>Prime P</label>
            <input type="number" value={p} onChange={(e) => setP(e.target.value)} />
          </div>
          <div className="input-group" style={{ flex: '1 1 100px' }}>
            <label>Prime Q</label>
            <input type="number" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="input-group" style={{ flex: '1 1 100px' }}>
            <label>Public Exponent (e)</label>
            <input type="number" value={eVal} onChange={(e) => setEVal(e.target.value)} />
          </div>
        </div>
        
        {error && <div style={{ color: 'var(--color-error)', textAlign: 'center' }}>{error}</div>}

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginTop: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Modulus (n)</div>
            <div style={{ color: 'var(--accent-color)', fontSize: '1.2rem', fontWeight: 'bold' }}>{n || '-'}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Totient φ(n)</div>
            <div style={{ color: 'var(--accent-color)', fontSize: '1.2rem', fontWeight: 'bold' }}>{phi || '-'}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Private Key (d)</div>
            <div style={{ color: 'var(--accent-color)', fontSize: '1.2rem', fontWeight: 'bold' }}>{d || '-'}</div>
          </div>
        </div>
      </div>

      <div className="cipher-sandbox" style={{ marginTop: '-1rem' }}>
        <div className="sandbox-title">Encryption (Uses Public Key: e, n)</div>
        <div className="input-row">
          <div className="input-group">
            <label>Plaintext</label>
            <textarea 
              value={plaintext}
              onChange={(e) => handleEncrypt(e.target.value)}
              placeholder="Type message here to encrypt..."
            />
          </div>
          <div className="input-group">
            <label>Ciphertext (Space-separated numbers)</label>
            <textarea 
              value={encodedText}
              readOnly
              style={{ borderColor: 'var(--accent-color)' }}
            />
          </div>
        </div>
      </div>

      <div className="cipher-sandbox" style={{ marginTop: '-1rem' }}>
        <div className="sandbox-title">Decryption (Uses Private Key: d, n)</div>
        <div className="input-row">
          <div className="input-group">
            <label>Ciphertext</label>
            <textarea 
              value={ciphertext}
              onChange={(e) => handleDecrypt(e.target.value)}
              placeholder="Type space-separated numbers here to decrypt..."
            />
          </div>
          <div className="input-group">
            <label>Decoded Plaintext</label>
            <textarea 
              value={decodedText}
              readOnly
              style={{ borderColor: 'var(--accent-color)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RSA;
