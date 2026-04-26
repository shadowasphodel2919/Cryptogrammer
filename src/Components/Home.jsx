import React, { useEffect, useRef, useState } from 'react';
import './Home.css';

const FINAL_TEXT = "CRYPTOGRAMMER";
const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/";

export const Home = () => {
  const canvasRef = useRef(null);
  const [displayText, setDisplayText] = useState("");
  
  // Matrix Background Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const binaryChars = '01';
    const fontSize = 16;
    let columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }
    
    const draw = () => {
      // Black BG for the canvas
      // translucent BG to show trail
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#0f0'; // Green text
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = binaryChars.charAt(Math.floor(Math.random() * binaryChars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    const interval = setInterval(draw, 33);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Cipher Text Animation
  useEffect(() => {
    let iteration = 0;
    const maxIterations = 30; // Number of times to scramble before finishing
    let animationFrame;
    
    const animateText = () => {
      setDisplayText((prev) => {
        return FINAL_TEXT.split("")
          .map((letter, index) => {
            if (index < iteration / 2) {
              return FINAL_TEXT[index];
            }
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join("");
      });
      
      if (iteration < maxIterations * 2) {
        iteration++;
        // Adjust speed by changing the timeout
        setTimeout(() => {
          animationFrame = requestAnimationFrame(animateText);
        }, 50); 
      }
    };
    
    // Start animation
    animateText();
    
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="home-container">
      <canvas ref={canvasRef} className="matrix-canvas"></canvas>
      <div className="content-overlay">
        <h1 className="cyber-text" data-text={FINAL_TEXT}>
          {displayText}
        </h1>
        <p className="subtitle">Secure • Encrypt • Decode</p>
      </div>
    </div>
  );
};

export default Home;
