import GlobalContext from 'presentation/contexts/globalContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

import './Resume.css';

const Resume = (): JSX.Element => {
  const { t } = useTranslation();
  const globalContext = useContext(GlobalContext);

  const formatMoney = (value) => {
    const lang = i18n.language;
    const currencyCode = lang === 'pt' ? 'BRL' : 'USD';
    const locale = lang === 'pt' ? 'pt-br' : 'en-us';

    return value.toLocaleString(locale, {
      style: 'currency',
      currency: currencyCode,
    });
  };

  const makeValueList = () => {
    const properties = Object.entries(globalContext.value.resume);
    const items = [];
    for (let [key, value] of properties) {
      items.push(
        <li key={key}>
          <label data-test-id={`key-${key}`}>
            {key === '1'
              ? t('resume.items.tomorrow')
              : t('resume.items.inXdays', { days: key })}
            :
          </label>
          <span data-test-id={`value-${key}`}>{formatMoney(value)}</span>
        </li>,
      );
    }

    return items;
  };

  if (globalContext.value === null) return <></>;
  if (globalContext.value.resume === undefined) return <></>;
  if (globalContext.value.resume === null) return <></>;

  return (
    <>
      <h3 className="title">{t('resume.title')}</h3>
      <hr />
      <div className="range">
        <ul>{makeValueList()}</ul>
      </div>
    </>
  );
};

export { Resume };
