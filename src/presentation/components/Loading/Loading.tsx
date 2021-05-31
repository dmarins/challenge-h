import { useContext } from 'react';
import GlobalContext from 'presentation/contexts/globalContext';
import './Loading.css';
import { useTranslation } from 'react-i18next';

const Loading = (): JSX.Element => {
  const globalContext = useContext(GlobalContext);
  const { t } = useTranslation();

  if (globalContext.value === null) return <h3>{t('loading.title')}</h3>;
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
