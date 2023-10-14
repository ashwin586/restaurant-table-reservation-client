import React from 'react'
import Axios from '../../../services/axios';
import { Formik, Field, Form } from 'formik'
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {userLogin} from '../../../redux/slice/userSlice'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginCheck = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email")
            .required("Please provide an email"),
        password: Yup.string()
            .required("Please enter the password")
    })


    return (
        <>
            <div className='flex items-center justify-center h-screen'>
                <div className='flex justify-center rounded-2xl shadow-xl shadow-stone-500'>
                    <div className='m-10'>
                        <img
                            style={{ height: "350px", width: "300px" }}
                            className='rounded-xl'
                            src="/assets/10806958_4572220.jpg" alt="LoginImage" />
                    </div>
                    <div className='mx-5 my-10'>
                        <div className='flex justify-center font-bold text-2xl text-gray-800'>
                            <h1>LOGIN</h1>
                        </div>
                        <Formik initialValues={{
                            email: '',
                            password: ''
                        }}
                            validationSchema={loginCheck}
                            onSubmit={async (values) => {
                                try {
                                    const response = await Axios.post('/login', values)
                                    if (response.status === 200) {
                                        dispatch(userLogin());
                                        navigate('/');
                                    }
                                } catch (err) {
                                    toast.error(err.response.data.message, {
                                        position: 'top-right',
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        theme: "dark",
                                    })
                                }
                            }}
                        >
                            <Form>
                                <div>
                                    <Field type="text" name='email' className='outline-none border-b w-full text-gray-800 my-5 p-2 rounded-md' placeholder='Email' />
                                </div>
                                <div>
                                    <Field type="password" name='password' className='outline-none border-b w-full text-gray-800 mt-5 mb-2 p-2 rounded-md' placeholder='Password' />
                                </div>
                                <button className='text-blue-500 hover:cursor-pointer' onClick={() => navigate('/forgotpassword')}>Forgot Password ?</button>
                                <div className='mt-4 flex justify-evenly'>
                                    <div className='me-4'>
                                        <button className='px-4 py-1 rounded-xl bg-button text-white'>Login</button>
                                    </div>
                                    <div className='ms-4'>
                                        <button type='submit' className='px-2 py-1 rounded-xl bg-button text-white' onClick={() => navigate('/register')}>Sign Up</button>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;