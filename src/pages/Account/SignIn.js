import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const navigate = useNavigate();

  const baseURL = process.env.REACT_APP_BASE_URL;
  const loginEndpoint = '/api/v1/ecommerce/login/customer';

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!email) {
      setErrEmail("Enter your email");
      isValid = false;
    } else if (!EmailValidation(email)) {
      setErrEmail("Enter a valid email");
      isValid = false;
    }

    if (!password) {
      setErrPassword("Enter your password");
      isValid = false;
    } else if (password.length < 6) {
      setErrPassword("Passwords must be at least 6 characters");
      isValid = false;
    }

    if (isValid) {
      setLoading(true);
      try {
        const response = await fetch(`${baseURL}${loginEndpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': process.env.REACT_APP_ACCESS_TOKEN,
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage(data.message);
          localStorage.setItem('accessToken', data.data.accessToken);
          setTimeout(() => {
            navigate('/');
          }, 3000);
        } else {
          setMessage(data.message || 'Login failed!');
        }
      } catch (error) {
        setMessage('An error occurred during login');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <form className="w-full lgl:w-[450px] bg-white shadow-lg rounded-lg flex items-center justify-center" onSubmit={handleSignin}>
        <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
        {message && <p className="text-center text-green-600 font-titleFont mt-5">{message}</p>}
          <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4 text-center">
            Sign in
          </h1>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-0.5">
              <p className="font-titleFont text-base font-semibold text-gray-600">
                Work Email
              </p>
              <input
                onChange={handleEmail}
                value={email}
                className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                type="email"
                placeholder="martins@gmail.com"
                required
              />
              {errEmail && (
                <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                  <span className="font-bold italic mr-1">!</span>
                  {errEmail}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-0.5">
              <p className="font-titleFont text-base font-semibold text-gray-600">
                Password
              </p>
              <input
                onChange={handlePassword}
                value={password}
                className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                type="password"
                placeholder="Enter password"
                required
              />
              {errPassword && (
                <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                  <span className="font-bold italic mr-1">!</span>
                  {errPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            <p className="text-sm text-center font-titleFont font-medium">
              Don't have an Account?{" "}
              <Link to="/signup">
                <span className="hover:text-blue-600 duration-300">
                  Sign up
                </span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;