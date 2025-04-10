'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import "./siginin.css";

const SignIn = () => {
  const [signUpData, setSignUpData] = useState({ name: '', email: '', password: '' });
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("userLogin"));
    if (loginData && Date.now() - loginData.timestamp < 24 * 60 * 60 * 1000) {
      router.push('/dashboard');
    }
  
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');
  
    const handleRegister = () => container?.classList.add("active");
    const handleLogin = () => container?.classList.remove("active");
  
    registerBtn?.addEventListener("click", handleRegister);
    loginBtn?.addEventListener("click", handleLogin);
  
    return () => {
      registerBtn?.removeEventListener("click", handleRegister);
      loginBtn?.removeEventListener("click", handleLogin);
    };
  }, []);
  

  const handleSignUp = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify(signUpData),
    });

    if (res.ok) {
      alert("Signup successful!");
      setSignUpData({ name: '', email: '', password: '' });
    } else {
      const { error } = await res.json();
      alert(error);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/signin', {
      method: 'POST',
      body: JSON.stringify(signInData),
    });

    if (res.ok) {
      // Save login session for 24 hrs
      localStorage.setItem("userLogin", JSON.stringify({ timestamp: Date.now(), email: signInData.email }));
      setSignInData({ email: '', password: '' });
      router.push('/dashboard');
    } else {
      const { error } = await res.json();
      alert(error);
    }
  };

  return (
    <div className="wrapper">
      <div className="container" id="container">
        {/* Sign Up Form */}
        <div className="form-container sign-up">
          <form onSubmit={handleSignUp}>
            <img src='/logo.svg' alt="Logo" className="logo" />
            <h1>Create Account</h1>
            <input type="text" placeholder="Name" value={signUpData.name} onChange={e => setSignUpData({ ...signUpData, name: e.target.value })} />
            <input type="email" placeholder="Email" value={signUpData.email} onChange={e => setSignUpData({ ...signUpData, email: e.target.value })} />
            <input type="password" placeholder="Password" value={signUpData.password} onChange={e => setSignUpData({ ...signUpData, password: e.target.value })} />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in">
          <form onSubmit={handleSignIn}>
            <img src='/Logo.svg' alt="Logo" className="logo" />
            <h1>Sign In</h1>
            <input type="email" placeholder="Email" value={signInData.email} onChange={e => setSignInData({ ...signInData, email: e.target.value })} />
            <input type="password" placeholder="Password" value={signInData.password} onChange={e => setSignInData({ ...signInData, password: e.target.value })} />
            <a href="#">Forgot your password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>

        {/* Toggle Panels */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Sign in with your details to access all features.</p>
              <button className="hidden1" id="login">Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>New here?</h1>
              <p>Sign up now with your details to unlock all features!</p>
              <button className="hidden1" id="register">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
