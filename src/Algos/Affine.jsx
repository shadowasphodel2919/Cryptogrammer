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
const Main = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
});
export const Affine = () => {
    const [A, setA] = useState();
    const [B, setB] = useState();
    const [init, setInit] = useState(false);
    const [message, setMessage] = useState("");
    const [cipher, setCipher] = useState("");

    function onMessageChange(text){
      setMessage(text);
      console.log("Debug: Changes in message");
      let c1 = encryptMessage(text)
      setCipher(c1);
    }

    function onCipherChange(text){
      setCipher(text);
      console.log("Debug: Changes in cipher");
      let m1 = decryptCipher(text)
      setMessage(m1);
    }

    function gcd(a,b){
      if(a===0 || b===0)return 0;
      if(a===b)return a;
      if(a>b)return gcd(a-b, b);
      return gcd(a, b-a);
    }

    function checkCoprime(a, b){
      if(gcd(a,b)===1)return true;
      return false;
    }

    function changeValid(){
      if(checkCoprime(A,B))
      setInit(true);
      else
      alert("The numbers should be co-prime")
    }   
    function findInvMod(){
      let i = 1;
      while(true){
        if(((26*i)+1)%A === 0){
          // console.log(i+ " " +A);
          return (26*i+1)/A;
        }
        i++;
      }
    }
    function encryptMessage(msg)
    {
      let length = msg.length, cipher = "";
      for(let i = 0; i < length; i++){
        let ch = msg[i];
        if(ch === ' '){
          cipher += " ";
          continue;
        }
        else if(ch >= 'A' && ch <= 'Z'){
          ch = ch.charCodeAt(0)%65;
          ch = parseInt((((ch*A)%26)+parseInt(B))%26);
          cipher += String.fromCharCode(ch+65)
        }
        else if(ch >= 'a' && ch <= 'z'){
          ch = ch.charCodeAt(0)%97;
          ch = parseInt((((ch*A)%26)+parseInt(B))%26);
          cipher += String.fromCharCode(ch+97)
        }
      }
      return cipher;
    }
    function decryptCipher(cipher)
    {
      let length = cipher.length, msg = "", inv = findInvMod();
      for(let i = 0; i < length; i++){
        let ch = cipher[i];
        if(ch === ' '){
          msg += " ";
          continue;
        }
        else if(ch >= 'A' && ch <= 'Z'){
          ch = ch.charCodeAt(0)%65;
          if(ch-B>=0){
            ch = (((ch - B)%26)*inv)%26;
          }
          else{
            ch = 26-(ch-B);
            ch = (((ch - B)%26)*inv)%26;
          }
          msg += String.fromCharCode(ch+65);
        }
        else if(ch >= 'a' && ch <= 'z'){
          ch = ch.charCodeAt(0)%97;
          if(ch-B>=0){
            ch = (((ch - B)%26)*inv)%26;
          }
          else{
            ch = 26-(ch-B);
            ch = (((ch - B)%26)*inv)%26;
          }
          msg += String.fromCharCode(ch+97);
        }
      }
      return msg;
    }
    return (<ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
        {init?(
          <>
          <Main>
            <TextField
              placeholder="Enter Message"
              multiline
              value={message}
              rows={10}
              style={{width: 400}}
              onChange={(e)=>onMessageChange(e.target.value)}
            />
            <TextField
              placeholder="Encoded Text"
              multiline
              value={cipher}
              rows={10}
              style={{width: 400}}
              onChange={(e)=>onCipherChange(e.target.value)}
            />
          </Main>
          </>
        ):(
          <>
            <TextField
              id="outlined"
              label="Input a"
              value={A}
              onChange={(e)=>setA(e.target.value)}
            />
            <TextField
              id="outlined"
              label="Input b"
              value={B}
              onChange={(e)=>setB(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={(e)=>changeValid()}>Continue</Button>
          </>
        )}
        </Container>
    </ThemeProvider>);
}
