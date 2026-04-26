import React, { useState, useRef } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import "./LsbSteganography.css";

const LsbSteganography = () => {
  const [activeTab, setActiveTab] = useState("encode"); // 'encode' or 'decode'
  
  const [inputImg, setInputImg] = useState(null);
  const [message, setMessage] = useState("");
  const [encodedImg, setEncodedImg] = useState(null);
  const [isLoading, setLoader] = useState(false);
  const [decodedMsg, setDecodedMsg] = useState("");
  const [showDecodeError, setShowDecodeError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  function stringToBinary(message) {
    let bin_message = '';
    for (let i = 0; i < message.length; i++) {
      const binaryChar = message.charCodeAt(i).toString(2).padStart(8, '0');
      bin_message += binaryChar;
    }
    return bin_message;
  }

  function arrayToImage(outputArray) {
    setLoader(true);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = outputArray[0].length;
    canvas.height = outputArray.length;
    const imageData = ctx.createImageData(canvas.width, canvas.height);

    let index = 0;
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        imageData.data[index] = outputArray[y][x][0];     
        imageData.data[index + 1] = outputArray[y][x][1]; 
        imageData.data[index + 2] = outputArray[y][x][2]; 
        imageData.data[index + 3] = outputArray[y][x][3]; 
        index += 4; 
      }
    }

    ctx.putImageData(imageData, 0, 0);
    setEncodedImg(canvas.toDataURL());
    setLoader(false);
  }

  const handleFileProcess = (file) => {
    if (!file) return;
    setLoader(true);
    
    if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg") {
      if (activeTab === "decode" && (file.type === "image/jpeg" || file.type === "image/jpg")) {
        setShowDecodeError(true);
      } else {
        setShowDecodeError(false);
      }

      convertToPng(file)
        .then((pngImage) => {
          setInputImg(pngImage);
          setEncodedImg(null);
          setDecodedMsg("");
          setLoader(false);
        })
        .catch((error) => {
          console.error("Error converting image:", error);
          setInputImg(null);
          setLoader(false);
        });
    } else {
      alert("Please upload a valid image file (PNG/JPG).");
      setLoader(false);
    }
  };

  const handleFileUpload = (e) => {
    handleFileProcess(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const convertToPng = (imageFile) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          let maxWidth = 500, maxHeight = 500;
          let newWidth = img.width;
          let newHeight = img.height;
          
          if (newWidth > maxWidth) {
            newHeight *= maxWidth / newWidth;
            newWidth = maxWidth;
          }
          if (newHeight > maxHeight) {
            newWidth *= maxHeight / newHeight;
            newHeight = maxHeight;
          }
          
          canvas.width = newWidth;
          canvas.height = newHeight;
          ctx.drawImage(img, 0, 0, newWidth, newHeight);
          
          const dataUrl = canvas.toDataURL('image/png');
          const pngImage = dataURLToBlob(dataUrl);
          resolve(pngImage);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(imageFile);
    });
  }

  const dataURLToBlob = (dataURL) => {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: mimeString });
  }

  const encodeMessage = () => {
    if (!message) {
      alert("Please enter a message to hide.");
      return;
    }
    setLoader(true);
    const bin_message = stringToBinary(message + "%");
    const N = bin_message.length;
    
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
        
        const imageArray = new Array(img.height);
        let index = 0;
        for (let y = 0; y < img.height; y++) {
          imageArray[y] = new Array(img.width);
          for (let x = 0; x < img.width; x++) {
            imageArray[y][x] = [
              pixelData[index], pixelData[index + 1], pixelData[index + 2], pixelData[index + 3]
            ];
            index += 4;
          }
        }
        
        let count = 0;
        const outputArray = Array.from(imageArray);
        
        for (let i = 0; i < imageArray.length; i++) {
          for (let j = 0; j < imageArray[0].length; j++) {
            if (count < N) {
              for (let k = 0; k < imageArray[i][j].length; k++) {
                let LSB = imageArray[i][j][k] & 1;
                if (LSB !== parseInt(bin_message.charAt(Math.min(count, N - 1)))) {
                  outputArray[i][j][k] = (imageArray[i][j][k] & ~1) | parseInt(bin_message.charAt(Math.min(count, N - 1)));
                }
                count += 1;
              }
            }
          }
        }
        arrayToImage(outputArray);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(inputImg);
  }

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
    if (showDecodeError) {
      alert("WARNING: JPEG compression corrupts LSB steganography. Please upload the exact PNG file that was generated during encoding.");
      return;
    }
    setLoader(true);
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
        
        const imageArray = new Array(img.height);
        let index = 0;
        for (let y = 0; y < img.height; y++) {
          imageArray[y] = new Array(img.width);
          for (let x = 0; x < img.width; x++) {
            imageArray[y][x] = [
              pixelData[index], pixelData[index + 1], pixelData[index + 2], pixelData[index + 3]
            ];
            index += 4;
          }
        }
        let msg = "";
        for (let i = 0; i < imageArray.length; i++) {
          for (let j = 0; j < imageArray[0].length; j++) {
            for (let k = 0; k < imageArray[i][j].length; k++) {
              let LSB = imageArray[i][j][k] & 1;
              msg += LSB;
            }
          }
        }
        setDecodedMsg(binaryToMessage(msg));
        setLoader(false);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(inputImg);
  }

  const resetState = () => {
    setInputImg(null);
    setEncodedImg(null);
    setMessage("");
    setDecodedMsg("");
    setShowDecodeError(false);
  };

  return (
    <div className="steg-container">
      <div className="steg-header">
        <h1>LSB Steganography</h1>
        <p>Hide secret messages inside the pixels of an image.</p>
      </div>

      <div className="steg-tabs">
        <button 
          className={`steg-tab ${activeTab === 'encode' ? 'active' : ''}`}
          onClick={() => { setActiveTab('encode'); resetState(); }}
        >
          <LockIcon sx={{ fontSize: 18, marginRight: 1, verticalAlign: 'middle' }} />
          Hide Message
        </button>
        <button 
          className={`steg-tab ${activeTab === 'decode' ? 'active' : ''}`}
          onClick={() => { setActiveTab('decode'); resetState(); }}
        >
          <LockOpenIcon sx={{ fontSize: 18, marginRight: 1, verticalAlign: 'middle' }} />
          Reveal Message
        </button>
      </div>

      <div className="steg-workspace glass steg-card">
        {/* Step 1: Upload */}
        {!inputImg && !isLoading && (
          <div 
            className={`drop-zone ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
          >
            <UploadFileIcon sx={{ fontSize: 48, color: 'var(--accent-color)' }} />
            <p>Drag & drop an image here, or <span className="browse-text">browse files</span></p>
            <p style={{ fontSize: '0.8rem' }}>{activeTab === 'decode' ? 'Must be a lossless PNG.' : 'PNG or JPG accepted.'}</p>
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef}
              onChange={handleFileUpload} 
            />
          </div>
        )}

        {/* Loader */}
        {isLoading && (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        )}

        {/* Workspace once image is uploaded */}
        {inputImg && !isLoading && (
          <div className="preview-container">
            <img src={URL.createObjectURL(inputImg)} alt="Preview" className="image-preview" />
            
            <button className="btn-primary" style={{ padding: '5px 10px', fontSize: '0.9rem', borderRadius: '4px' }} onClick={resetState}>
              Clear Image
            </button>
            
            {/* ENCODE WORKFLOW */}
            {activeTab === 'encode' && !encodedImg && (
              <>
                <textarea 
                  className="steg-input"
                  placeholder="Enter your secret message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button className="steg-button btn-primary" onClick={encodeMessage}>
                  <LockIcon sx={{ marginRight: 1, verticalAlign: 'middle' }} />
                  Encrypt & Hide
                </button>
              </>
            )}

            {/* DECODE WORKFLOW */}
            {activeTab === 'decode' && !decodedMsg && (
              <>
                {showDecodeError && (
                  <p style={{ color: 'var(--color-error)', margin: 0, textAlign: 'center' }}>
                    Warning: You uploaded a JPEG. JPEG compression destroys LSB data. Decryption will likely result in gibberish.
                  </p>
                )}
                <button className="steg-button btn-primary" onClick={decodeMessage}>
                  <LockOpenIcon sx={{ marginRight: 1, verticalAlign: 'middle' }} />
                  Decrypt & Extract
                </button>
              </>
            )}

            {/* RESULTS */}
            {encodedImg && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                <h3 style={{ color: 'var(--accent-color)' }}>Success! Message Hidden.</h3>
                <p>Download the image and send it securely. Do NOT compress it or convert it to JPG.</p>
                <a href={encodedImg} download="secret_image.png" style={{ textDecoration: 'none' }}>
                  <button className="steg-button btn-primary">
                    <DownloadIcon sx={{ marginRight: 1, verticalAlign: 'middle' }} />
                    Download Secret Image
                  </button>
                </a>
              </div>
            )}

            {decodedMsg && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '1rem', width: '100%' }}>
                <h3 style={{ color: 'var(--accent-color)' }}>Message Extracted!</h3>
                <textarea 
                  className="steg-input"
                  value={decodedMsg}
                  readOnly
                  style={{ borderColor: 'var(--accent-color)', outline: 'none' }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LsbSteganography;
