import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";

export const Vignere = () => {
    const [message, setMessage] = useState("");
    const [key, setKey] = useState(0);
    const [cipher, setCipher] = useState("");
    const buildCipher = (e) => {
        e.preventDefault();
        let cipherText = '';
        let genKey = key;
        for(let i = 0; ; i++){
            if(message.length == i)
            i = 0;
            if(genKey.length == message.length)break;
            genKey+=(genKey.charAt(i));
        }
        console.log(genKey);
        for (let i = 0; i < message.length; i++) {
            let mCode = message.charCodeAt(i);
            let kCode = genKey.charCodeAt(i);
            if(mCode < 65 || (mCode > 90 && mCode < 97) || mCode > 122){
                cipherText += String.fromCharCode(mCode);
                continue;
            }
            mCode = ((mCode+kCode)%26)+65;
            let cipherChar = String.fromCharCode(mCode);
            cipherText += cipherChar;
        }
        
        setCipher(cipherText);
    }
    return (<Form>
        <Form.Group className='mb-3' controlId='message'>
            <Form.Label>Plain Text</Form.Label>
            <Form.Control style={{textTransform: 'uppercase'}} type='text'  onChange={(e)=>setMessage(e.target.value)} placeholder='Enter Message' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='key'>
            <Form.Label>Key</Form.Label>
            <Form.Control style={{textTransform: 'uppercase'}} type='text' onChange={(e)=>setKey(e.target.value)} placeholder='Enter the key' />
        </Form.Group>
        <Button variant='primary' type='submit' onClick={(e)=>buildCipher(e)}>Submit</Button>
        <Form.Group className='mb-3' controlId='cipher'>
            <Form.Label>Cipher Text</Form.Label>
            <Form.Control type='text' value={cipher} placeholder='Enter the key' readOnly />
        </Form.Group>
    </Form>);
}
