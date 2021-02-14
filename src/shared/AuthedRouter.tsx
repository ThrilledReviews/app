import firebase from 'firebase/app';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDocumentData, useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { OnboardingPage, HomePage } from '../pages';
import { analyticsRoute, homeRoute, indexRoute, settingsRoute } from '../constants/routes';
import { SettingsPage } from '../pages/Settings';
import { AnalyticsPage } from '../pages/Analytics';
import { PricingPage } from '../pages/Pricing';

declare global {
  interface Window {
    HelpCrunch: any;
  }
}

export const AuthedRouter = () => {
  const [user, userLoading] = useAuthState(firebase.auth());
  const [userDoc, userDocLoading] = useDocumentData(
    firebase.firestore().collection('users').doc(user?.uid)
  );

  const [subscriptionData, subscriptionLoading] = useCollectionData(
    firebase
      .firestore()
      .collection('users')
      .doc(user?.uid)
      .collection('subscriptions')
      .where('status', 'in', ['trialing', 'active'])
  );

  if (userLoading || userDocLoading || subscriptionLoading) return null;
  if (!userDoc) return <OnboardingPage />;

  if (subscriptionData?.length === 0) return <PricingPage />;

  return (
    <Switch>
      <Route path={homeRoute} component={HomePage} />
      <Route path={analyticsRoute} component={AnalyticsPage} />
      <Route path={settingsRoute} component={SettingsPage} />
      <Route path={analyticsRoute} component={() => <div />} />
      <Route path={indexRoute} component={() => <Redirect to={homeRoute} />} />
    </Switch>
  );
};
