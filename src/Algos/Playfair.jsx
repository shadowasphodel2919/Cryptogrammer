import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";

export const Playfair = () => {
    const [message, setMessage] = useState("");
    const [key, setKey] = useState("");
    const [playSq, setPlaySq] = useState([]);
    const [cipher, setCipher] = useState("");

    const formatMessage = () => {
        var text = message.toUpperCase()
        var newText = "";
        let i = 0;
        for(i = 0; i < text.length-1; i += 2){
            if(text[i]!==text[i+1]){
                newText += text[i]+text[i+1];
            }
            else{
                newText += text[i]+'x'+text[i+1];//using x coz no realwords use double x's can change later
            }
        }
        if(i<text.length)newText += text[i++];
        if(newText.length%2!==0){
            newText = newText.concat('X')
        }
        setMessage(newText);
    }

    const buildPlayfairSquare = () => {
        let square = new Array(5);
        var keyGen = key.toUpperCase();
        for(let i = 0; i < 5; i++){
            square[i] = new Array(5);
        }
        var j = 0, i = 0, k =0;
        while(k<keyGen.length){
            if(keyGen.charAt(k)==='J'){
                square[i][j++] = 'I'
            }
            else{
                square[i][j++] = (keyGen.charAt(k));
            }
            if(j===5){
                j = 0;
                i++;
            }
            k++;
        }
        if(j===5){
            j = 0; i++;
        }
        for(var ch = 65; ch <= 90; ch++){
            if(String.fromCharCode(ch)==='J')continue;
            if(keyGen.indexOf(String.fromCharCode(ch))===-1){
                if(keyGen.indexOf('I')===-1 && String.fromCharCode(ch)==='I' && keyGen.indexOf('J')!==-1){
                    continue;
                }
                square[i][j++] = String.fromCharCode(ch);
            }
            if(j===5){
                j = 0;
                i++;
            }
            if(i === 5)break;
        }
        setPlaySq(square);
    }
    
    const buildCipher = (e) => {
        e.preventDefault();
        console.log(message);
        buildPlayfairSquare();
        formatMessage();
        console.log(message);
        console.log(playSq);
        var msg = message.toUpperCase();
        let indexA = new Array(2);
        let indexB = new Array(2);
        let res='';
        for(let i = 0; i < message.length-1; i+=2){
            let a = msg.charAt(i);
            let b = msg.charAt(i+1);
            //search
            if(a === 'J') a = 'I'
            if(b === 'J') b = 'I'
            for(let i = 0; i < 5; i++){
                for(let j = 0; j < 5; j++){
                    if(playSq[i][j] === a){
                        indexA[0] = i;
                        indexA[1] = j;
                    }
                    if(playSq[i][j] === b){
                        indexB[0] = i;
                        indexB[1] = j;
                    }
                }
            }
            //search ends
            if(indexA[0] === indexB[0]){
                res += playSq[indexA[0]][(indexA[1]+1)%5];
                res += playSq[indexB[0]][(indexB[1]+1)%5];
            }
            else if(indexA[1] === indexB[1]){
                res += playSq[(indexA[0]+1)%5][indexA[1]];
                res += playSq[(indexB[0]+1)%5][indexB[1]];
            }
            else{
                res += playSq[indexA[0]][indexB[1]];
                res += playSq[indexB[0]][indexA[1]];
            }
        }
        setCipher(res);
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
            <Form.Control type='text' value={cipher} placeholder='Cipher Text' readOnly />
        </Form.Group>
    </Form>);
}
