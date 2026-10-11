import React from 'react';

export default function Register({ onToggle }) {
  return (
    <div style={styles.formContent}>
      <h2 style={styles.title}>Create Account</h2>
      <p style={styles.subtitle}>Please fill in your details for your SVD project</p>
      
      <form onSubmit={(e) => e.preventDefault()} style={styles.form}>
        <input type="text" placeholder="Full Name" style={styles.input} required />
        <input type="email" placeholder="Email Address" style={styles.input} required />
        <input type="password" placeholder="Password" style={styles.input} required />
        
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>

      <p style={styles.switchText}>
        Already have an account?{' '}
        <span style={styles.link} onClick={onToggle}>Sign In</span>
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