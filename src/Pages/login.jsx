
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../firebase.js';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!auth) {
      setError('Firebase is not configured. Please check your settings.');
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      setSuccess('Logged in successfully! Redirecting to homepage...');

      window.setTimeout(() => {
        navigate('/', { replace: true });
      }, 1500);
    } catch (err) {
      
  console.error("Firebase login error:", err.code, err.message);
  setError(`${err.code}: ${err.message}`);
} finally {
  setLoading(false);
}
      console.error('Login error:', err.code, err.message);

      if (
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/user-not-found'
      ) {
        setError('Incorrect email or password. Please try again.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many attempts. Please try again later.');
      } else {
        setError(err.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    setError('');
    setSuccess('');

    if (!auth) {
      setError('Firebase is not configured.');
      return;
    }

    if (!email.trim()) {
      setError('Enter your registered email address first.');
      return;
    }

    setResetLoading(true);

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setSuccess('Password reset email sent. Check your inbox and spam folder.');
    } catch (err) {
      console.error('Password reset error:', err.code, err.message);
      setError('Could not send reset email. Check the email and try again.');
    } finally {
      setResetLoading(false);
    }
  }

  return (
    <>
      <style>{`
        .account-page {
          min-height: 80vh;
          padding: 45px 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f3f7f4;
          box-sizing: border-box;
        }

        .account-card {
          width: 100%;
          max-width: 450px;
          padding: 36px;
          background: #fff;
          border: 1px solid #dfe8e2;
          border-radius: 20px;
          box-shadow: 0 10px 32px rgba(20, 55, 42, 0.09);
          box-sizing: border-box;
        }

        .account-card h1 {
          margin: 0 0 10px;
          text-align: center;
          color: #123d32;
          font-size: 29px;
        }

        .account-subtitle {
          margin: 0 0 26px;
          color: #68756f;
          text-align: center;
          font-size: 15px;
          line-height: 1.5;
        }

        .account-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .account-form label {
          margin-top: 7px;
          color: #263b32;
          font-size: 14px;
          font-weight: 600;
        }

        .account-form input {
          width: 100%;
          min-height: 46px;
          padding: 12px 14px;
          border: 1px solid #cbd8d0;
          border-radius: 8px;
          background: white;
          font-size: 15px;
          box-sizing: border-box;
        }

        .account-form input:focus {
          outline: 2px solid #267a59;
          border-color: #267a59;
        }

        .account-button {
          width: 100%;
          min-height: 48px;
          margin-top: 17px;
          padding: 12px;
          border: none;
          border-radius: 25px;
          background: #103e33;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }

        .account-button:hover:not(:disabled) {
          background: #1b5a48;
          transform: translateY(-1px);
        }

        .account-button:disabled {
          opacity: 0.65;
          cursor: wait;
        }

        .account-error,
        .account-success {
          padding: 11px;
          margin-top: 8px;
          border-radius: 8px;
          font-size: 14px;
          line-height: 1.5;
        }

        .account-error {
          background: #fff0f0;
          color: #a32020;
        }

        .account-success {
          background: #e8f7ed;
          color: #176348;
        }

        .forgot-password {
          align-self: flex-end;
          padding: 2px 0;
          border: none;
          background: transparent;
          color: #176348;
          font-size: 14px;
          cursor: pointer;
          text-decoration: underline;
        }

        .account-switch {
          margin: 23px 0 0;
          text-align: center;
          color: #68756f;
          font-size: 14px;
        }

        .account-switch a {
          color: #176348;
          font-weight: 600;
          text-decoration: none;
        }

        @media (max-width: 500px) {
          .account-page {
            padding: 25px 14px;
          }

          .account-card {
            padding: 25px 20px;
          }

          .account-card h1 {
            font-size: 25px;
          }
        }
      `}</style>

      <main className="account-page">
        <section className="account-card">
          <h1>Welcome Back</h1>

          <p className="account-subtitle">
            Log in to your DEV@Deakin account.
          </p>

          <form className="account-form" onSubmit={handleLogin}>
            <label htmlFor="loginEmail">Email address *</label>
            <input
              id="loginEmail"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />

            <label htmlFor="loginPassword">Password *</label>
            <input
              id="loginPassword"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />

            <button
              className="forgot-password"
              type="button"
              onClick={handleForgotPassword}
              disabled={resetLoading || loading}
            >
              {resetLoading ? 'Sending email...' : 'Forgot Password?'}
            </button>

            {error && (
              <div className="account-error" role="alert">
                {error}
              </div>
            )}

            {success && (
              <div className="account-success" role="status">
                {success}
              </div>
            )}

            <button
              className="account-button"
              type="submit"
              disabled={loading || resetLoading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <p className="account-switch">
            Don't have an account? <Link to="/register">Create account</Link>
          </p>
        </section>
      </main>
    </>
  );
}

export default Login;
