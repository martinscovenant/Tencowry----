import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Signup = () => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ============= Error Msg Start here =================
  const [errFirst_name, setErrFirst_name] = useState("");
  const [errLast_name, setErrLast_name] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errPassword, setErrPassword] = useState("");

  const handleFirst_name = (e) => {
    setFirst_name(e.target.value);
    setErrFirst_name("");
  };
  const handleLast_name = (e) => {
    setLast_name(e.target.value);
    setErrLast_name("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
    setErrPhone("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!first_name) {
      setErrFirst_name("Enter your first name");
      isValid = false;
    }

    if (!last_name) {
      setErrLast_name("Enter your last name");
      isValid = false;
    }

    if (!email) {
      setErrEmail("Enter your email");
      isValid = false;
    } else if (!EmailValidation(email)) {
      setErrEmail("Enter a valid email");
      isValid = false;
    }

    if (!phone) {
      setErrPhone("Enter your phone number");
      isValid = false;
    }

    if (!password) {
      setErrPassword("Create a password");
      isValid = false;
    } else if (password.length < 6) {
      setErrPassword("Passwords must be at least 6 characters");
      isValid = false;
    }

    if (isValid && checked) {
      setLoading(true);
      try {
        const headers = {
          'Content-Type': 'application/json',
          'x-access-token': process.env.REACT_APP_ACCESS_TOKEN,
        };

        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/v1/ecommerce/signup/customer`,
          {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
              first_name,
              last_name,
              phone,
              email,
              password,
            }),
          }
        );

        const result = await response.json();

        if (response.ok) {
          setSuccessMsg(result.message);
          setLoading(false);
          setTimeout(() => {
            navigate('/signin');
          }, 3000);
        } else {
          setMessage('Registration failed');
          setLoading(false);
        }
      } catch (error) {
        setMessage('An error occurred during registration');
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        className="w-full max-w-[500px] bg-white p-8 rounded-lg shadow-lg flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <div className="px-6 py-4 w-full flex flex-col justify-start">
          <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
            Create your account
          </h1>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-0.5">
              <p className="font-titleFont text-base font-semibold text-gray-600">
                First Name
              </p>
              <input
                onChange={handleFirst_name}
                value={first_name}
                className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                type="text"
                placeholder="eg. Martins John"
              />
              {errFirst_name && (
                <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                  <span className="font-bold italic mr-1">!</span>
                  {errFirst_name}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="font-titleFont text-base font-semibold text-gray-600">
                Last Name
              </p>
              <input
                onChange={handleLast_name}
                value={last_name}
                className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                type="text"
                placeholder="eg. Martins John"
              />
              {errLast_name && (
                <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                  <span className="font-bold italic mr-1">!</span>
                  {errLast_name}
                </p>
              )}
            </div>
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
                Phone Number
              </p>
              <input
                onChange={handlePhone}
                value={phone}
                className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                type="text"
                placeholder="081-555-22-444"
              />
              {errPhone && (
                <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                  <span className="font-bold italic mr-1">!</span>
                  {errPhone}
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
                placeholder="Create password"
              />
              {errPassword && (
                <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                  <span className="font-bold italic mr-1">!</span>
                  {errPassword}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-start mdl:items-center gap-2 mt-4">
            <input
              onChange={() => setChecked(!checked)}
              className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer"
              type="checkbox"
            />
            <p className="text-sm text-primeColor">
              I agree to the Tencowry{" "}
              <span className="text-blue-500">Terms of Service </span>and{" "}
              <span className="text-blue-500">Privacy Policy</span>.
            </p>
          </div>
          <button
            type="submit"
            disabled={!checked || loading}
            className={`mt-4 ${
              checked
                ? "bg-primeColor hover:bg-black hover:text-white cursor-pointer"
                : "bg-gray-500 cursor-not-allowed"
            } w-full text-gray-200 text-base font-medium h-10 rounded-md duration-300`}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          <p className="text-sm text-center font-titleFont font-medium mt-4">
            Don't have an Account?{" "}
            <Link to="/signin">
              <span className="hover:text-blue-600 duration-300">
                Sign in
              </span>
            </Link>
          </p>
          {message && (
            <p className="text-red-500 text-sm mt-2 font-titleFont">{message}</p>
          )}
          {successMsg && (
            <p className="text-green-500 text-sm mt-2 font-titleFont">{successMsg}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Signup;