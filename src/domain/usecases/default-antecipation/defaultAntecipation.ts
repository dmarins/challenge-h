import { CommandResultDto } from 'domain/models/commons/commandResultDto';

interface IDefaultAntecipation {
  post: (
    amount: number,
    installments: number,
    mdr: number,
  ) => Promise<CommandResultDto>;
}

export default IDefaultAntecipation;
