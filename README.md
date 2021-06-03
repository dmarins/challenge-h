# Instruções para a execução do projeto

## 1 - instalar dependências

```
npm install ou yarn add ou yarn
```

## 2 - construir e servir os arquivos para o desenvolvimento

```
npm run start ou yarn start
```

## 2.1 - gerar um padrão de arquivos para a criação de novos componentes ou páginas

```
npm run generate ou yarn generate
```

## 2.2 - lintar toda a base de código

```
npm run lint ou yarn lint
```

## 3 - executar todos os testes de unidade para o desenvolvimento

```
npm run test:unit ou yarn test:unit
```

## 3.1 - executar todos os testes de unidade com code coverage

```
npm run test:ci ou yarn test:ci
```

## 3.2 - executar todos os testes de end to end (sem interface)

```
npm run start ou yarn start
```

em um terminal a parte:

```
npm run test:e2e ou yarn test:e2e
```

## 3.3 - executar todos os testes de end to end (com interface)

```
npm run start ou yarn start
```

em um terminal a parte:

```
npm run cy:open ou yarn cy:open
```

## 4 - construir os arquivos finais para produção

```
npm run build ou yarn build
```
