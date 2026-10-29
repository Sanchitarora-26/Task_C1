
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase.js';

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(credential.user, {
        displayName: fullName
      });

      await setDoc(doc(db, 'users', credential.user.uid), {
        fullName,
        email,
        dateOfBirth
      });

      navigate('/login');
    } catch (err) {
      setError(err.message || 'Unable to create account.');
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
          max-width: 470px;
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
          line-height: 1.3;
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
          gap: 9px;
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
          background: #fff;
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
          overflow-wrap: anywhere;
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

        .account-switch a:hover {
          text-decoration: underline;
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
          <h1>Create an Account</h1>
          <p className="account-subtitle">
            Join DEV@Deakin and share your ideas.
          </p>

          <form className="account-form" onSubmit={handleRegister}>
            <label htmlFor="fullName">Full name *</label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
              required
            />

            <label htmlFor="registerEmail">Email address *</label>
            <input
              id="registerEmail"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />

            <label htmlFor="dateOfBirth">Date of birth *</label>
            <input
              id="dateOfBirth"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              autoComplete="bday"
              required
            />

            <label htmlFor="registerPassword">Password *</label>
            <input
              id="registerPassword"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />

            <label htmlFor="confirmPassword">Confirm password *</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
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
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="account-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </section>
      </main>
    </>
  );
}

export default Register;
