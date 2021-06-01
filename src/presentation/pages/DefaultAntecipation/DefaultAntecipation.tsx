import IDefaultAntecipation from 'domain/usecases/default-antecipation/defaultAntecipation';
import { ReturnType } from 'domain/dto/commandResultDto';

import { useCallback, useContext, useEffect, useState } from 'react';
import { Loading } from 'presentation/components/Loading/Loading';
import { Resume } from 'presentation/components/Resume/Resume';
import GlobalContext from 'presentation/contexts/globalContext';
import { useTranslation } from 'react-i18next';
import './DefaultAntecipation.css';
import Notification from 'presentation/components/Notification/Notification';
import IValidation from 'presentation/protocols/validation';

type Props = {
  defaultAntecipation: IDefaultAntecipation;
  validation: IValidation;
};

const DefaultAntecipation = ({
  defaultAntecipation,
  validation,
}: Props): JSX.Element => {
  const [amount, setAmount] = useState(null);
  const [installments, setInstallments] = useState(null);
  const [mdr, setMdr] = useState(null);
  const [validationError, setValidationError] = useState(null);
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

    // if (value < 1000) {
    //   setAmount(null);
    //   return;
    // }

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

  const validate = (field: string): void => {
    const formData = { amount, installments, mdr };

    setValidationError((old) => ({
      ...old,
      [`${field}Error`]: validation.validate(field, formData),
    }));

    setValidationError((old) => ({
      ...old,
      isFormInvalid:
        !!old.amountError || !!old.installmentsError || !!old.mdrError,
    }));
  };

  useEffect(() => validate('amount'), [amount]);
  useEffect(() => validate('installments'), [installments]);
  useEffect(() => validate('mdr'), [mdr]);

  // useEffect(
  //   () => validationError.forEach(() => Notification.showError()),
  //   [validationError],
  // );

  const calculateAntecipation = useCallback(async () => {
    const dto = await defaultAntecipation.post(amount, installments, mdr);

    if (dto.returnType !== ReturnType.ok) {
      Notification.showError(dto.message);
      globalContext.setValue(null);
      return;
    }

    globalContext.setValue({ loading: false, resume: dto.data });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, installments, mdr]);

  useEffect(() => {
    if (validationError === null || validationError.isFormInvalid) return;

    globalContext.setValue({ loading: true });

    calculateAntecipation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, calculateAntecipation, installments, mdr]);

  return (
    <section className="container">
      <div className="inputs">
        <h1 className="title">{t('inputs.title')}</h1>
        <div className="form">
          <div
            className={`field ${
              validationError && validationError.amountError && 'error'
            }`}
          >
            <label>{t('inputs.labels.sale')}</label>
            <input
              type="text"
              name="amount"
              onChange={handleAmountChange}
              placeholder={validationError && validationError.amountError}
            />
          </div>
          <div
            className={`field ${
              validationError && validationError.installmentsError && 'error'
            }`}
          >
            <label>{t('inputs.labels.installments')}</label>
            <input
              type="text"
              name="installments"
              onChange={handleInstallmentsChange}
              placeholder={validationError && validationError.installmentsError}
            />
            <small>{t('inputs.labels.disclaimer')}</small>
          </div>
          <div
            className={`field ${
              validationError && validationError.installmentsError && 'error'
            }`}
          >
            <label>{t('inputs.labels.mdr')}</label>
            <input
              type="text"
              name="mdr"
              onChange={handleMdrChange}
              placeholder={validationError && validationError.mdrError}
            />
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

export default DefaultAntecipation;
