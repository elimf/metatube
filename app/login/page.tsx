import React from 'react';
import Image from 'next/image';
import './login.css';

const Login = () => {
  return (
    <>
      <div className="container">
        <div className="top-content">
          <Image src="/metatube.png" alt="" width="100" height="100" />
          <h2>Sign in</h2>
          <p className="heading">Use your Google Account</p>
        </div>
        <div className="inputs">
          <input type="email" name="" id="email" className="input" />
          <label htmlFor="email" className="input-label">Email or phone</label>
        </div>
        <a href="" className="link-btn">Forgot Email?</a>
        <p className="color">Not your computer? Use Guest mode to sign in privately.</p>
        <a href="" className="link-btn">Learn More</a>
        <div className="btn-group">
          <button className="create-btn">Create account</button>
          <button className="next-btn">Next</button>
        </div>
      </div>
    </>
  );
}

export default Login;
