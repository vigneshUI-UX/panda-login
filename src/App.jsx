import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const fullText = "Welcome Back!";

  // Starts fully closed, then slides back to remain as top/bottom layers after 1.2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Typewriter effect for header title
  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  const handleToggle = () => {
    setIsRightPanelActive(!isRightPanelActive);
  };

  return (
    <div style={{ position: 'relative', width: '950px', height: '550px', overflow: 'hidden', borderRadius: '20px', backgroundColor: '#fff', boxShadow: '0 14px 28px rgba(0,0,0,0.1)' }}>
      
      {/* Main Login / Register Container underneath */}
      <div style={{ ...styles.container, ...(isRightPanelActive ? styles.rightPanelActive : {}) }}>
        
        {/* Sign Up Form Container */}
        <div style={{
          ...styles.formContainer,
          ...styles.signUpContainer,
          ...(isRightPanelActive ? styles.signUpActive : {})
        }}>
          <Register onToggle={handleToggle} />
        </div>

        {/* Sign In Form Container */}
        <div style={{
          ...styles.formContainer,
          ...styles.signInContainer,
          ...(isRightPanelActive ? styles.signInActive : {})
        }}>
          <Login onToggle={handleToggle} />
        </div>

        {/* Sliding Overlay Container */}
        <div style={{
          ...styles.overlayContainer,
          ...(isRightPanelActive ? styles.overlayContainerActive : {})
        }}>
          <div style={{
            ...styles.overlay,
            ...(isRightPanelActive ? styles.overlayActive : {})
          }}>
            {/* Left Overlay Panel */}
            <div style={{
              ...styles.overlayPanel,
              ...styles.overlayLeft,
              ...(isRightPanelActive ? styles.overlayLeftActive : {})
            }}>
              <h2 style={styles.overlayTitle}>Hello, Friend!</h2>
              <p style={styles.overlayText}>Enter your personal details and start your journey with SVD</p>
            </div>

            {/* Right Overlay Panel (Centered Content) */}
            <div style={{
              ...styles.overlayPanel,
              ...styles.overlayRight,
              ...(isRightPanelActive ? styles.overlayRightActive : {})
            }}>
              <h2 style={{ ...styles.overlayTitle, textAlign: 'center', width: '100%' }}>{displayText}</h2>
              <p style={{ ...styles.overlayText, textAlign: 'center' }}>Secure access to your digital workspace. Sign in to manage your account, monitor activities, and stay in control.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Top Cloud Layer */}
      <div style={{
        ...styles.cloudMask,
        ...styles.cloudTopMask,
        ...(isLoaded ? styles.cloudTopOpen : {})
      }}>
        <svg viewBox="0 0 1200 200" preserveAspectRatio="none" style={styles.cloudSvgTop}>
          <path fill="#20b2aa" d="M0,0 L0,100 C100,180 200,60 350,130 C500,200 600,80 750,140 C900,200 1000,70 1200,120 L1200,0 Z"></path>
        </svg>
      </div>

      {/* Bottom Cloud Layer */}
      <div style={{
        ...styles.cloudMask,
        ...styles.cloudBottomMask,
        ...(isLoaded ? styles.cloudBottomOpen : {})
      }}>
        <svg viewBox="0 0 1200 200" preserveAspectRatio="none" style={styles.cloudSvgBottom}>
          <path fill="#20b2aa" d="M0,200 L0,100 C100,20 200,140 350,70 C500,0 600,120 750,60 C900,0 1000,130 1200,80 L1200,200 Z"></path>
        </svg>
      </div>

    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: '20px',
    overflow: 'hidden',
    zIndex: 1
  },
  cloudMask: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '50%',
    zIndex: 999,
    pointerEvents: 'none',
    transition: 'transform 1.2s cubic-bezier(0.77, 0, 0.175, 1)'
  },
  cloudTopMask: {
    top: 0,
    transform: 'translateY(0)'
  },
  cloudTopOpen: {
    transform: 'translateY(-140px)'
  },
  cloudBottomMask: {
    bottom: 0,
    transform: 'translateY(0)'
  },
  cloudBottomOpen: {
    transform: 'translateY(140px)'
  },
  cloudSvgTop: {
    width: '100%',
    height: '100%',
    display: 'block'
  },
  cloudSvgBottom: {
    width: '100%',
    height: '100%',
    display: 'block',
    position: 'absolute',
    bottom: 0
  },
  formContainer: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '50%',
    transition: 'all 0.6s ease-in-out'
  },
  signInContainer: {
    left: 0,
    zIndex: 2
  },
  signUpContainer: {
    left: 0,
    zIndex: 1,
    opacity: 0
  },
  signUpActive: {
    transform: 'translateX(100%)',
    opacity: 1,
    zIndex: 5
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: '50%',
    width: '50%',
    height: '100%',
    overflow: 'hidden',
    transition: 'transform 0.6s ease-in-out',
    zIndex: 100
  },
  overlayContainerActive: {
    transform: 'translateX(-100%)'
  },
  overlay: {
    // Pure white background with black text content styling
    background: '#ffffff',
    color: '#000000',
    position: 'relative',
    left: '-100%',
    height: '100%',
    width: '200%',
    transform: 'translateX(0)',
    transition: 'transform 0.6s ease-in-out'
  },
  overlayActive: {
    transform: 'translateX(50%)'
  },
  overlayPanel: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '0 40px',
    textAlign: 'center',
    top: 0,
    height: '100%',
    width: '50%',
    transition: 'transform 0.6s ease-in-out'
  },
  overlayLeft: {
    transform: 'translateX(-20%)'
  },
  overlayLeftActive: {
    transform: 'translateX(0)'
  },
  overlayRight: {
    right: 0,
    transform: 'translateX(0)'
  },
  overlayTitle: {
    fontSize: '26px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#000000'
  },
  overlayText: {
    fontSize: '13px',
    fontWeight: '300',
    lineHeight: '20px',
    letterSpacing: '0.5px',
    margin: 0,
    color: '#333333'
  }
};