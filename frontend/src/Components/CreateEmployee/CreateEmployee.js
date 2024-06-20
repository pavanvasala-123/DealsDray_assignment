import React, { useState } from 'react';
import './CreateEmployee.css';
import { submitFormData } from '../../customHooks.js/UseSubmit';
import { useSelector } from 'react-redux';





// import axios from "axios";

function CreateEmployee() {
  
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    gender: '',
    designation: '',
    course: [],
    img: null,
  });

  const showEdit = useSelector((store)=>store.edit.isEdit)

  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        course: checked
          ? [...prevData.course, value]
          : prevData.course.filter((course) => course !== value),
      }));
    } else if (type === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        img: e.target.files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(formData)
    try {
      const result = await submitFormData(formData);
      console.log('Form submitted successfully:', result);
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  };

  return (
    <div classname="form-container">
      <h1>{showEdit ? "Edit Employee":"Create Employee"}</h1>
      <form onSubmit={handleSubmit}>
        <label>name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>mobile:</label>
        <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required />

        <label>gender:</label>
        <div classname="radio-group">
          <label>
            <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} required />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} required />
            Female
          </label>
          <label>
            <input type="radio" name="gender" value="other" checked={formData.gender === 'other'} onChange={handleChange} required />
            Other
          </label>
        </div>

        <label>designation:</label>
        <select name="designation" value={formData.designation} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Manager">Manager</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Analyst">Analyst</option>
        </select>

        <label>courses:</label>
        <div classname="checkbox-group">
          <label>
            <input type="checkbox" name="course" value="React" checked={formData.course.includes('React')} onChange={handleChange} />
            React
          </label>
          <label>
            <input type="checkbox" name="course" value="Angular" checked={formData.course.includes('Angular')} onChange={handleChange} />
            Angular
          </label>
          <label>
            <input type="checkbox" name="course" value="Vue" checked={formData.course.includes('Vue')} onChange={handleChange} />
            Vue
          </label>
        </div>

        <label>Upload Image:</label>
        <input type="file" name="img" accept=".jpg,.png" onChange={handleChange} required />

        <button type="submit">{showEdit?"Update":"Submit"}</button>
      </form>
    </div>
  );
}

export default CreateEmployee;

