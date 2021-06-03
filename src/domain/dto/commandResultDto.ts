export enum ReturnType {
  unknow = 999,
  ok = 200,
  timeOut = 408,
  badRequest = 400,
  internalServerError = 500,
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
    this.message =
      'A requisição excedeu o tempo de espera. Tente novamente mais tarde.';

    return this;
  }

  internalServerError() {
    this.returnType = ReturnType.internalServerError;
    this.message =
      'Houve um erro ao processar a requisição. Tente novamente mais tarde.';

    return this;
  }

  badRequest() {
    this.returnType = ReturnType.badRequest;
    this.message =
      'Os parâmetros fornecidos são insuficientes para o sucesso da operação.';

    return this;
  }

  ok(data: object = null) {
    this.returnType = ReturnType.ok;
    this.data = data;
    this.message = 'Operação realizada com sucesso.';

    return this;
  }
}
