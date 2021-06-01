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

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleInstallmentsChange = (e) => {
    setInstallments(e.target.value);
  };

  const handleMdrChange = (e) => {
    setMdr(e.target.value);
  };

  const validate = useCallback(
    (field: string): void => {
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
    },
    [amount, installments, mdr, validation],
  );

  useEffect(() => validate('amount'), [amount, validate]);
  useEffect(() => validate('installments'), [installments, validate]);
  useEffect(() => validate('mdr'), [mdr, validate]);

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
    if (validationError === null) return;
    if (validationError.isFormInvalid) return;

    globalContext.setValue({ loading: true });

    calculateAntecipation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, calculateAntecipation, installments, mdr]);

  console.log(validationError);

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
