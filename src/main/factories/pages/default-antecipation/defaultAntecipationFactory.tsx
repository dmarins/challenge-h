import DefaultAntecipation from 'presentation/pages/DefaultAntecipation/DefaultAntecipation';
import makeRemoteDefaultAntecipation from 'main/factories/usecases/default-antecipation/remoteDefaultAntecipationFactory';
import makeDefaultAntecipationValidation from 'main/factories/pages/default-antecipation/defaultAntecipationValidationFactory';

const makeDefaultAntecipation: React.FC = () => {
  return (
    <DefaultAntecipation
      defaultAntecipation={makeRemoteDefaultAntecipation('default')}
      validation={makeDefaultAntecipationValidation()}
    />
  );
};

export default makeDefaultAntecipation;
