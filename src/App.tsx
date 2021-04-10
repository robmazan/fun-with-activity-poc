import Auth, { CognitoUser } from '@aws-amplify/auth';
import { withAuthenticator } from '@aws-amplify/ui-react';
import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { ProfileForm } from './profile';
import { Logo, NavBar, NavButton, NavSection, Page, PageContent, PageHeader } from './ui';

function App() {
  const [user, setUser] = useState<CognitoUser>();

  useEffect(() => {
    (async () => {
      setUser(await Auth.currentAuthenticatedUser());
    })();
  }, []);

  const handleLogout = useCallback(async () => {
    await Auth.signOut();
    window.location.reload();
  }, []);

  return (
    <Page>
      <PageHeader>
        <NavBar>
          <NavSection>
            <Logo />
          </NavSection>
          <NavSection>
            Hello {user?.getUsername()}!
            <NavButton onClick={handleLogout}>
                (Logout)
            </NavButton>
          </NavSection>
        </NavBar>
      </PageHeader>
      <PageContent>
        <ProfileForm />
      </PageContent>
    </Page>
  );
}

export default withAuthenticator(App);
