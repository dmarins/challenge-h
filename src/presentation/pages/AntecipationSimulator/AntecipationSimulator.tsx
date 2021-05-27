import IDefaultAntecipation from 'domain/usecases/default-antecipation/defaultAntecipation';

import './AntecipationSimulator.css';

type Props = {
  defaultAntecipation: IDefaultAntecipation;
};

const AntecipationSimulator = ({ defaultAntecipation }: Props): JSX.Element => {
  return (
    <section className="container">
      <div className="inputs">
        <h1 className="title">Simule sua Antecipação</h1>
        <div className="form">
          <div className="field">
            <label>Informe o valor da venda *</label>
            <input type="text" />
          </div>
          <div className="field">
            <label>Em quantas parcelas? *</label>
            <input type="text" />
            <small>Máximo de 12 parcelas</small>
          </div>
          <div className="field">
            <label>Informe o percentual de MDR *</label>
            <input type="text" />
          </div>
        </div>
      </div>
      <div className="resume">resume</div>
    </section>
  );
};

export { AntecipationSimulator };
