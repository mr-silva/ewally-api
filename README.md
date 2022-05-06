# Ewally Backend Challenge

### Desafio

Queremos poder através da aplicação consultar linhas digitáveis de boleto de título bancário
e pagamento de concessionárias, verificando se a mesma é válida ou não. Sendo válida e
possuindo valor e/ou data de vencimento ter o retorno desses dados.

### Como utilizar

Para iniciar você deve instalar as dependências:

```zsh
foo@bar:~$ npm i
ou
foo@bar:~$ yarn
```

Em seguida você poderá executar exemplos de utilização do sistema criado através do comando:

```zsh
foo@bar:~$ npm run dev
ou
foo@bar:~$ yarn dev
```

### Rotas da aplicação

Abaixo uma breve explicação de como utilizar as rotas disponíveis na aplicação:

- **`GET /boleto/:barCode`**: Essa rota deve retornar os dados de um boleto conforme a linha digitável:

_Retorno esperado_

```json
{
  "barCode": "21299758700000020000001121100012100447561740",
  "amount": 20.0,
  "expirationDate": "2018-07-16"
}
```
