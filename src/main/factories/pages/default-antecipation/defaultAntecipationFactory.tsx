import DefaultAntecipation from 'presentation/pages/DefaultAntecipation/DefaultAntecipation';
import makeRemoteDefaultAntecipation from 'main/factories/usecases/default-antecipation/remoteDefaultAntecipationFactory';

const makeDefaultAntecipation: React.FC = () => {
  return (
    <DefaultAntecipation
      defaultAntecipation={makeRemoteDefaultAntecipation()}
    />
  );
};

export default makeDefaultAntecipation;
