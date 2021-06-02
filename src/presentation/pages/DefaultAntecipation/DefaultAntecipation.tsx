import IDefaultAntecipation from 'domain/usecases/default-antecipation/defaultAntecipation';
import { ReturnType } from 'domain/dto/commandResultDto';

import { useContext, useEffect, useState } from 'react';
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
  const validationErrorDefaultValues = {
    amountError: undefined,
    installmentsError: undefined,
    mdrError: undefined,
    isFormInvalid: true,
  };
  const [validationError, setValidationError] = useState(
    validationErrorDefaultValues,
  );
  const [amount, setAmount] = useState('');
  const [amountTimer, setAmountTimer] = useState(null);
  const [installments, setInstallments] = useState('');
  const [installmentsTimer, setInstallmentsTimer] = useState(null);
  const [mdr, setMdr] = useState('');
  const [mdrTimer, setMdrTimer] = useState(null);
  const { t } = useTranslation();
  const globalContext = useContext(GlobalContext);

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

  const handleAmountChange = (e) => {
    if (amountTimer) {
      clearTimeout(amountTimer);
      setAmountTimer(null);
    }

    setAmountTimer(
      setTimeout(() => {
        setAmount(e.target.value);
      }, 300),
    );
  };

  const handleInstallmentsChange = (e) => {
    if (installmentsTimer) {
      clearTimeout(installmentsTimer);
      setInstallmentsTimer(null);
    }

    setInstallmentsTimer(
      setTimeout(() => {
        setInstallments(e.target.value);
      }, 300),
    );
  };

  const handleMdrChange = (e) => {
    if (mdrTimer) {
      clearTimeout(mdrTimer);
      setMdrTimer(null);
    }

    setMdrTimer(
      setTimeout(() => {
        setMdr(e.target.value);
      }, 300),
    );
  };

  const calculate = async () => {
    const dto = await defaultAntecipation.post(
      parseInt(amount.trim()),
      parseInt(installments.trim()),
      parseInt(mdr.trim()),
    );

    if (dto.returnType !== ReturnType.ok) {
      Notification.showError(dto.message);
      globalContext.setValue(null);
      return;
    }

    globalContext.setValue({ loading: false, resume: dto.data });
    setValidationError(validationErrorDefaultValues);
  };

  useEffect(() => {
    if (amount === '') return;
    if (installments === '') return;
    if (mdr === '') return;
    if (validationError.isFormInvalid) return;

    globalContext.setValue({ loading: true });

    calculate();
  }, [validationError.isFormInvalid, amount, installments, mdr]);

  return (
    <section className="container">
      <div className="inputs">
        <h1 className="title">{t('inputs.title')}</h1>
        <div className="form">
          <div className={`field ${validationError.amountError && 'error'}`}>
            <label>{t('inputs.labels.sale')}</label>
            <input
              type="text"
              name="amount"
              onChange={handleAmountChange}
              title={validationError.amountError}
            />
          </div>
          <div
            className={`field ${validationError.installmentsError && 'error'}`}
          >
            <label>{t('inputs.labels.installments')}</label>
            <input
              type="text"
              name="installments"
              onChange={handleInstallmentsChange}
              title={validationError.installmentsError}
            />
            <small>{t('inputs.labels.disclaimer')}</small>
          </div>
          <div className={`field ${validationError.mdrError && 'error'}`}>
            <label>{t('inputs.labels.mdr')}</label>
            <input
              type="text"
              name="mdr"
              onChange={handleMdrChange}
              title={validationError.mdrError}
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
