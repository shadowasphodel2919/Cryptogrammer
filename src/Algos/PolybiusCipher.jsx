import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";

const PolybiusCipher = () => {
  const [plaintext, setPlaintext] = useState("");
  const [cipherText, setCipherText] = useState("");

  const polybiusSquare = {
    a: "11",
    b: "12",
    c: "13",
    d: "14",
    e: "15",
    f: "21",
    g: "22",
    h: "23",
    i: "24",
    j: "24",
    k: "25",
    l: "31",
    m: "32",
    n: "33",
    o: "34",
    p: "35",
    q: "41",
    r: "42",
    s: "43",
    t: "44",
    u: "45",
    v: "51",
    w: "52",
    x: "53",
    y: "54",
    z: "55",
  };

  const encodeText = (e) => {
    e.preventDefault();
    let encodedText = "";
    const text = plaintext.toLowerCase();

    for (let char of text) {
      if (char === " ") {
        encodedText += " ";
      } else if (polybiusSquare[char]) {
        encodedText += polybiusSquare[char] + " ";
      }
    }
    setCipherText(encodedText);
  };

  const styles = {
    container: {
      backgroundColor: "#f0f0f0",
      borderRadius: "10px",
      padding: "20px",
      boxShadow: "0 0px 5px #cccccc",
      width: "500px",
      height: "250px",
      margin: "20px",
      textAlign: "center",
    },
    h2: {
      color: "#333",
    },
    p: {
      color: "#555",
      margin: "15px 0",
    },
  };

  if (window.matchMedia("(max-width: 768px)").matches) {
    styles.container.height = "300px";
  }

  return (
    // <div>
    //   <h1>Polybius Square Cipher</h1>
    //   <div>
    //     <textarea
    //       placeholder="Enter plaintext"
    //       value={plaintext}
    //       onChange={(e) => setPlaintext(e.target.value)}
    //     ></textarea>
    //   </div>
    //   <button onClick={encodeText}>Encode</button>
    //   <div>
    //     <textarea
    //       placeholder="Ciphered Text"
    //       value={cipherText}
    //       readOnly
    //     ></textarea>
    //   </div>
    // </div>

    <>
      <h2>Polybius Cipher</h2>
      <Form>
        <Form.Group className="mb-3" controlId="message">
          <Form.Label>Plain Text</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setPlaintext(e.target.value)}
            placeholder="Enter Message"
          />
        </Form.Group>
        {/* <Form.Group className='mb-3' controlId='key'>
              <Form.Label>Key</Form.Label>
              <Form.Control type='number' onChange={(e)=>setKey(e.target.value)} placeholder='Enter the key/rows' />
          </Form.Group> */}
        <Button variant="primary" type="submit" onClick={(e) => encodeText(e)}>
          Submit
        </Button>
        <Form.Group className="mb-3" controlId="cipher">
          <Form.Label>Cipher Text</Form.Label>
          <Form.Control
            type="text"
            value={cipherText}
            placeholder="Encrypted Text"
            readOnly
          />
        </Form.Group>
      </Form>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={styles.container}>
          <h2 style={styles.h2}>Polybius Square Cipher</h2>
          <p style={styles.p}>
            The Polybius Square Cipher is a way to encode text using a grid
            where each letter of the alphabet is represented by a pair of
            numbers. For example, 'A' is '11,' 'B' is '12,' and so on. It's a
            simple and historical way to keep messages secret.
          </p>
        </div>
      </div>
      {/* <Table data={table} /> */}
    </>
  );
};

export default PolybiusCipher;
