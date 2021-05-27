import { AntecipationSimulator } from 'presentation/pages/AntecipationSimulator/AntecipationSimulator';
import makeRemoteDefaultAntecipation from 'main/factories/usecases/default-antecipation/remoteDefaultAntecipationFactory';

const makeAntecipationSimulator: React.FC = () => {
  return (
    <AntecipationSimulator
      defaultAntecipation={makeRemoteDefaultAntecipation()}
    />
  );
};

export default makeAntecipationSimulator;
