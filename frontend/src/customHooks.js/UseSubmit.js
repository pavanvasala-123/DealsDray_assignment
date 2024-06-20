// src/formSubmitHandler.js

export const submitFormData = async (formData) => {
    const url = 'http://localhost:3000/create-employee';
    const data = new FormData();
  
    // Append form data
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('mobile', formData.mobile);
    data.append('gender', formData.gender);
    data.append('designation', formData.designation);
    formData.course.forEach((course) => data.append('course', course));
    data.append('img', formData.img);
    console.log(formData)
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: data,
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Form submission error:', error);
      throw error;
    }
  };
  