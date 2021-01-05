import firebase from 'firebase';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { OnboardingPage, HomePage } from '../pages';
import { homeRoute, indexRoute } from '../constants/routes';

export const AuthedRouter = ({ uid }: { uid: string }) => {
  const [userDoc, loading] = useDocumentData(firebase.firestore().collection('users').doc(uid));

  if (loading) return null;

  if (!userDoc) return <OnboardingPage />;

  return (
    <Switch>
      <Route path={homeRoute} component={HomePage} />
      <Route path={indexRoute} component={() => <Redirect to={homeRoute} />} />
    </Switch>
  );
};
