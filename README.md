# <p align="center">Oppai Man API<p>

## 👓 Visão Geral
API base para uma Game Store

## ⛏ Tecnologias

### Principais tecnologias do projeto:
- [NodeJs](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [ExpressJs](https://expressjs.com/pt-br/)
- [JWT](https://jwt.io/)
- [Swagger](https://swagger.io/)
- [Docker](https://www.docker.com/)
- [Prisma ORM](https://www.prisma.io/)
- [Stripe Getway](https://stripe.com/br)

## 👨‍💻 Inciando o projeto
### 📃 Clonando repositório
>Faça a clonagem do repositório utilizando a url de clonagem http ou ssh.

### 🏃‍♂️ Iniciando
>Após a clonagem abra o diretorio do arquivo em seu terminal e utilize um dos scripts abaixo para instalar todas dependencias necessárias para o funcionamento da aplição. Use o gerenciado de pacotes de sua preferencia.
````
yarn install
````
>Na raiz do projeto crie dois novos arquivos de env noemados por `.env` e `.env.development` com a mesma estrutura do `.env.example` nas variasvei de `DB_USER`, `DB_PASSWORD` e `DB_NAME` adicione as informações referente a sua base de dados

### 📁 Container Docker (Instalar Docker se não tiver)
>Antes de subir o container certifique-se de realizar o build da aplicação.
````
yarn build
````

>Execute o script abaixo, isso ira subir um container docker na sua maquina.
````
yarn compose:build
````

### 📁 Sem Container Docker
> Caso não tenha o docker instalado é possível executar a aplicação fora do container. Nesse caso será necessario ter o banco de dados MySQL instalado.

> Abra o seu gerenciado de banco de dados, crie uma nova base dados. No arquivo `.env.developer` nas variasvei de `DB_USER`, `DB_PASSWORD` e `DB_NAME` adicione as informações referente a sua base de dados local. Na `DATABASE_URL` será a url completa do seu banco com as informações de conexão adicionadas nas variaveis anteriores

### 📤 Prisma ORM (Banco de dados)
>Execute o prisma para que sejá gerado as migrations das tabelas
````
yarn migrate:dev
````
>Execute os seeds inciais da base de dados
````
yarn prisma:seed
````

## 🚀 Executando Aplicação
>Caso esteja sem container Docker, execute a aplicação com o seguinte escript
````
yarn dev
````
>O script executado anteriormente `yarn compose:build` já startou a API caso tenha executado no container docker.
## 📄 Documentação
>API possuí uma documentação criada com a biblioteca Swagger e pode ser acessada atrasvez da url `http://localhost:3333/api/docs`
