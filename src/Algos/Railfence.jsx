import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";

export const Railfence = () => {
    const [message, setMessage] = useState("");
    const [key, setKey] = useState(0);
    const [cipher, setCipher] = useState("");
    const [table, setTable] = useState([]);
    
    function Table({ data }) {
        return (
          <table>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );
    }
    const buildCipher = (e) => {
        e.preventDefault();
        let rows = [];
        let r = key;
        let c = message.length;
        for(let i = 0; i < r; i++){
            rows[i] = []
            for(let j = 0; j < c; j++){
                rows[i][j] = " ";
            }
        }
        let text = message;
        let dir_down = false;
        let row = 0, col = 0;
        for(let i = 0; i < text.length; i++){
            if (row == 0 || row == key - 1) dir_down = !dir_down;
            rows[row][col++] = text[i];
            dir_down ? row++ : row--;
        }

        let result  = ''
        for(let i = 0; i < key; i++){
            for(let j = 0; j < text.length; j++){
                if(rows[i][j]!=" ")result += rows[i][j];
            }
        }
        setCipher(result)
        setTable(rows);
    }
    return (<>
      <h2>Railfence Cipher</h2>
      <Form>
        <Form.Group className='mb-3' controlId='message'>
            <Form.Label>Plain Text</Form.Label>
            <Form.Control type='text'  onChange={(e)=>setMessage(e.target.value)} placeholder='Enter Message' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='key'>
            <Form.Label>Key</Form.Label>
            <Form.Control type='number' onChange={(e)=>setKey(e.target.value)} placeholder='Enter the key/rows' />
        </Form.Group>
        <Button variant='primary' type='submit' onClick={(e)=>buildCipher(e)}>Submit</Button>
        <Form.Group className='mb-3' controlId='cipher'>
            <Form.Label>Cipher Text</Form.Label>
            <Form.Control type='text' value={cipher} placeholder='Encrypted Text' readOnly />
        </Form.Group>
    </Form>
    <Table data={table}/>
    </>);
}
