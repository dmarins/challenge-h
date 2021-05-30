import IDefaultAntecipation from 'domain/usecases/default-antecipation/defaultAntecipation';

import { useCallback, useEffect, useState } from 'react';

import './AntecipationSimulator.css';

type Props = {
  defaultAntecipation: IDefaultAntecipation;
};

const AntecipationSimulator = ({ defaultAntecipation }: Props): JSX.Element => {
  const [amount, setAmount] = useState(null);
  const [installments, setInstallments] = useState(null);
  const [mdr, setMdr] = useState(null);
  const [result, setResult] = useState(null);

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
    setResult(result);
  }, [amount, defaultAntecipation, installments, mdr]);

  useEffect(() => {
    if (amount === null) return;
    if (installments === null) return;
    if (mdr === null) return;

    initPost();
  }, [amount, initPost, installments, mdr]);

  return (
    <section className="container">
      <div className="inputs">
        <h1 className="title">Simule sua Antecipação</h1>
        <div className="form">
          <div className="field">
            <label>Informe o valor da venda *</label>
            <input type="text" name="amount" onChange={handleAmountChange} />
          </div>
          <div className="field">
            <label>Em quantas parcelas? *</label>
            <input
              type="text"
              name="installments"
              onChange={handleInstallmentsChange}
            />
            <small>Máximo de 12 parcelas</small>
          </div>
          <div className="field">
            <label>Informe o percentual de MDR *</label>
            <input type="text" name="mdr" onChange={handleMdrChange} />
          </div>
        </div>
      </div>
      <div className="resume">
        <h3 className="title">Você Receberá:</h3>
        <hr />
        <div className="range">
          <ul>
            <li>
              <label>Amanhã:</label>
              <span>0,00</span>
            </li>
            <li>
              <label>Em 15 dias:</label>
              <span>0,00</span>
            </li>
            <li>
              <label>Em 30 dias:</label>
              <span>0,00</span>
            </li>
            <li>
              <label>Em 90 dias:</label>
              <span>0,00</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export { AntecipationSimulator };
