import { CommandResultDto } from 'domain/dto/commandResultDto';

interface IDefaultAntecipation {
  post: (
    amount: number,
    installments: number,
    mdr: number,
  ) => Promise<CommandResultDto>;
}

export default IDefaultAntecipation;
