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

Após você deverá copiar o exemplo das variáveis de ambiente:

```zsh
foo@bar:~$ cp .env.example .env
```

Em seguida você poderá executar exemplos de utilização do sistema criado através do comando:

```zsh
foo@bar:~$ npm run dev
ou
foo@bar:~$ yarn dev
```

E para executar os testes automatizados deverá ser utilizado os seguintes comandos:

```zsh
foo@bar:~$ npm run test
ou
foo@bar:~$ yarn test
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

### Especificação dos testes

Em cada teste, tem uma breve descrição do que foi testado ao longo do desenvolvimento dessa API.

- **`should be able to generate info from a 47 digit bankslip digitable line`**: Deve gerar informações de uma linha digitável de boleto de 47 dígitos.

- **`should be able to generate info from a 48 digit bankslip digitable line`**: Deve gerar informações de uma linha digitável de boleto de 48 dígitos.

- **`should be able to generate info from a 48 digit bankslip digitable line THAT contains expiration date info`**: Deve gerar informações de uma linha digitável de boleto de 48 dígitos que contém dados de vencimento válidos do boleto.

- **`should NOT be able to generate info from a digitable line with invalid characters`**: NÃO deve gerar informaçòes de uma linha digitável de boleto com caractéres inválidos.

- **`should NOT be able to generate info from a digitable line with space in the characters`**: NÃO deve gerar informaçòes de uma linha digitável de boleto com espaço nos caractéres.

- **`should NOT be able to generate info from a digitable line with invalid lenght`**: NÃO deve gerar informaçòes de uma linha digitável de boleto com tamanho menor que 47 dígitos ou maior que 48 dígitos.

- **`should NOT be able to generate info from a covenant bankslip digitable line with invalid digit checker on the first group THAT uses module 10 calculation method`**: NÃO deve gerar informaçòes de uma linha digitável de boleto de concessionária ONDE no primeiro grupo de dígitos o dígito verificador é inválido, utilizando o método de cálculo Modulo 10.

- **`should NOT be able to generate info from a covenant bankslip digitable line with invalid digit checker on the second group THAT uses module 10 calculation method`**: NÃO deve gerar informaçòes de uma linha digitável de boleto de concessionária ONDE no segundo grupo de dígitos o dígito verificador é inválido, utilizando o método de cálculo Modulo 10.

- **`should NOT be able to generate info from a covenant bankslip digitable line with invalid digit checker on the third group THAT uses module 10 calculation method`**: NÃO deve gerar informaçòes de uma linha digitável de boleto de concessionária ONDE no terceiro grupo de dígitos o dígito verificador é inválido, utilizando o método de cálculo Modulo 10.

- **`should NOT be able to generate info from a covenant bankslip digitable line with invalid digit checker on the fourth group THAT uses module 10 calculation method`**: NÃO deve gerar informaçòes de uma linha digitável de boleto de concessionária ONDE no quarto grupo de dígitos o dígito verificador é inválido, utilizando o método de cálculo Modulo 10.

- **`should NOT be able to generate info from a covenant bankslip digitable line with invalid general digit checker THAT uses module 10 calculation method`**: NÃO deve gerar informaçòes de uma linha digitável de boleto de concessionária ONDE dígito verificador geral é inválido, utilizando o método de cálculo Modulo 10.

- **`should NOT be able to generate info from a covenant bankslip digitable line with invalid digit checker on the first group THAT uses module 11 calculation method`**: NÃO deve gerar informaçòes de uma linha digitável de boleto de concessionária ONDE no primeiro grupo de dígitos o dígito verificador é inválido, utilizando o método de cálculo Modulo 11.

- **`should NOT be able to generate info from a covenant bankslip digitable line with invalid digit checker on the second group THAT uses module 11 calculation method`**: NÃO deve gerar informaçòes de uma linha digitável de boleto de concessionária ONDE no segundo grupo de dígitos o dígito verificador é inválido, utilizando o método de cálculo Modulo 11.

- **`should NOT be able to generate info from a covenant bankslip digitable line with invalid digit checker on the third group THAT uses module 11 calculation method`**: NÃO deve gerar informaçòes de uma linha digitável de boleto de concessionária ONDE no terceiro grupo de dígitos o dígito verificador é inválido, utilizando o método de cálculo Modulo 11.

- **`should NOT be able to generate info from a covenant bankslip digitable line with invalid digit checker on the fourth group THAT uses module 11 calculation method`**: NÃO deve gerar informaçòes de uma linha digitável de boleto de concessionária ONDE no quarto grupo de dígitos o dígito verificador é inválido, utilizando o método de cálculo Modulo 11.

- **`should NOT be able to generate info from a covenant bankslip digitable line with invalid general digit checker THAT uses module 11 calculation method`**: NÃO deve gerar informaçòes de uma linha digitável de boleto de concessionária ONDE dígito verificador geral é inválido, utilizando o método de cálculo Modulo 11.

- **`should NOT be able to generate info from a covenant bankslip with invalid segment`**: NÃO deve gerar informaçòes de uma linha digitável de boleto de concessionária ONDE o segmento é inválido.

- **`should NOT be able to generate info from a covenant bankslip with invalid effective value`**: NÃO deve gerar informaçòes de uma linha digitável de boleto de concessionária ONDE o valor efetivo é inválido.

- **`should NOT be able to generate info from a bonds bankslip digitable line with invalid digit checker on the first group`**: NÃO deve gerar informaçòes de uma linha digitável de boleto de título ONDE no primeiro grupo de dígitos o dígito verificador é inválido.

- **`should NOT be able to generate info from a bonds bankslip digitable line with invalid digit checker on the second group`**: NÃO deve gerar informaçòes de uma linha digitável de boleto de título ONDE no segundo grupo de dígitos o dígito verificador é inválido.

- **`should NOT be able to generate info from a bonds bankslip digitable line with invalid digit checker on the third group`**: NÃO deve gerar informaçòes de uma linha digitável de boleto de título ONDE no terceiro grupo de dígitos o dígito verificador é inválido.

- **`should NOT be able to generate info from a bonds bankslip digitable line with invalid general digit checker`**: NÃO deve gerar informaçòes de uma linha digitável de boleto de título ONDE no dígitos o dígito verificador geral é inválido.
