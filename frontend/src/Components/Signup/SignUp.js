import React, { useState } from 'react';
import './SignUp.css'; // Import CSS file for styling
import axios from 'axios';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneno: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const url = "http://localhost:3000/users/signup"

    try{
      const submitData = await axios.post(url , formData)
      console.log(submitData.data.response)

    }catch(error){
      console.log(error.response.data.error)
    } 
  };

  return (
    <div className="signup-form-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="phoneno">Phone Number</label>
          <input
            type="tel"
            id="phoneno"
            placeholder="Phone Number"
            name="phoneno"
            value={formData.phoneno}
            onChange={handleChange}
            
          />
        </div> */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
