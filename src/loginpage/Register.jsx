import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/UserSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const validationSchema = Yup.object({
    username: Yup.string()
      .min(4, 'Username must be at least 4 characters')
      .max(15, 'Username cannot be more than 15 characters')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(4, 'Password must be at least 4 characters long')
      .max(8, 'Password cannot be more than 8 characters')
      .required('Password is required'),
    role: Yup.string()
      .required('Role is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      role: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError, setStatus }) => {
      setSubmitting(true);
      try {
        await dispatch(registerUser(values)).unwrap();
        setStatus('Registration successful. Please login.');
        navigate('/login');
      } catch (err) {
       
        const errorMessage = err?.message || err?.msg || "An unexpected error occurred";
    
        if (errorMessage.includes('User already exists')) {
          setFieldError('email', 'This email is already registered. Please login.');
        } else if (err.errors && err.errors.email) {
          setFieldError('email', err.errors.email);
        } else {
          setStatus('Registration failed. Please try again.');
        }
        setSubmitting(false);
      }
    }
    


  });



  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="input-box">
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? <div className="error">{formik.errors.username}</div> : null}

      </div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
      </div>
      <div className="input-box">
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
      </div>
      <div className="select">
        <select
          name="role"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.role}
          style={{ backgroundColor: 'rgb(32, 162, 162)', color: '#fff', padding: '5px', borderRadius: '10px' }}
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="sales">Sales Representative</option>
          <option value="customer_service">Customer Service Representative</option>
        </select>
        {formik.touched.role && formik.errors.role ? <div className="error">{formik.errors.role}</div> : null}
      </div>
      <div className="btn-btn mt-2">
        <button type="submit" style={{ backgroundColor: 'rgb(32, 162, 162)', color: '#fff', padding: '5px', borderRadius: '10px' }}>Register</button>
      </div>
      {formik.status && <div className="feedback" style={{ color: 'blue' }}>{formik.status}</div>}

    </form>
  );
};

export default Register;
