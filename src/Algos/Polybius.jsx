import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
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

const PolybiusCipher = () => {
  const [plaintext, setPlaintext] = useState("");
  const [cipherText, setCipherText] = useState("");

  const polybiusGrid = [
    ['A', 'B', 'C', 'D', 'E'],
    ['F', 'G', 'H', 'I', 'K'], // Note: J and I are often combined in the same cell
    ['L', 'M', 'N', 'O', 'P'],
    ['Q', 'R', 'S', 'T', 'U'],
    ['V', 'W', 'X', 'Y', 'Z']
  ];

  function onMessageChange(txt){
    setPlaintext(txt);
    let c1 = encode(txt);
    setCipherText(c1);
  }

  const encode = (txt) => {
    const upperCaseInput = txt.toUpperCase();
    // Function to find the coordinates of a letter in the Polybius Square
    function findCoordinates(letter) {
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          if (polybiusGrid[i][j] === letter) {
            return [i + 1, j + 1]; // Adding 1 to make coordinates 1-indexed
          }
        }
      }
    }
    // Process each character in the input string
    const cipheredResult = upperCaseInput
      .split('')
      .map(char => {
        if (char === 'J') char = 'I'; // Combine J and I
        if (char === ' ') return ' '; // Ignore spaces

        const [row, col] = findCoordinates(char);
        return `${row}${col}`;
      })
      .join(' ');

      return cipheredResult;
  };
  return (
    <>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <h1>Polybius Cipher</h1>
          <Main>
            <TextField
              placeholder="Enter Message"
              label="Message"
              value={plaintext}
              type="text"
              onChange={(e)=>onMessageChange(e.target.value)}
            />
            <TextField
              placeholder="Enter Cipher"
              label="Cipher"
              value={cipherText}
            />
          </Main>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default PolybiusCipher;
