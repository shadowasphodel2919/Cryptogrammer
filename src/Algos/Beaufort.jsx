import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    gap: 10,
  });
export const Beaufort = () => {
    const [message, setMessage] = useState("");
    const [key, setKey] = useState("");
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
        setKey(genKey)
        for(let i = 0; i < message.length; i++){
            let mCode = message.charCodeAt(i);
            let kCode = genKey.charCodeAt(i);
            if(mCode < 65 || (mCode > 90 && mCode < 97) || mCode > 122){
                cipherText += String.fromCharCode(mCode);
                continue;
            }
            if(kCode>=65 && kCode<=90)
                kCode = (kCode-65)%65
            if(kCode>=97 && kCode<=122)
                kCode = (kCode-97)%97
            if(mCode>=65 && mCode<=90){
                mCode = (mCode-65)%65
                mCode = (kCode-mCode)%26
                if(mCode<0)mCode = 26+mCode;
                mCode = mCode+65
                console.log(kCode + " " + mCode);
              }
            if(mCode>=97 && kCode<=122){
              mCode = (mCode-97)%97
              mCode = (kCode-mCode)%26
              if(mCode<0)mCode = 26+mCode;
              mCode = mCode+97
              console.log(kCode + " " + mCode);
            }
            let cipherChar = String.fromCharCode(mCode);
            cipherText += cipherChar;
        }
        setCipher(cipherText);
    }
    return (<ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
        <TextField
          required
          id="outlined-required"
          label="Plain Text"
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Key"
          value={key}
          onChange={(e)=>setKey(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" onClick={(e)=>buildCipher(e)}>
          Submit
        </Button>
        {cipher && 
        <TextField
          id="outlined"
          label="Cipher Text"
          value={cipher}
          InputProps={{
            readOnly: true,
          }}
        />}
        </Container>
    </ThemeProvider>);
}
