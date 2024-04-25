import React from 'react';
import { Redirect, Route, Router, Switch } from 'wouter';
import { navigate, useLocationProperty } from 'wouter/use-location';
import { HomePage } from '../pages/HomePage';
import { Page } from '../pages/Page';

const hashLocation = () => window.location.hash.replace(/^#/, '') || '/';
const hashNavigate = (to: string) => navigate('#' + to);
const useHashLocation = () => {
  const location = useLocationProperty(hashLocation);
  return [location, hashNavigate];
};

export const AppRoutes: React.FC = () => (
  <Router hook={useHashLocation as any}>
    <Switch>
      <Route path="/:id">{(a) => <Page pageId={a.id} />}</Route>
      <Route path="/">
        <HomePage />
      </Route>
      <Route>
        <Redirect to={'/'} />
      </Route>
    </Switch>
  </Router>
);
