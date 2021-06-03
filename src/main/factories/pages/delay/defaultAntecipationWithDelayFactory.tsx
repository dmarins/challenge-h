import DefaultAntecipation from 'presentation/pages/DefaultAntecipation/DefaultAntecipation';
import makeRemoteDefaultAntecipation from 'main/factories/usecases/default-antecipation/remoteDefaultAntecipationFactory';
import makeDefaultAntecipationValidation from 'main/factories/pages/default-antecipation/defaultAntecipationValidationFactory';

const makeDefaultAntecipationWithDelay: React.FC = () => {
  return (
    <DefaultAntecipation
      defaultAntecipation={makeRemoteDefaultAntecipation('delay')}
      validation={makeDefaultAntecipationValidation()}
    />
  );
};

export default makeDefaultAntecipationWithDelay;
