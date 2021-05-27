import { BrowserRouter, Switch, Route } from 'react-router-dom';
import makeAntecipationSimulator from 'main/factories/pages/antecipation-simulator/antecipationSimulatorFactory';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={makeAntecipationSimulator} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
