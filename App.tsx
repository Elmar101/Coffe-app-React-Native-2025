import "./global.css";
import AppNavigation from './src/navigation/AppNavigation';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://1fd9a7b45957db799a45b032f0801634@o4509782383984640.ingest.us.sentry.io/4509782385033216',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function App() {
 return (
    <AppNavigation />
  );
});