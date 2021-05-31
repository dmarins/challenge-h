import IDefaultAntecipation from 'domain/usecases/default-antecipation/defaultAntecipation';

import { Loading } from 'presentation/components/Loading/Loading';
import { Resume } from 'presentation/components/Resume/Resume';
import GlobalContext from 'presentation/contexts/globalContext';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './AntecipationSimulator.css';

type Props = {
  defaultAntecipation: IDefaultAntecipation;
};

const AntecipationSimulator = ({ defaultAntecipation }: Props): JSX.Element => {
  const [amount, setAmount] = useState(null);
  const [installments, setInstallments] = useState(null);
  const [mdr, setMdr] = useState(null);
  const { t } = useTranslation();
  const globalContext = useContext(GlobalContext);

  const trimValue = (value) => {
    return value ? value.trim() : value;
  };

  const convertToInt = (value) => {
    return value !== '' ? parseInt(value) : null;
  };

  const handleAmountChange = (e) => {
    const withoutSpaces = trimValue(e.target.value);
    const value = convertToInt(withoutSpaces);

    if (value < 1000) {
      setAmount(null);
      return;
    }

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

  const calculate = useCallback(async () => {
    if (amount === null) return;
    if (installments === null) return;
    if (mdr === null) return;

    globalContext.setValue({ loading: true });

    const result = await defaultAntecipation.post(amount, installments, mdr);

    globalContext.setValue({ loading: false, resume: result });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, installments, mdr]);

  useEffect(() => {
    calculate();
  }, [amount, calculate, installments, mdr]);

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
        <Loading />
        <Resume />
      </div>
    </section>
  );
};

export { AntecipationSimulator };
