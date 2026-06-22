// RegisterPage simply renders the auth page with the register tab active.
// The tab state is managed inside LoginPage itself — this page sets it via useEffect.

import { useEffect } from 'react';
import LoginPage from './LoginPage';

// We export RegisterPage as an alias that forces the register tab.
// Since LoginPage manages its own tab state, we pass a query param
// and have LoginPage read it on mount.
export default function RegisterPage() {
  useEffect(() => {
    // Signal LoginPage to open on the register tab by setting a sessionStorage flag
    sessionStorage.setItem('auth-tab', 'register');
  }, []);

  return <LoginPage />;
}
