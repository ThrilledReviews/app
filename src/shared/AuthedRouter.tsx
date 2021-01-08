import firebase from 'firebase/app';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { OnboardingPage, HomePage } from '../pages';
import { analyticsRoute, homeRoute, indexRoute, settingsRoute } from '../constants/routes';
import { SettingsPage } from '../pages/Settings';

export const AuthedRouter = ({ uid }: { uid: string }) => {
  const [user, userLoading] = useAuthState(firebase.auth());
  const [userDoc, loading] = useDocumentData(
    firebase.firestore().collection('users').doc(user.uid)
  );

  if (loading || userLoading) return null;

  if (!userDoc) return <OnboardingPage />;

  return (
    <Switch>
      <Route path={homeRoute} component={HomePage} />
      <Route path={settingsRoute} component={SettingsPage} />
      <Route path={analyticsRoute} component={() => <div />} />
      <Route path={indexRoute} component={() => <Redirect to={homeRoute} />} />
    </Switch>
  );
};
