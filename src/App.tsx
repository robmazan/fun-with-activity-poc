import Auth, { CognitoUser } from "@aws-amplify/auth";
import { withAuthenticator } from "@aws-amplify/ui-react";
import React, { useCallback, useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import "./App.css";
import { ProfileForm } from "./profile";
import { Recommendations } from "./recommendations";
import {
  Logo,
  NavBar,
  NavButton,
  NavLink,
  NavSection,
  Page,
  PageContent,
  PageHeader
} from "./ui";

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
            <NavLink>
              <Link to="/">
                <Logo />
              </Link>
            </NavLink>
          </NavSection>
          <NavSection>
            Hello <Link to="/profile">{user?.getUsername()}</Link>!
            <NavButton onClick={handleLogout}>(Logout)</NavButton>
          </NavSection>
        </NavBar>
      </PageHeader>
      <PageContent>
        <Route path="/" exact>
          <Recommendations />
        </Route>
        <Route path="/profile">
          <ProfileForm />
        </Route>
      </PageContent>
    </Page>
  );
}

export default withAuthenticator(App);
