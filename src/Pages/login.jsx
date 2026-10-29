
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.js';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError('Login failed. Check your email and password.');
    } finally {
      setLoading(false);
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

        .account-button:hover {
          background: #1b5a48;
          transform: translateY(-1px);
        }

        .account-button:disabled {
          opacity: 0.65;
          cursor: wait;
        }

        .account-error {
          padding: 11px;
          margin-top: 8px;
          border-radius: 8px;
          background: #fff0f0;
          color: #a32020;
          font-size: 14px;
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

            {error && (
              <div className="account-error" role="alert">
                {error}
              </div>
            )}

            <button
              className="account-button"
              type="submit"
              disabled={loading}
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
