import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";

const Atbash = () => {
    
    const [message, setMessage] = useState("");
    const [cipher, setCipher] = useState("");
    useEffect(() => {
      setCipher(message);
      let text = message
      let cipherText = ''
      let fw = 'abcdefghijklmnopqrstuvwxyz'
      let bw = 'zxywuvtsrqponmlkjihgfedcba'
      for(let i = 0; i < text.length; i++){
        if(text.charAt(i).toUpperCase()===text.charAt(i)){
            //uppercase
            cipherText += bw.charAt(fw.indexOf(text.charAt(i).toLowerCase())).toUpperCase()
        }else
        cipherText += bw.charAt(fw.indexOf(text.charAt(i)))
      }
      console.log(cipherText);
      setCipher(cipherText)
    }, [message]) 
    return (
        <Form>
            <Form.Group className='mb-3' controlId='message'>
                <Form.Label>Plain Text</Form.Label>
                <Form.Control type='text'  onChange={(e)=>setMessage(e.target.value)} placeholder='Enter Message' />
            </Form.Group>
            <Form.Group className='mb-3' controlId='cipher'>
                <Form.Label>Cipher Text</Form.Label>
                <Form.Control type='text' value={cipher} placeholder='CipherText' readOnly />
            </Form.Group>
        </Form>
    )
}

//A B C D E F G H I J K L M
//Z Y X W V U T S R Q P O N
export default Atbash