import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import bigInt from "big-integer";
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
const Details = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  });
const Main = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  });
export const RSA = () => {
    const [p, setP] = useState(0)
    const [q, setQ] = useState(0)
    const [n, setn] = useState(0)
    const [cp, setCp] = useState(0)
    const [d, setd] = useState(0)
    const [tf, setTf] = useState(0)
    const [message, setMessage] = useState("")
    const [cipher, setCipher] = useState("")
    const [validE, setValidE] = useState([])
    const [validPQ, setValidPQ] = useState(false)
    const [validD, setValidD] = useState(false)
    const [init, setInit] = useState(false)
    const [decode, setDecode] = useState(false)
    const [codedMsg, setCodedMsg] = useState("")
    const [decodedMsg, setDecodedMsg] = useState("")
    const [num, setNum] = useState(0)
    const [key, setKey] = useState(0);
    const [err1, setErr1] = useState("")
    const [err2, setErr2] = useState("")
    useEffect(() => {
      if (tf > 0) {
        setValidE(findE(tf));
      }
    }, [tf]);
    useEffect(() => {
      setCipher(rsaEncode(message,cp,n).join(' '));
    }, [message])
    function gcd(a, b) {
      if (b === 0) {
        return a;
      }
      
      return gcd(b, a % b);
    }
    function findE(n) {
      const coprimes = [];
      
      for (let i = 1; i <= n; i++) {
        if (gcd(n, i) === 1) {
          coprimes.push(i);
        }
      }
      return coprimes;
    }
    function isPrime(n) {
        if (n <= 1) {
          return false;
        }
        if (n <= 3) {
          return true;
        }
        if (n % 2 === 0 || n % 3 === 0) {
          return false;
        }
      
        for (let i = 5; i * i <= n; i += 6) {
          if (n % i === 0 || n % (i + 2) === 0) {
            return false;
          }
        }      
        return true;
    }
    const step1 = (e) => {
      e.preventDefault();
        if(isPrime(p) && isPrime(q)){
            setTf((p-1)*(q-1))
            setn(p*q)
            setValidPQ(true)
            console.log("Set");
        }
    }
    function modInverse(a, m) {
      let m0 = m;
      let y = 0;
      let x = 1;
    
      if (m === 1) return 0;
    
      while (a > 1) {
        let q = Math.floor(a / m);
        let t = m;
    
        m = a % m;
        a = t;
        t = y;
    
        y = x - q * y;
        x = t;
      }
    
      if (x < 0) x += m0;
    
      return x;
    }
    const step2 = (e) => {
      setd(modInverse(cp,tf))
      setValidD(true)
      setInit(true)
    }
    function rsaEncode(message, e, n) {
      let messageNum = [];
      for (let i = 0; i < message.length; i++) {
        messageNum.push(message.charCodeAt(i));
      }
      let encodedNum = [];
      for (let i = 0; i < messageNum.length; i++) {
        let char = messageNum[i];
        let encodedChar = bigInt(char).pow(e).mod(n);
        encodedNum.push(encodedChar.toString(10));
      }
      return encodedNum;
    }
    function rsaDecode(str, d, n){
      let coded = str.split(" ")
      let decodedNum = [];
      for (let i = 0; i < coded.length; i++) {
        let char = bigInt(coded[i]).pow(d).mod(n);
        decodedNum.push(char);
      }
      let decodedMessage = '';
      for (let i = 0; i < decodedNum.length; i++) {
        let charCode = decodedNum[i];
        decodedMessage += String.fromCharCode(charCode);
      }
      return decodedMessage;
    }
    function changePanel(){
      setDecode(true)
    }
    const decodeMessage = () => {
      setDecodedMsg(rsaDecode(codedMsg, key, num))
    }
    const handleP = (val) => {
      setP(val)
      if(val !== '' && !isPrime(val)){
        setErr1("Please enter a prime number")
      }else{
        setErr1('')
      }
    }
    const handleQ = (val) => {
      setQ(val)
      if(val !== '' && !isPrime(val)){
        setErr2("Please enter a prime number")
      }else{
        setErr2('')
      }
    }
    return (<ThemeProvider theme={theme}>
        <CssBaseline />
        {decode?<>
          <Container>
          <Details>
          <TextField
            id="outlined"
            label="d"
            value={key}
            onChange={(e)=>setKey(e.target.value)}
          />
          <TextField
            id="outlined"
            label="n"
            value={num}
            onChange={(e)=>setNum(e.target.value)}
          />
          <Button 
          variant="contained" 
          color="primary" 
          onClick={(e)=>decodeMessage(e)}>Decode</Button>
          </Details>
          <Main>
            <TextField
              placeholder="Enter Encoded Text"
              multiline
              rows={10}
              style={{width: 400}}
              onChange={(e)=>setCodedMsg(e.target.value)}
            />
            <TextField
              placeholder="Decoded Text"
              multiline
              value={decodedMsg}
              rows={10}
              style={{width: 400}}
            />
          </Main>
        </Container>
        </>:<>
        {!init ? 
        <Container>
        <>
        <Button variant="contained" color="primary" onClick={(e)=>changePanel()}>Decode Instead</Button>
        <TextField
          required
          id="outlined-required"
          label="Select P"
          onChange={(e)=>handleP(e.target.value)}
          type="number"
          error={err1 !== ''}
          helperText={err1}
        />
        <TextField
          required
          id="outlined-required"
          label="Select Q"
          onChange={(e)=>handleQ(e.target.value)}
          type="number"
          error={err2 !== ''}
          helperText={err2}
        />
        {!validPQ && <Button type="submit" variant="contained" color="primary" onClick={(e)=>step1(e)}>
          Calculate n,φ(n)
        </Button>}
        </>
        {validPQ && 
        <>
        <TextField
          id="outlined"
          label="Totient Function"
          value={tf}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined"
          label="n"
          value={n}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined"
          label="Predicted Values for e"
          value={validE}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined"
          label="Select e"
          value={cp}
          onChange={(e)=>setCp(e.target.value)}
        />
        {!validD && <Button type="submit" variant="contained" color="primary" onClick={(e)=>step2(e)}>
          Calculate d
        </Button>}
        </>
        }
        {validD && 
          <>
          <TextField
            id="outlined"
            label="d"
            value={d}
            InputProps={{
              readOnly: true,
            }}
          />
          </>
        }
        </Container>
        :
        <Container>
          <Details>
          <TextField
            id="outlined"
            label="p"
            value={p}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            id="outlined"
            label="q"
            value={q}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            id="outlined"
            label="n"
            value={n}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            id="outlined"
            label="Totient Function"
            value={tf}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            id="outlined"
            label="e"
            value={cp}
            InputProps={{
              readOnly: true,
            }}
          />
          </Details>
          <Main>
            <TextField
              placeholder="Enter Message"
              multiline
              rows={10}
              style={{width: 400}}
              onChange={(e)=>setMessage(e.target.value)}
            />
            <TextField
              placeholder="Encoded Text"
              multiline
              value={cipher}
              rows={10}
              style={{width: 400}}
            />
          </Main>
      </Container>}
      </>}
    </ThemeProvider>);
}
