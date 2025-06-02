<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

**Projeto NestJS - API de Carrinho de Compras com Prisma e SQLite**

Este projeto implementa uma **API RESTful** de **carrinho de compras** utilizando **NestJS**, **Prisma ORM** e **SQLite** como banco de dados. Permite:

->Cadastro de usuários

->Cadastro de produtos

->Adição/remover produtos do carrinho

->Finalização de compra (com geração de histórico/pedido)

:gear: Tecnologias

Node.js + NestJS

Prisma ORM

SQLite (banco local)

Insomnia/Postman para testes

TypeScript

:floppy_disk: Instalação

pnpm install

npx prisma migrate dev --name init

pnpm run start:dev

Banco será criado automaticamente em prisma/dev.db

:open_file_folder: **Endpoints**

Usuários

Criar usuário

POST /users

**Body:**

{

  "email": "teste@exemplo.com",
  
  "name": "Gabriel",
  
  "password": "123456"
  
}

**Produtos**

Criar produto

POST /products

Body:


{

  "name": "Celular",
  
  "description": "Um bom celular",
  
  "price": 1200.00,
  
  "stock": 10,
  
  "category": "eletronicos"
  
}


**Buscar por nome**

GET /products/search/name/:name


**Buscar por categoria**


GET /products/search/category/:category


**Carrinho**

Criar carrinho para um usuário

POST /cart/user/:userId

**Adicionar vários produtos ao carrinho de um usuário**

POST /cart/user/:userId/products

**Body:**

{

  "products": [
    { "productId": 1, "quantity": 2 },
    { "productId": 3, "quantity": 1 }
  ]
}

**Buscar carrinho**


GET /cart/:carrinhoId

**Remover item do carrinho**


DELETE /cart/:carrinhoId/product/:productId


**Finalizar compra**


PATCH /cart/:carrinhoId/finalizar


**Body:**

{
  "pagamento": "pix"
}


:receipt: **Histórico de Pedidos**

Após a finalização de compra, um historicoPedido é criado contendo:

userId

total

pagamento

status

produtos com quantidade e preço unitário

:white_check_mark: Testes sugeridos (Insomnia/Postman)

Criar um usuário

Criar 2 ou 3 produtos

Adicionar produtos ao carrinho do usuário

Buscar o carrinho

Finalizar o carrinho

Validar se pedido foi criado e carrinho apagado

:warning: Observações

Ao finalizar a compra, o carrinho é excluído e os produtos são registrados em um pedido

A API é 100% stateless (sem login/jwt por enquanto)

:busts_in_silhouette: Autor

Gabriel (Rocket Lab NestJS Challenge)


