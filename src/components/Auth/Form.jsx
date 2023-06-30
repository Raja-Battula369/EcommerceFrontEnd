// import React from 'react';
import { useState } from 'react';
import './Auth.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from './LoginForm';

const Auth = () => {
  const [page, setPage] = useState('login');

  const form = useForm({
    defaultValues: { name: '', email: '', password: '', passwordConfirm: '' },
  });

  const { register, handleSubmit, formState, watch } = form;
  const { errors } = formState;

  const onSubmitRegister = async (data) => {
    try {
      await axios.post('https://backend1-ryci.onrender.com/api/signup', data);
      <ToastContainer position="top-center" />;
      setPage('login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      {page === 'register' ? (
        <form
          className="form"
          key={'form1'}
          onSubmit={handleSubmit(onSubmitRegister)}
        >
          <strong>Signup Page</strong>

          <div className="form_control">
            <label htmlFor="nameid">Name</label>
            <input
              id="nameid"
              type="text"
              title="Name"
              maxLength={30}
              placeholder="Enter Your Name"
              {...register('name', {
                pattern: {
                  value: /^[a-zA-Z]+$/,
                  message: 'please enter valid name',
                },
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
              maxLength={23}
              {...register('password', {
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).+$/,
                  message:
                    'please enter atleast one alpha and one symbol and one number',
                },
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
              maxLength={23}
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
            <button title="button">Signup</button>
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
        <LoginForm setPage={setPage} />
      )}
    </div>
  );
};

export default Auth;
