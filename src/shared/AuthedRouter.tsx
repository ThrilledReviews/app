import firebase from 'firebase';
import { Route } from 'react-router-dom';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { OnboardingPage } from '../pages';
import { homeRoute } from '../constants/routes';

export const AuthedRouter = ({ uid }: { uid: string }) => {
  const [userDoc] = useDocumentData(firebase.firestore().collection('users').doc(uid));

  if (!userDoc) return <OnboardingPage />;

  return (
    <>
      <Route path={homeRoute} />
    </>
  );
};
