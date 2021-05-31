import { useContext } from 'react';
import GlobalContext from 'presentation/contexts/globalContext';
import './Loading.css';

const Loading = (): JSX.Element => {
  const globalContext = useContext(GlobalContext);

  if (globalContext.value === null)
    return <h3>Informe ao lado os valores para calcular a sua antecipação.</h3>;

  debugger;
  if (!globalContext.value.loading) return <></>;

  return (
    <div className="loading">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export { Loading };
