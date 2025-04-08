'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import "./siginin.css";



const SignIn = () => {
  const [signUpData, setSignUpData] = useState({ name: '', email: '', password: '' });
  const [signInData, setSignInData] = useState({ email: '', password: '' });

  useEffect(() => {
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
      setSignUpData({ name: '', email: '', password: '' }); // clear fields
    } else {
      const { error } = await res.json();
      alert(error);
    }
  };

  const router = useRouter();

const handleSignIn = async (e) => {
  e.preventDefault();
  const res = await fetch('/api/signin', {
    method: 'POST',
    body: JSON.stringify(signInData),
  });

  if (res.ok) {
    alert("Signin successful!");
    setSignInData({ email: '', password: '' });
    router.push('/dashboard'); // 👈 Redirects here
  } else {
    const { error } = await res.json();
    alert(error);
  }
};


  return (
    <div className="container" id="container">
      <div className="form-container sign-up">
        <form onSubmit={handleSignUp}>
          <img src='/Group 7.svg' alt="Logo" className="logo" />
          <h1>Create Account</h1>
          <input type="text" placeholder="Name" value={signUpData.name} onChange={e => setSignUpData({ ...signUpData, name: e.target.value })} />
          <input type="email" placeholder="Email" value={signUpData.email} onChange={e => setSignUpData({ ...signUpData, email: e.target.value })} />
          <input type="password" placeholder="Password" value={signUpData.password} onChange={e => setSignUpData({ ...signUpData, password: e.target.value })} />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form onSubmit={handleSignIn}>
          <img src='/Group 7.svg' alt="Logo" className="logo" />
          <h1>Sign In</h1>
          <input type="email" placeholder="Email" value={signInData.email} onChange={e => setSignInData({ ...signInData, email: e.target.value })} />
          <input type="password" placeholder="Password" value={signInData.password} onChange={e => setSignInData({ ...signInData, password: e.target.value })} />
          <a href="#">Forgot your password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

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
  );
};

export default SignIn;
