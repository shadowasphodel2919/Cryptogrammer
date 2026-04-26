import React from 'react';
import { Link } from 'react-router-dom';

const algosData = [
  {
    name: "Caeser Cipher",
    path: "/algorithms/caeser",
    description: "A substitution cipher that shifts characters by a fixed number of positions."
  },
  {
    name: "Vignere Cipher",
    path: "/algorithms/vignere",
    description: "A method of encrypting alphabetic text using a simple form of polyalphabetic substitution."
  },
  {
    name: "Playfair Cipher",
    path: "/algorithms/playfair",
    description: "A manual symmetric encryption technique that encrypts pairs of letters (digraphs)."
  },
  {
    name: "Atbash Cipher",
    path: "/algorithms/atbash",
    description: "A substitution cipher where the alphabet is mapped to its reverse."
  },
  {
    name: "Railfence Cipher",
    path: "/algorithms/railfence",
    description: "A transposition cipher that writes text diagonally downwards and reads it off row-by-row."
  },
  {
    name: "Polybius Cipher",
    path: "/algorithms/polybiusCipher",
    description: "A device for fractionating plaintext characters into a smaller set of symbols."
  },
  {
    name: "Beaufort Cipher",
    path: "/algorithms/beaufort",
    description: "A substitution cipher similar to Vigenère, but using a slightly different mechanism."
  },
  {
    name: "RSA Algorithm",
    path: "/algorithms/rsa",
    description: "A public-key cryptosystem widely used for secure data transmission."
  },
  {
    name: "Affine Cipher",
    path: "/algorithms/affine",
    description: "A type of monoalphabetic substitution cipher based on a mathematical function."
  }
];

export const Algorithms = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--accent-color)', textShadow: '0 0 10px var(--accent-glow)' }}>
                    Cryptographic Algorithms
                </h1>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '1rem auto' }}>
                    Explore classic and modern encryption algorithms. Learn how they work, 
                    view examples, and test them interactively in the sandbox.
                </p>
            </div>
            <section className="algos">
                {algosData.map((algo) => (
                    <Link to={algo.path} key={algo.name} style={{ textDecoration: 'none' }}>
                        <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                                {algo.name}
                            </h2>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                                {algo.description}
                            </p>
                            <div style={{ marginTop: 'auto', paddingTop: '1rem', color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                EXPLORE ALGORITHM →
                            </div>
                        </div>
                    </Link>
                ))}
            </section>
        </div>
    );
}