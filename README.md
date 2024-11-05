<img src="https://img.shields.io/static/v1?label=TypeScript&message=Language&color=3178C6&style=for-the-badge&logo=typescript"/>
<img src="https://img.shields.io/static/v1?label=Docker&message=Container&color=2496ED&style=for-the-badge&logo=docker"/>
<img src="https://img.shields.io/static/v1?label=NestJS&message=Framework&color=E0234E&style=for-the-badge&logo=nestjs"/>
<img src="https://img.shields.io/static/v1?label=Prisma&message=ORM&color=2D3748&style=for-the-badge&logo=prisma"/>
<img src="https://img.shields.io/static/v1?label=GraphQL&message=API&color=E10098&style=for-the-badge&logo=graphql"/>
<img src="https://img.shields.io/static/v1?label=Jest&message=Testing&color=C21325&style=for-the-badge&logo=jest"/>

<br/>

#### PS: como se trata de ambiente de desenvolvimento deixei os arquivos .env para facilitar a inicialização do projeto

## Scripts

Iniciar serviços web (Docker e Postgres), realizar as migrations e o servidor web(back-end):

    - npm run dev

Aqui foi realizado um script que aguardar a inicializaçãos do banco de dados para em seguida rodar as migrations e inciar o Nest. Esse processo facilita e garante a integridade caso futuramente se desejar implementar um processo de CI no projeto.

Iniciar serviços web (Docker):

    - npm run services:up

Parar serviços web (Docker):

    - npm run services:down

Subir as Migrations:

    - npx prisma migrations dev(para testes) ou deploy(para produção)

Iniciar o servidor em produção:

    - npm run start

Executar os testes(Jest):

    - npm run test

Executar verificação de formatação de código:

    - npm run lint:prettier:check

Executar correção de formatação de código:

    - npm run lint:prettier:fix

## Funcionalidades

Api conta com cryptografia de senha através da bibliotéca bcrypto, autenticação de usuários e estrutura de guard para endpoints

É possivel, criar, authenticar e buscar um usuário atraves de email ou id, também temos a rota que fornece as informações do usuário para o middleware do front-end.

as requisições do prisma foram realizadas em um repositório separado facilitando uma substituição futura de ORM, os scripts também foram ajustados para rodar em um processo de CI caso necessário como github actions por exemplo.

## Bibliotecas

- bcrypto
- jsonwebtoken
- prisma
- dotenv
- graphql
- Faker
- jest
