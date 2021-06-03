import { BrowserRouter, Switch, Route } from 'react-router-dom';
import makeDefaultAntecipation from 'main/factories/pages/default-antecipation/defaultAntecipationFactory';
import makeDefaultAntecipationWithDelay from 'main/factories/pages/delay/defaultAntecipationWithDelayFactory';
import makeDefaultAntecipationWithTimeout from 'main/factories/pages/timeout/defaultAntecipationWithTimeoutFactory';
import makeDefaultAntecipationWithError from 'main/factories/pages/internal-server-error/defaultAntecipationWithErrorFactory';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={makeDefaultAntecipation} />
        <Route
          path="/delay"
          exact
          component={makeDefaultAntecipationWithDelay}
        />
        <Route
          path="/timeout"
          exact
          component={makeDefaultAntecipationWithTimeout}
        />
        <Route
          path="/error"
          exact
          component={makeDefaultAntecipationWithError}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
