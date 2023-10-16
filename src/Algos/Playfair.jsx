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

export const Playfair = () => {
    const [message, setMessage] = useState("");
    const [key, setKey] = useState("");
    const [playSq, setPlaySq] = useState([]);
    const [cipher, setCipher] = useState("");

    const ALPHA_REGEX = /^[a-zA-Z]+$/;

    function onMessageChange(txt){
        let value = txt.toUpperCase();
        setMessage(value);
        let c1 = encode(value);
        setCipher(c1);
    }
    function onKeyChange(txt){
        let value = txt.toUpperCase();
        buildPlayfairSquare(key);
        setKey(value);
    }
    function onCipherChange(txt){
        let value = txt.toUpperCase();
        setCipher(value);
        let c1 = encode(value);
        setMessage(c1);
    }

    const encode = (msg) => {
        let playSq = buildPlayfairSquare(key);
        msg = formatMessage(msg);
        let indexA = new Array(2);
        let indexB = new Array(2);
        let res='';
        for(let i = 0; i < msg.length-1; i+=2){
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
        return res;
    }
    

    const formatMessage = (text) => {
        var newText = "";
        let i = 0;
        for(i = 0; i < text.length-1; i += 2){
            if(text[i]!==text[i+1]){
                newText += text[i]+text[i+1];
            }
            else{
                newText += text[i]+'X'+text[i+1];//using x coz no realwords use double x's can change later
            }
        }
        if(i<text.length)newText += text[i++];
        if(newText.length%2!==0){
            newText = newText.concat('X')
        }
        console.log(newText);
        return newText;
        // setMessage(newText);
    }

    const buildPlayfairSquare = (keyGen) => {
        let square = new Array(5);
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
        return square;
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container>
                <h1>Playfair Cipher</h1>
                <Main>
                    <TextField
                        placeholder="Enter Message"
                        label="Message"
                        value={message}
                        type="text"
                        onChange={(e)=>{
                            if(e.target.value !== "" && !ALPHA_REGEX.test(e.target.value))
                            return;
                            onMessageChange(e.target.value)
                        }}
                    />
                    <TextField
                        placeholder="Enter Key"
                        label="Secret Key"
                        value={key}
                        type="text"
                        onChange={(e)=>{
                            if(e.target.value !== "" && !ALPHA_REGEX.test(e.target.value))
                            return;
                            onKeyChange(e.target.value)
                        }}
                    />
                    <TextField
                        placeholder="Enter Cipher"
                        label="Cipher"
                        value={cipher}
                        onChange={(e)=>{
                            if(e.target.value !== "" && !ALPHA_REGEX.test(e.target.value))
                            return;
                            onCipherChange(e.target.value)
                        }}
                    />
                </Main>
            </Container>
        </ThemeProvider>
    );
}
