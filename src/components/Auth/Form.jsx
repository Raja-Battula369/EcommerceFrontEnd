// import React from 'react';
import { useState } from 'react';
import './Auth.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToken, addUserName } from '../../redux/features';

const Auth = () => {
  const [page, setPage] = useState('login');
  const signupToast = () => toast('form is submitted');
  const loginToast = () => toast('Home');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: { name: '', email: '', password: '', passwordConfirm: '' },
  });

  const { register, handleSubmit, formState, watch } = form;
  const { errors } = formState;

  const onSubmitRegister = async (data) => {
    try {
      await axios.post('http://127.0.0.1:8001/api/signup', data);
      <ToastContainer position="top-center" />;
      setPage('login');
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmitLogin = async (data) => {
    try {
      const { data: res } = await axios.post(
        'http://127.0.0.1:8001/api/login',
        data
      );
      // dispatch(addUserName)
      dispatch(addUserName(res.data.name));
      dispatch(addToken(res.token));
      <ToastContainer position="top-center" />;
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="main">
      {page === 'register' ? (
        <form className="form" onSubmit={handleSubmit(onSubmitRegister)}>
          <strong>Signup Page</strong>

          <div className="form_control">
            <label htmlFor="nameid">Name</label>
            <input
              id="nameid"
              type="text"
              title="Name"
              placeholder="Enter Your Name"
              {...register('name', {
                required: {
                  value: true,
                  message: 'name is required',
                },
              })}
            />
            <p style={{ color: 'red' }}>{errors.name?.message}</p>
          </div>

          <div className="form_control">
            <label htmlFor="emailid">Email</label>
            <input
              id="emailid"
              type="email"
              placeholder="Enter Your email"
              title="email"
              {...register('email', {
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Invalid email format',
                },

                validate: {
                  emailcheck: (fieldValue) => {
                    return fieldValue.endsWith('gmail.com') || 'Invalid email';
                  },
                },
              })}
            />
            <p style={{ color: 'red' }}>{errors.email?.message}</p>
          </div>

          <div className="form_control">
            <label htmlFor="passwordid">Password</label>
            <input
              id="passwordid"
              type="password"
              placeholder="Enter Your Password"
              title="Password"
              {...register('password', {
                required: {
                  value: true,
                  message: 'password is required',
                },
              })}
            />
            <p style={{ color: 'red' }}>{errors.password?.message}</p>
          </div>

          <div className="form_control">
            <label htmlFor="passwordConfirmid">PasswordConfirm</label>
            <input
              id="passwordConfirmid"
              type="password"
              placeholder="reEnter Your Password"
              title="passwordConfirm"
              {...register('passwordConfirm', {
                validate: (fieldValue) => {
                  return (
                    fieldValue === watch('password') ||
                    'please enter correct Password'
                  );
                },
              })}
            />
            <p style={{ color: 'red' }}>{errors.passwordConfirm?.message}</p>
          </div>

          <div className="btn">
            <button onClick={signupToast} title="button">
              Signup
            </button>
          </div>
          <b
            onClick={() => setPage('login')}
            style={{
              textDecoration: 'underline',
              padding: '0.5rem',
              color: 'blue',
              fontSize: '20px',
              cursor: 'pointer',
            }}
          >
            Login
          </b>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onSubmitLogin)} className="form">
          <strong> Login Page</strong>

          <div className="form_control">
            <label htmlFor="emailid">Email</label>
            <input
              id="emailid"
              type="email"
              placeholder="Enter Your email"
              title="email"
              {...register('email', {
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Invalid email format',
                },

                validate: {
                  emailcheck: (fieldValue) => {
                    return fieldValue.endsWith('gmail.com') || 'Invalid email';
                  },
                },
              })}
            />
            <p style={{ color: 'red' }}>{errors.email?.message}</p>
          </div>

          <div className="form_control">
            <label htmlFor="passwordid">Password</label>
            <input
              id="passwordid"
              type="password"
              placeholder="Enter Your Password"
              title="Password"
              {...register('password', {
                required: {
                  value: true,
                  message: 'password is required',
                },
              })}
            />
            <p style={{ color: 'red' }}>{errors.password?.message}</p>
          </div>

          <div className="btn">
            <button onClick={loginToast} title="button">
              Login
            </button>
          </div>

          <b
            onClick={() => setPage('register')}
            style={{
              textDecoration: 'underline',
              padding: '0.5rem',
              color: 'blue',
              fontSize: '20px',
              cursor: 'pointer',
            }}
          >
            SignUp
          </b>
        </form>
      )}

      <Outlet />
    </div>
  );
};

export default Auth;
