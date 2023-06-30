// import React from 'react';

import './Auth.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToken, addUserName } from '../../redux/features';
import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';

const LoginForm = ({ setPage }) => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: { email: '', password: '' },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmitLogin = async (data) => {
    try {
      const { data: res } = await axios.post(
        'https://backend1-ryci.onrender.com/api/login',
        data
      );
      // dispatch(addUserName)
      dispatch(addUserName(res.data.name));
      dispatch(addToken(res.token));

      navigate('/');
    } catch (error) {
      setOpen(true);
      console.log(error);
    }
  };
  return (
    <div
      className="main"
      style={{ width: '100vw', minWidth: '100%', maxWidth: '100%' }}
    >
      <form
        key={'form2'}
        onSubmit={handleSubmit(onSubmitLogin)}
        className="form"
      >
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
            maxLength={23}
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
          <button title="button" style={{ fontWeight: 'bold' }}>
            Login
          </button>
        </div>

        <Snackbar open={open} autoHideDuration={6000}>
          <Alert severity="error" sx={{ width: '100%' }}>
            error occured please enter valid email or valid password
          </Alert>
        </Snackbar>

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
    </div>
  );
};

export default LoginForm;
