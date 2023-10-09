import { useState } from "react";
import TextField from '@mui/material/TextField';
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

export const Caeser = () => {
    const [message, setMessage] = useState("");
    const [shift, setShift] = useState(0);
    const [cipher, setCipher] = useState("");
    const encode = (msg) => {
      let cipherText = '';
      let modShift = shift % 26;
      for (let i = 0; i < msg.length; i++) {
        let asciiCode = msg.charCodeAt(i);
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
      return cipherText;
    }
    const decode = (cpr) => {
      let msg = '';
      let modShift = shift % 26;
      for (let i = 0; i < cpr.length; i++) {
        let asciiCode = cpr.charCodeAt(i);
        if (asciiCode < 65 || (asciiCode > 90 && asciiCode < 97) || asciiCode > 122) {
          msg += String.fromCharCode(asciiCode);
          continue;
        }
        if (asciiCode >= 65 && asciiCode <= 90) {
          asciiCode -= 65;
          asciiCode -= modShift;
          asciiCode %= 26;
          if(asciiCode < 0)asciiCode += 91;
          else  asciiCode += 65;
        } else if (asciiCode >= 97 && asciiCode <= 122) {
          asciiCode -= 97;
          asciiCode -= modShift;
          asciiCode %= 26;
          if(asciiCode < 0)asciiCode += 123;
          else  asciiCode += 97;
        }
        let msgChar = String.fromCharCode(asciiCode);
        msg += msgChar;
      }
      return msg;
    }
    function onMessageChange(txt){
      setMessage(txt);
      let c1 = encode(txt);
      setCipher(c1);
    }
    function onShiftChange(s){
      setShift(s);
    }
    function onCipherChange(cipher){
      setCipher(cipher);
      let m1 = decode(cipher);
      setMessage(m1);
    }
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <h1>Caeser Cipher</h1>
          <Main>
            <TextField
              placeholder="Enter Message"
              label="Message"
              value={message}
              type="text"
              onChange={(e)=>onMessageChange(e.target.value)}
            />
            <TextField
              placeholder="Shift"
              label="Numeric Shift"
              value={shift}
              type="number"
              onChange={(e)=>onShiftChange(e.target.value)}
            />
            <TextField
              placeholder="Enter Cipher"
              label="Cipher"
              value={cipher}
              onChange={(e)=>onCipherChange(e.target.value)}
            />
          </Main>
        </Container>
      </ThemeProvider>
    );
}
