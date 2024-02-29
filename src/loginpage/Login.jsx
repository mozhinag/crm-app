import React, { useState, useEffect } from 'react';
import './login.css';
import '../assets/outer-space-background.jpg';
import Register from './Register';
import { FaUser, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/UserSlice'; // Update the import path as necessary
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isSuccess, userInfo, isError, message } = useSelector(state => state.user); 

    useEffect(() => {
        console.log(userInfo); 
        if (isSuccess && userInfo && userInfo.role) {
            switch (userInfo.role) {
                case 'admin':
                    navigate('/admindash/chart');
                    break;
                case 'customer_service':
                    navigate('/custdash/chart');
                    break;
                case 'manager':
                    navigate('/managerdash/chart');
                    break;
                case 'sales':
                    navigate('/saledash/chart');
                    break;
                default:
                    navigate('/login');
            }
        }
    }, [isSuccess, userInfo, navigate]);

 
    const validationSchema = Yup.object({
        email: Yup.string()
        .email('Incorrect Username and Password')
        .required('Email is required'),
        password: Yup.string()
        .min(4, 'Password must be at least 4 characters long')
        .max(8,'Password cannot be more than 8 characters')
        .required('Password is required'),
    });

   
    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema,
        onSubmit: values => {
            
            dispatch(loginUser(values)); 
        },
    });

    return (
        <><h2 style={{fontFamily: "Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif", color: 'pink', textAlign: 'center', marginTop: '60px'}}>WELCOME TO OUR VM PRODUCTS CRM</h2>


        <div className='container' style={{ width: '500px' }}>
            <form onSubmit={formik.handleSubmit}>
                <h2>Login</h2>
                {isError && (
                    <div className="error text-danger" style={{ fontWeight: 'bold' }}>
                        {message || 'Incorrect Username and Password'}
                    </div>
                )}


                <div className='input-box'>
                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        {...formik.getFieldProps('email')}
                    />
                    <FaUser className='icon' />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="error">{formik.errors.email}</div>
                    ) : null}
                </div>

                <div className='input-box'>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        {...formik.getFieldProps('password')}
                    />
                    <FaLock className='icon' />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="error">{formik.errors.password}</div>
                    ) : null}
                </div>

                <div className="remember">  <label><input type="checkbox" /> Remember me</label></div>
                <div className='btn' style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <button type="submit">Login</button>
                </div>

                <div className="register-link" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p>Don't have an account? </p>
                    <button type="button" onClick={() => setShowModal(true)}>SignUp</button>
                </div>
            </form>

            {/* Modal for Register */}
            {showModal && (
                <div className="modal" style={{ display: "block", backgroundImage: "url('../assets/outer-space-background.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content" style={{ background: 'rgb(5, 111, 111)' }}>
                            <div className="modal-header">
                                <h5 className="modal-title" style={{ color: '#fff' }}>Register</h5>
                                <button type="button" className="close" style={{ background: '#fff', color: 'blue', fontSize: '25px', borderRadius: '6px' }} onClick={() => setShowModal(false)}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <Register />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

export default Login;
