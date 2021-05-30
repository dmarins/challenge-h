import IDefaultAntecipation from 'domain/usecases/default-antecipation/defaultAntecipation';

import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import './AntecipationSimulator.css';

type Props = {
  defaultAntecipation: IDefaultAntecipation;
};

const AntecipationSimulator = ({ defaultAntecipation }: Props): JSX.Element => {
  const [amount, setAmount] = useState(null);
  const [installments, setInstallments] = useState(null);
  const [mdr, setMdr] = useState(null);
  const [resume, setResume] = useState(null);
  const { t } = useTranslation();

  const trimValue = (value) => {
    return (value = value ? value.trim() : null);
  };

  const convertToInt = (value) => {
    return parseInt(value);
  };

  const handleAmountChange = (e) => {
    const value = trimValue(e.target.value);
    setAmount(convertToInt(value));
  };
  const handleInstallmentsChange = (e) => {
    const value = trimValue(e.target.value);
    setInstallments(convertToInt(value));
  };
  const handleMdrChange = (e) => {
    const value = trimValue(e.target.value);
    setMdr(convertToInt(value));
  };

  const initPost = useCallback(async () => {
    const result = await defaultAntecipation.post(amount, installments, mdr);
    setResume(result);
  }, [amount, defaultAntecipation, installments, mdr]);

  useEffect(() => {
    if (amount === null) return;
    if (installments === null) return;
    if (mdr === null) return;

    initPost();
  }, [amount, initPost, installments, mdr]);

  const makeValueList = () => {
    const properties = Object.entries(resume);
    const items = [];
    for (let [key, value] of properties) {
      items.push(
        <li key={key}>
          <label>
            {key === '1'
              ? t('resume.items.tomorrow')
              : t('resume.items.inXdays', { days: key })}
            :
          </label>
          <span>{value}</span>
        </li>,
      );
    }

    return items;
  };

  return (
    <section className="container">
      <div className="inputs">
        <h1 className="title">{t('inputs.title')}</h1>
        <div className="form">
          <div className="field">
            <label>{t('inputs.labels.sale')}</label>
            <input type="text" name="amount" onChange={handleAmountChange} />
          </div>
          <div className="field">
            <label>{t('inputs.labels.installments')}</label>
            <input
              type="text"
              name="installments"
              onChange={handleInstallmentsChange}
            />
            <small>{t('inputs.labels.disclaimer')}</small>
          </div>
          <div className="field">
            <label>{t('inputs.labels.mdr')}</label>
            <input type="text" name="mdr" onChange={handleMdrChange} />
          </div>
        </div>
      </div>
      <div className="resume">
        <h3 className="title">{t('resume.title')}</h3>
        <hr />
        <div className="range">
          <ul>{resume && makeValueList()}</ul>
        </div>
      </div>
    </section>
  );
};

export { AntecipationSimulator };
