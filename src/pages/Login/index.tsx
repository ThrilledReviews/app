import firebase from 'firebase/app';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPasswordRoute, registerRoute } from '../../constants/routes';
import loginPicture from '../../images/stars.jpg';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error: firebase.auth.Error) => {
        if (error.code === 'auth/invalid-email') {
          setError('Email Not Recognized');
        } else {
          setError(error.message);
        }
      });
  };
  return (
    <div className='min-h-screen bg-white flex'>
      <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <div>
            <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
              Log In To Your Thrilled Reviews Account
            </h2>
            <p className='mt-2 text-sm text-gray-600 max-w'>
              Or{' '}
              <Link to={registerRoute} className='font-medium text-blue-600 hover:text-blue-500'>
                Start Your Trial {'>'}
              </Link>
            </p>
          </div>

          <div className='mt-5'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                  Email address
                </label>
                <div className='mt-1'>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                  />
                </div>
              </div>

              <div className='space-y-1'>
                <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                  Password
                </label>
                <div className='mt-1'>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                  />
                </div>
              </div>

              <div className='flex items-center justify-end'>
                <div className='text-sm'>
                  <Link
                    to={forgotPasswordRoute}
                    className='font-medium text-blue-600 hover:text-blue-500'
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                >
                  Log In
                </button>
              </div>
              <p className='mt-1 text-center text-sm text-gray-500'>
                By Logging In, You're Agreeing To Our{' '}
                <a
                  href='https://app.termly.io/document/terms-and-conditions/08ceafcc-cca8-4c63-8783-7abed61b4124'
                  className='text-blue-500'
                >
                  Terms of Service
                </a>{' '}
                &{' '}
                <a
                  href='https://app.termly.io/document/privacy-policy/47c13b8d-3eb6-4cb0-836a-79f86cd9934b'
                  className='text-blue-500'
                >
                  Privacy Policy
                </a>
              </p>
              <p className='text-center text-red-500'>{error}</p>
            </form>
          </div>
        </div>
      </div>
      <div className='hidden lg:block relative w-0 flex-1'>
        <img
          className='absolute inset-0 h-full w-full object-cover'
          src={loginPicture}
          alt='Worker Smiling'
        />
      </div>
    </div>
  );
};
