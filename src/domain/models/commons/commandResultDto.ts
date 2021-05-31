export enum ReturnType {
  unknow = 999,
  ok = 200,
  timeOut = 204,
  badRequest = 400,
  serverError = 500,
}

export class CommandResultDto {
  returnType: ReturnType;
  data: object;
  message: string;

  constructor() {
    this.returnType = ReturnType.unknow;
    this.data = null;
    this.message = null;
  }

  timeOut() {
    this.returnType = ReturnType.timeOut;
    this.message = 'A requisição excedeu o tempo de espera. Tente mais tarde.';
  }

  serverError() {
    this.returnType = ReturnType.serverError;
    this.message = 'Houve um erro ao processar a requisição. Tente mais tarde.';
  }

  badRequest() {
    this.returnType = ReturnType.badRequest;
    this.message =
      'Os parâmetros fornecidos são insuficientes para o sucesso da operação.';
  }

  ok(data: object = null) {
    this.returnType = ReturnType.ok;
    this.data = data;
    this.message = 'Operação realizada com sucesso.';
  }
}
