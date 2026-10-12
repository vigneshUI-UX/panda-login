import { useEffect, useRef, useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import "./App.css";

const STARS = Array.from({ length: 30 }, (_, i) => ({
  left: (i * 37) % 100,
  top: (i * 53) % 100,
  delay: (i % 7) * 0.4,
}));

function Monkey({ wearingCoolers }) {
  const ref = useRef(null);
  const [eye, setEye] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      const monkey = ref.current?.getBoundingClientRect();
      if (!monkey) return;

      const dx = e.clientX - (monkey.left + monkey.width / 2);
      const dy = e.clientY - (monkey.top + monkey.height / 2);
      const distance = Math.max(1, Math.hypot(dx, dy));

      setEye({
        x: (dx / distance) * 2,
        y: (dy / distance) * 2,
      });
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 120 120"
      className="monkey"
      aria-label="3D Monkey"
    >
      <defs>
        {/* 3D Head Gradient */}
        <radialGradient id="headGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#c68b59" />
          <stop offset="55%" stopColor="#9a5f32" />
          <stop offset="100%" stopColor="#633716" />
        </radialGradient>

        {/* 3D Ear Gradient */}
        <radialGradient id="earGrad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#b47748" />
          <stop offset="100%" stopColor="#5c3112" />
        </radialGradient>

        {/* Inner Ear Gradient */}
        <radialGradient id="innerEarGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f3d1b0" />
          <stop offset="100%" stopColor="#d2986e" />
        </radialGradient>

        {/* Muzzle Gradient */}
        <radialGradient id="muzzleGrad" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#f9e4cb" />
          <stop offset="70%" stopColor="#e5be98" />
          <stop offset="100%" stopColor="#c5996f" />
        </radialGradient>

        {/* Dark Glossy Coolers Lens Gradient */}
        <linearGradient id="coolersLensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="50%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>

        {/* Drop Shadow Filter */}
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Back Left Ear */}
      <circle cx="24" cy="55" r="14" fill="url(#earGrad)" filter="url(#shadow)" />
      <circle cx="24" cy="55" r="8" fill="url(#innerEarGrad)" />

      {/* Back Right Ear */}
      <circle cx="96" cy="55" r="14" fill="url(#earGrad)" filter="url(#shadow)" />
      <circle cx="96" cy="55" r="8" fill="url(#innerEarGrad)" />

      {/* Main Head */}
      <circle cx="60" cy="62" r="39" fill="url(#headGrad)" filter="url(#shadow)" />

      {/* Muzzle */}
      <ellipse cx="60" cy="72" rx="26" ry="20" fill="url(#muzzleGrad)" filter="url(#shadow)" />

      {/* Interactive Eyes */}
      <g
        style={{
          opacity: wearingCoolers ? 0.3 : 1,
          transition: "opacity 0.2s ease",
        }}
      >
        <circle cx="46" cy="54" r="7.5" fill="#1a202c" />
        <circle cx="46" cy="54" r="6" fill="#ffffff" />
        <circle cx={46 + eye.x} cy={54 + eye.y} r="2.8" fill="#111827" />
        <circle cx={45 + eye.x} cy={53 + eye.y} r="0.8" fill="#ffffff" />

        <circle cx="74" cy="54" r="7.5" fill="#1a202c" />
        <circle cx="74" cy="54" r="6" fill="#ffffff" />
        <circle cx={74 + eye.x} cy={54 + eye.y} r="2.8" fill="#111827" />
        <circle cx={73 + eye.x} cy={53 + eye.y} r="0.8" fill="#ffffff" />
      </g>

      {/* 3D Nose */}
      <ellipse cx="60" cy="68" rx="5.5" ry="3.8" fill="#4a250d" filter="url(#shadow)" />
      <ellipse cx="58.5" cy="67" rx="1.2" ry="0.8" fill="#8c5332" opacity="0.6" />
      <ellipse cx="61.5" cy="67" rx="1.2" ry="0.8" fill="#8c5332" opacity="0.6" />

      {/* Smile */}
      <path
        d="M50 77 Q60 86 70 77"
        stroke="#4a250d"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* 3D Coolers / Sunglasses Component */}
      <g
        style={{
          transform: wearingCoolers
            ? "translateY(0px) scale(1)"
            : "translateY(-48px) scale(0.75)",
          opacity: wearingCoolers ? 1 : 0,
          transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transformOrigin: "60px 52px",
        }}
        filter="url(#shadow)"
      >
        {/* Left Coolers Lens */}
        <path
          d="M 31 43 L 57 43 Q 59 59 45 61 Q 30 61 31 43 Z"
          fill="url(#coolersLensGrad)"
          stroke="#e2e8f0"
          strokeWidth="2.5"
        />
        {/* Right Coolers Lens */}
        <path
          d="M 63 43 L 89 43 Q 90 61 75 61 Q 61 59 63 43 Z"
          fill="url(#coolersLensGrad)"
          stroke="#e2e8f0"
          strokeWidth="2.5"
        />
        {/* Coolers Bridge */}
        <path
          d="M 57 44 Q 60 47 63 44"
          stroke="#e2e8f0"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        {/* Coolers Frame Arms */}
        <path d="M 31 45 L 20 42" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 89 45 L 100 42" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />

        {/* White Glossy Reflections on Coolers */}
        <path
          d="M 36 46 L 46 46 L 41 57 L 35 57 Z"
          fill="#ffffff"
          opacity="0.35"
        />
        <path
          d="M 68 46 L 78 46 L 73 57 L 67 57 Z"
          fill="#ffffff"
          opacity="0.35"
        />
      </g>
    </svg>
  );
}

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const welcomeText = "Welcome Back!";
  const descriptionText =
    "Secure access to your digital workspace. Sign in to manage your account, monitor activities, and stay in control.";

  const [typedWelcome, setTypedWelcome] = useState("");
  const [typedDescription, setTypedDescription] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setTimeout(() => {
      const typing = setInterval(() => {
        if (index < welcomeText.length) {
          setTypedWelcome(welcomeText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typing);
        }
      }, 120);
      return () => clearInterval(typing);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typedWelcome !== welcomeText) return;
    let index = 0;
    const timer = setTimeout(() => {
      const typing = setInterval(() => {
        if (index < descriptionText.length) {
          setTypedDescription(descriptionText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typing);
        }
      }, 28);
      return () => clearInterval(typing);
    }, 500);
    return () => clearTimeout(timer);
  }, [typedWelcome]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login button clicked!");
  };

  return (
    <div className="panda-page">
      {/* Stars */}
      {STARS.map((star, index) => (
        <span
          key={index}
          className="star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Cloud background */}
      <div className="cloud-wrapper">
        <div className="cloud-middle" />
        <svg className="cloud-top" viewBox="0 0 400 40" preserveAspectRatio="none">
          <path d="M0 40 Q25 0 50 40 Q75 5 100 40 Q125 0 150 40 Q175 5 200 40 Q225 0 250 40 Q275 5 300 40 Q325 0 350 40 Q375 5 400 40 Z" />
        </svg>
        <svg className="cloud-bottom" viewBox="0 0 400 40" preserveAspectRatio="none">
          <path d="M0 40 Q25 0 50 40 Q75 5 100 40 Q125 0 150 40 Q175 5 200 40 Q225 0 250 40 Q275 5 300 40 Q325 0 350 40 Q375 5 400 40 Z" />
        </svg>
      </div>

      {/* Main Content */}
      <main className="login-container">
        <form className="login-card" onSubmit={handleSubmit}>
          <h1>Hello!</h1>
          <p className="subtitle">Sign in to your account</p>

          {/* 3D Monkey Avatar with Coolers */}
          <div className="panda-container">
            <Monkey
              wearingCoolers={passwordFocus || showPassword}
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <Mail className="input-icon" />
            <input type="email" required placeholder="Email Address" />
          </div>

          {/* Password */}
          <div className="input-group">
            <Lock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />

            <button
              type="button"
              className="eye-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* Options */}
          <div className="options">
            <label className="remember">
              <input type="checkbox" defaultChecked />
              <span>Remember me</span>
            </label>

            <a href="#" onClick={(e) => e.preventDefault()}>
              Forgot password?
            </a>
          </div>

          {/* Sign In */}
          <button type="submit" className="sign-in-button">
            SIGN IN
          </button>

          {/* Create Account */}
          <p className="create-account">
            Don't have an account?{" "}
            <a href="#" onClick={(e) => e.preventDefault()}>
              Create
            </a>
          </p>
        </form>

        {/* Welcome Text Section */}
        <section className="welcome-section">
          <div className="welcome-content">
            <h2 className="welcome-title">
              {typedWelcome}
              <span className="typing-cursor">|</span>
            </h2>

            <div
              className={`welcome-line ${
                typedWelcome === welcomeText ? "show-line" : ""
              }`}
            />

            <p className="welcome-description">
              {typedDescription}
              {typedWelcome === welcomeText && (
                <span className="description-cursor">|</span>
              )}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;