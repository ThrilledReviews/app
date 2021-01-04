import firebase from 'firebase/app';
import { BrowserRouter, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { RegistrationPage } from './pages';

export const App = () => {
  const [user, loading, error]: [
    firebase.User | undefined,
    boolean,
    firebase.auth.Error | undefined
  ] = useAuthState(firebase.auth());

  // Loading Case
  if (loading) return null;
  // Error Case
  if (error)
    return (
      <main className='w-screen h-screen flex justify-center items-center'>
        <h2 className='p-10 rounded text-4xl text-white bg-blue-600'>{error?.message}</h2>
      </main>
    );

  if (user) {
    return <BrowserRouter></BrowserRouter>;
  }

  // Un-Authed (Sign Up + Sign In + Reset Password) Case
  return (
    <BrowserRouter>
      <Route path='/register' component={RegistrationPage} />
    </BrowserRouter>
  );
};
