# Oppai Man

## RFs (Requisitos funcionais)

  ### Login/Cadastro de Usuários
  - [x] Deve ser possivel se cadastrar
  - [x] Deve ser possivel se autenticar
  - [x] Deve ser possivel exibir o perfil do usuário

  ### Cadastro de Jogos
  - [x] Deve ser possivel realizar o cadastro de um jogo
  - [x] Deve ser possivel atualizar o cadastro de um jogo

  ### Catálogo de Jogos
  - [x] Deve ser possivel listar todos os jogos
  - [x] Deve ser possivel filtrar por nome, gênero, preço e data

  ### Página do Jogo
  - [x] Deve ser possivel ver um jogo selecionado
  - [x] Deve ser possivel comprar um jogo
  
## RNs (Regras de negócio)

  ### Login/Cadastro de Usuários
  - [x] Somente usuários com cadastro devem conseguir fazer login
  - [x] Deve ser diferenciado usuário do tipo desenvolvedor e cliente
  - [x] O usuário não deve se cadastrar com e-mail duplicado
  - [x] A sessão do usuário deve ser armazenada

  ### Cadastro de Jogos
  - [x] Somente usuários autenticados podem acessar essa página
  - [x] A página deve ser acessada somente por usuário do tipo desenvolvedor

  ### Catálogo de Jogos
  - [x] Podera ser acessada por qualquer tipo de usuário logado ou não
  
  ### Biblioteca de Jogos
- [x] Somente usuário logados poderam ver essa página
- [x] Será possivel visualizar jogos adiquiridos ou adicionados

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário deve estar criptografada
- [x] Os dados da applicação deve estar persistidos em uma banco de dados
- [x] Todas as lista de dados deve ser paginadas inicialmente com 10 itens por pagina
- [x] O usuário deve ser identificado por um JWT (JSON Web Token)
