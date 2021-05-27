import { DefaultRangeModel } from '../../models/default-antecipation/defaultRangeModel';

interface IDefaultAntecipation {
  post: (
    amount: number,
    installments: number,
    mdr: number,
  ) => Promise<DefaultRangeModel>;
}

export default IDefaultAntecipation;
