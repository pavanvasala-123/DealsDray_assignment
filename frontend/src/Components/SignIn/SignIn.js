import React, { useState } from 'react';
import './SignIn.css'; // Import CSS file for styling
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate} from 'react-router-dom'
import { login } from '../../Store/Features/user';

const SignInForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
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
    const url = "http://localhost:3000/users/login"
    try{
        const loginResponse = await axios.post(url, formData)
        // console.log(loginResponse.data.token)
        const token  = loginResponse.data.token

        Cookies.set("token" ,token)
        dispatch(login(token)); // Assume the token is in data.token
        navigate('/employee-list');

    }catch(error){
        console.log(error.response.data.error)
    }
  };

  return (
    <div className="signin-form-container">
      <form onSubmit={handleSubmit} className="signin-form">
        <h2>Sign In</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignInForm;
