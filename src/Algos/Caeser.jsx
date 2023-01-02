import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";

export const Caeser = () => {
    const [message, setMessage] = useState("");
    const [shift, setShift] = useState(0);
    const [cipher, setCipher] = useState("");
    let ctext = "";
    const buildCipher = (e) => {
        e.preventDefault();
        let cipherText = '';
        let modShift = shift % 26;
        for (let i = 0; i < message.length; i++) {
          let asciiCode = message.charCodeAt(i);
          if (asciiCode < 65 || (asciiCode > 90 && asciiCode < 97) || asciiCode > 122) {
            cipherText += String.fromCharCode(asciiCode);
            continue;
          }
          if (asciiCode >= 65 && asciiCode <= 90) {
            asciiCode -= 65;
            asciiCode += modShift;
            asciiCode %= 26;
            asciiCode += 65;
          } else if (asciiCode >= 97 && asciiCode <= 122) {
            asciiCode -= 97;
            asciiCode += modShift;
            asciiCode %= 26;
            asciiCode += 97;
          }
          let cipherChar = String.fromCharCode(asciiCode);
          cipherText += cipherChar;
        }
        
        setCipher(cipherText);
    }
    return (<Form>
        <Form.Group className='mb-3' controlId='message'>
            <Form.Label>Plain Text</Form.Label>
            <Form.Control type='text'  onChange={(e)=>setMessage(e.target.value)} placeholder='Enter Message' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='shift'>
            <Form.Label>Shift</Form.Label>
            <Form.Control type='number' onChange={(e)=>setShift(e.target.value)} placeholder='Enter the shift' />
        </Form.Group>
        <Button variant='primary' type='submit' onClick={(e)=>buildCipher(e)}>Submit</Button>
        <Form.Group className='mb-3' controlId='cipher'>
            <Form.Label>Cipher Text</Form.Label>
            <Form.Control type='text' value={cipher} placeholder='Enter the shift' readOnly />
        </Form.Group>
    </Form>);
}
