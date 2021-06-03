import DefaultAntecipation from 'presentation/pages/DefaultAntecipation/DefaultAntecipation';
import makeRemoteDefaultAntecipation from 'main/factories/usecases/default-antecipation/remoteDefaultAntecipationFactory';
import makeDefaultAntecipationValidation from 'main/factories/pages/default-antecipation/defaultAntecipationValidationFactory';

const makeDefaultAntecipationWithTimeout: React.FC = () => {
  return (
    <DefaultAntecipation
      defaultAntecipation={makeRemoteDefaultAntecipation('timeout')}
      validation={makeDefaultAntecipationValidation()}
    />
  );
};

export default makeDefaultAntecipationWithTimeout;
