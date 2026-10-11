import React, { useState, useEffect } from 'react';

export default function Login({ onToggle }) {
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });

  // Track mouse movement to make the panda eyes follow the cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Calculate subtle movement range (-3px to +3px)
      const x = ((e.clientX / innerWidth) - 0.5) * 6;
      const y = ((e.clientY / innerHeight) - 0.5) * 6;
      setPupilOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={styles.formContent}>
      <div style={{ marginBottom: '10px' }}>
        {isPasswordFocused ? (
          /* Sleeping Panda SVG (Eyes Closed) */
          <svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="36" r="20" fill="#FFFFFF" stroke="#333333" strokeWidth="3"/>
            <circle cx="20" cy="22" r="8" fill="#333333"/>
            <circle cx="44" cy="22" r="8" fill="#333333"/>
            {/* Closed Eyes / Sleeping Arcs */}
            <path d="M23 34C24 37 28 37 29 34" stroke="#333333" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M35 34C36 37 40 37 41 34" stroke="#333333" strokeWidth="2.5" strokeLinecap="round"/>
            {/* Cute nose and mouth */}
            <ellipse cx="32" cy="40" rx="3" ry="2" fill="#333333"/>
            <path d="M32 42V45M29 46C30 47 34 47 35 46" stroke="#333333" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          /* Awake Panda SVG with Cursor-Tracking Pupils */
          <svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="36" r="20" fill="#FFFFFF" stroke="#333333" strokeWidth="3"/>
            <circle cx="20" cy="22" r="8" fill="#333333"/>
            <circle cx="44" cy="22" r="8" fill="#333333"/>
            {/* Eye Patches */}
            <ellipse cx="24" cy="34" rx="5" ry="6" fill="#333333" transform="rotate(-15 24 34)"/>
            <ellipse cx="40" cy="34" rx="5" ry="6" fill="#333333" transform="rotate(15 40 34)"/>
            {/* Dynamic Eyeballs tracking cursor */}
            <circle 
              cx={25 + pupilOffset.x} 
              cy={34 + pupilOffset.y} 
              r="2" 
              fill="#FFFFFF" 
              style={{ transition: 'cx 0.1s ease, cy 0.1s ease' }} 
            />
            <circle 
              cx={39 + pupilOffset.x} 
              cy={34 + pupilOffset.y} 
              r="2" 
              fill="#FFFFFF" 
              style={{ transition: 'cx 0.1s ease, cy 0.1s ease' }} 
            />
            {/* Nose and Mouth */}
            <ellipse cx="32" cy="40" rx="3" ry="2" fill="#333333"/>
            <path d="M32 42V45M29 46C30 47 34 47 35 46" stroke="#333333" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )}
      </div>

      <h2 style={styles.title}>Hello!</h2>
      <p style={styles.subtitle}>Sign in to your SVD account</p>
      
      <form onSubmit={(e) => e.preventDefault()} style={styles.form}>
        <input 
          type="email" 
          placeholder="Email Address" 
          style={styles.input} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          style={styles.input} 
          required 
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
        />
        
        <div style={styles.optionsRow}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#forgot" style={{ color: '#666', textDecoration: 'none' }}>Forgot password?</a>
        </div>

        <button type="submit" style={styles.button}>Sign In</button>
      </form>

      <p style={styles.switchText}>
        Don't have an account?{' '}
        <span style={styles.link} onClick={onToggle}>Create</span>
      </p>
    </div>
  );
}

const styles = {
  formContent: {
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '0 40px',
    height: '100%',
    textAlign: 'center'
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
    margin: '5px 0'
  },
  subtitle: {
    fontSize: '12px',
    color: '#888',
    marginBottom: '20px'
  },
  form: {
    width: '100%'
  },
  input: {
    backgroundColor: '#f9f9f9',
    border: '1px solid #e1e1e1',
    padding: '12px 15px',
    fontSize: '12px',
    borderRadius: '8px',
    width: '100%',
    outline: 'none',
    margin: '8px 0',
    boxSizing: 'border-box'
  },
  optionsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    fontSize: '11px',
    color: '#666',
    margin: '8px 0 15px 0'
  },
  button: {
    backgroundColor: '#2ecc71',
    color: '#fff',
    fontSize: '12px',
    fontWeight: '600',
    padding: '12px 45px',
    border: 'none',
    borderRadius: '20px',
    letterSpacing: '1px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '10px',
    textTransform: 'uppercase'
  },
  switchText: {
    fontSize: '12px',
    color: '#777',
    marginTop: '15px'
  },
  link: {
    color: '#2ecc71',
    fontWeight: '600',
    cursor: 'pointer'
  }
};