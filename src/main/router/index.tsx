import { BrowserRouter, Switch, Route } from 'react-router-dom';
import makeDefaultAntecipation from 'main/factories/pages/default-antecipation/defaultAntecipationFactory';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={makeDefaultAntecipation} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
