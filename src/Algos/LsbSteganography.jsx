import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// import { getOpenCv } from "./loader";
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
  paddingTop: '20vh',
  gap: 10,
});
const Main = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
});
const Img = styled('img')({
  height: '40vh',
  width: '20vw',
  objectFit: 'cover'
})
const LsbSteganography = () => {
  const [showDecodeError, setShowDecodeError] = useState(false);
  const [init, setInit] = useState(false)
  const [encode, setEncode] = useState(true);

  const [inputImg, setInputImg] = useState(null);
  const [message, setMessage] = useState("");
  const [encodedImg, setEncodedImg] = useState(null);
  const [isLoading, setLoader] = useState(false);

  //decoding states
  const [decodedMsg, setDecodedMsg] = useState("")

  function stringToBinary(message) {
    let bin_message = '';
    for (let i = 0; i < message.length; i++) {
      const binaryChar = message.charCodeAt(i).toString(2).padStart(8, '0');
      bin_message += binaryChar;
    }
    return bin_message;
  }

  // Function to convert the outputArray to an image
  function arrayToImage(outputArray) {
    setLoader(true);
    // Create a new canvas to draw the image data
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set the canvas size to match the dimensions of the outputArray
    canvas.width = outputArray[0].length;
    canvas.height = outputArray.length;

    // Create an ImageData object to hold the pixel data
    const imageData = ctx.createImageData(canvas.width, canvas.height);

    // Fill the ImageData with the pixel data from the outputArray
    let index = 0;
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        imageData.data[index] = outputArray[y][x][0];     // Red channel
        imageData.data[index + 1] = outputArray[y][x][1]; // Green channel
        imageData.data[index + 2] = outputArray[y][x][2]; // Blue channel
        imageData.data[index + 3] = outputArray[y][x][3]; // Alpha channel
        index += 4; // Move to the next pixel (4 channels per pixel)
      }
    }

    ctx.putImageData(imageData, 0, 0);

    // Create a new image and set its source to the canvas data
    const image = new Image();
    image.src = canvas.toDataURL();
    setEncodedImg(canvas.toDataURL())
    setLoader(false);
  }

  const handleFileUpload = (e) => {
    console.log("DEBUG: handleFileUpload start")
    setLoader(true);
    const file = e.target.files[0];
    setInit(false)
    setEncode(true)
    if (file && (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg")) {
      if (file.type === "image/jpeg" || file.type === "image/jpg") {
        setShowDecodeError(true);
      }
      else {
        setShowDecodeError(false);
      }
      // Convert the image to a PNG image
      convertToPng(file)
        .then((pngImage) => {
          setInputImg(pngImage);
          setEncodedImg(null);
        })
        .catch((error) => {
          console.error("Error converting image to PNG:", error);
          setInputImg(null);
          setEncodedImg(null);
        });
    } else {
      setInputImg(null);
      setEncodedImg(null);
    }
    setLoader(false);
    console.log("DEBUG: handleFileUpload end")
  }

  // Function to convert any image to a PNG image using the FileReader API
  const convertToPng = (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          // Convert the image to PNG format by drawing it onto a canvas and then converting the canvas to data URL
          const dataUrl = canvas.toDataURL('image/png');
          const pngImage = dataURLToBlob(dataUrl);
          resolve(pngImage);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(imageFile);
    });
  }

  // Helper function to convert data URL to a Blob object
  const dataURLToBlob = (dataURL) => {
    setLoader(true);
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    setLoader(false);
    return new Blob([arrayBuffer], { type: mimeString });
  }


  const encodeMessage = () => {
    setLoader(true);
    const bin_message = stringToBinary(message + "%")
    const N = bin_message.length
    console.log(bin_message + " " + N);
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const pixelData = imageData.data;
        // Convert the pixel data to a 2D array (height x width x 4 channels)
        const imageArray = new Array(img.height);
        let index = 0;
        for (let y = 0; y < img.height; y++) {
          imageArray[y] = new Array(img.width);
          for (let x = 0; x < img.width; x++) {
            imageArray[y][x] = [
              pixelData[index],         // Red channel
              pixelData[index + 1],     // Green channel
              pixelData[index + 2],     // Blue channel
              pixelData[index + 3],     // Alpha channel
            ];
            index += 4; // Move to the next pixel (4 channels per pixel)
          }
        }
        let count = 0
        const outputArray = Array.from(imageArray)
        console.log(imageArray);
        for (let i = 0; i < imageArray.length; i++) {
          for (let j = 0; j < imageArray[0].length; j++) {
            if (count < N) {
              console.log("count" + count + " " + N + " " + imageArray[i][j].length)
              for (let k = 0; k < imageArray[i][j].length; k++) {
                let LSB = imageArray[i][j][k] & 1
                console.log(LSB);
                if (LSB != parseInt(bin_message.charAt(Math.min(count, N - 1)))) {
                  console.log("Changed bit");
                  outputArray[i][j][k] = (imageArray[i][j][k] & ~1) | parseInt(bin_message.charAt(Math.min(count, N - 1)))
                }
                count += 1
              }
            }
          }
        }
        console.log(outputArray);
        arrayToImage(outputArray)
      };
      img.src = e.target.result;
    };

    reader.readAsDataURL(inputImg);
    setLoader(false);
  }

  // Function to convert binary message to a human-readable string
  function binaryToMessage(bin_message) {
    let message = "";
    for (let i = 0; i < bin_message.length; i += 8) {
      const byte = bin_message.substr(i, 8);
      const char = String.fromCharCode(parseInt(byte, 2));
      if (char === '%') {
        break;
      } else {
        message += char;
      }
    }
    return message;
  }

  const decodeMessage = () => {
    setLoader(true)
    console.log(inputImg.type)
    if (showDecodeError) {
      // Show an error message since the file is not a PNG image
      alert("Please upload a valid PNG image for decoding.");
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const pixelData = imageData.data;
        // Convert the pixel data to a 2D array (height x width x 4 channels)
        const imageArray = new Array(img.height);
        let index = 0;
        for (let y = 0; y < img.height; y++) {
          imageArray[y] = new Array(img.width);
          for (let x = 0; x < img.width; x++) {
            imageArray[y][x] = [
              pixelData[index],         // Red channel
              pixelData[index + 1],     // Green channel
              pixelData[index + 2],     // Blue channel
              pixelData[index + 3],     // Alpha channel
            ];
            index += 4; // Move to the next pixel (4 channels per pixel)
          }
        }
        let msg = ""
        for (let i = 0; i < imageArray.length; i++) {
          for (let j = 0; j < imageArray[0].length; j++) {
            for (let k = 0; k < imageArray[i][j].length; k++) {
              let LSB = imageArray[i][j][k] & 1
              msg += LSB
            }
          }
        }
        console.log(msg);
        setDecodedMsg(binaryToMessage(msg))
      };
      img.src = e.target.result;
    };

    reader.readAsDataURL(inputImg);
    setLoader(false)
  }

  return (
    <ThemeProvider theme={theme}>
      {isLoading ? (<Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
      ) :
        (
          <>
            <CssBaseline />
            <Container>
              <Button
                component="label"
                variant="contained"
                color="primary"
                startIcon={<UploadFileIcon />}
                sx={{ marginRight: "1rem" }}
              >
                Upload image
                <input type="file" accept="image/*" hidden onChange={handleFileUpload} />
              </Button>

              {inputImg &&
                <>
                  <Img src={URL.createObjectURL(inputImg)} alt="InputImage" />
                  <Main>
                    <Button
                      component="label"
                      variant="contained"
                      color="primary"
                      onClick={(e) => { setEncode(true); setInit(true); }}
                      sx={{ marginRight: "1rem" }}>Encode Image</Button>
                    <Button
                      component="label"
                      variant="contained"
                      color="primary"
                      onClick={(e) => { setEncode(false); setInit(true); decodeMessage() }}
                      sx={{ marginRight: "1rem" }}>Decode Image</Button>
                  </Main>
                </>
              }

              {(encode && inputImg) ?
                <>
                  {(inputImg && init) && (
                    <>
                      <TextField
                        variant="outlined"
                        id="outlined-basic"
                        label="Enter message to Encode"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        sx={{ marginTop: "1rem" }}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={encodeMessage}
                        sx={{ marginTop: "1rem" }}
                      >
                        Encode Message
                      </Button>
                      {encodedImg && (
                        <>
                          <Button
                            variant="contained"
                            color="primary"
                            href={encodedImg} download="encoded_image.png"
                            sx={{ marginTop: "1rem" }}
                          >
                            Download
                          </Button>
                          <Img
                            src={encodedImg}
                            alt="Encoded Image"
                          />
                        </>
                      )}
                    </>
                  )}
                </> :
                <>
                  {(inputImg && init) && <>
                    {decodedMsg && (
                      <>
                        <TextField variant="outlined"
                          id="outlined-basic"
                          label="Decoded Message"
                          value={decodedMsg}
                          sx={{ marginTop: "1rem" }}
                        />
                      </>)}</>}
                </>}
            </Container></>)}
    </ThemeProvider>
  );
}

export default LsbSteganography;
