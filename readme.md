<h1 align="center"><img src="assets/logo.png" height="50" weigth="50"></h1>

<p align="center"><img src="https://img.shields.io/badge/<HTML>-<green>"> <img src="https://img.shields.io/badge/<CSS>-<green>"> <img src="https://img.shields.io/badge/<Javascript>-<green>"> 

### Indice
<!--ts-->
* [Sobre](#sobre)
* [Status do Projeto](#status-do-projeto)
* [Histórico do Projeto](#historico-do-projeto)
* [Features](#features)
* [Demonstração da Aplicação](#demonstração-da-aplicação)
* [Pré-requisitos](#pré-requisitos)
* [Testes](#testes)
* [Tecnologias Utilizadas](#tecnologias-utilizadas)
* [Autor](#autor)
* [Licença](#licença)

<!--te-->

### Sobre 
[↩](#indice)

<p>Desenvolvimento de Acesso à usuários com restrições:</p>
<ul >
 <li><a href="https://github.com/rocketseat-education/bootcamp-launchbase-desafios-10" target="_blank">Desafio Foodfy;</a></li>
</ul>
<p>Detalhes do Projeto:</p>
<ul>
 <li>Inserção de páginas de login, cadastro e resgate de senha;</li>
 <li>Restrição de acesso à usuários pelo administrador.</li>
</ul>

### Status do Projeto 
[↩](#indice)

<h4> 	
Finalizado! ;)
</h4>

### Histórico do Projeto 
[↩](#indice)

<p>Evolução do projeto ao longo do Bootcamp:</p>
<ul>
<li><a href="https://github.com/dimasdevspro/Site_Foodfy">FrontPage simples</a></li>
<li><a href="https://github.com/dimasdevspro/Project_Foodfy_Refatorado">Refatoração do Projeto</a></li>
<li><a href="https://github.com/dimasdevspro/Desafio_Foodfy_Admin">Inserindo Admin</a></li>
<li><a href="https://github.com/dimasdevspro/Desafio_Foodfy_Persistindo_Dados">Persistindo Dados</a></li>
<li><a href="https://github.com/dimasdevspro/Desafio_Foodfy_">Envio de Imagens Foodfy</a></li>
<li><a href="https://github.com/dimasdevspro/Foodfy_Desafio_Upload_Imagens">Upload de Imagens Foodfy<a></li>
<li><a href="https://github.com/dimasdevspro/Foodfy_Desafio_Listando_Receitas">Listando Receitas Foodfy<a></li>
</ul>


### Features 
[↩](#indice)

- [x] Página com menu
- [x] Página Sobre
- [x] Página com receitas
- [x] Página de cada receita
- [x] Gerenciar receitas - atualizado com Gerenciador de Imagens
- [x] Banco de Dados
- [x] Filtro com busca ordenada
- [x] Reorganizaçao de listagem de receitas
- [x] Páginas de Login, Cadastro e Resgate de Senha


### Demonstração da Aplicação 
[↩](#indice)

<h1 align="center"><img src="screenshots/Foodfy_Login_User.gif" height="350" weigth="550"></h1>

### Pré-requisitos 
[↩](#indice)

Para começar, você vai precisar instalar em sua máquina as seguintes ferramentas:

- Um repositório para seu projeto [Git](https://git-scm.com);

- Um editor de código [VSCode](https://code.visualstudio.com/);

- O motor V8 Javascript do Chrome, versão LTS [NodeJS](https://nodejs.org/en/download/);

- Sistema de Gerenciador de Dados [Postgresql](https://www.postgresql.org/download/);

- Cliente Gráfico e Multiplataforma do Postgresql [Postbird](https://www.electronjs.org/apps/postbird).


### Testes 
[↩](#indice)

```bash
# Baixe o editor equivalente para a sua plataforma
$ https://code.visualstudio.com/

# Vá para a pasta de downloads e execute o arquivo

# Acesse o terminal/cmd de sua plataforma (Win, Linux, etc)

# Clone este repositório com o seguinte comando abaixo
$ git clone https://github.com/dimasdevspro/Foodfy_Desafio_Login_User

# Ainda no terminal, acesse a pasta com mais um comando
$ cd Foodfy_Desafio_Login_User

# Agora digite este comando, para editar/testar o projeto
$ code .

```

### Instalação de Dependências 
[↩](#indice)

Instalação de Dependências "Express", "Nodemon", "Nunjucks", "Browsersync", "MethodOverride", "Postgre", "Multer", "Cryptjs", "Nodemailer", "Express Session", "Connect-pg-simple" para rodar aplicação.

```bash
# Abra o terminal do VSCode na Aba "Terminal"
$ "New Terminal"

# Certifique-se que o terminal está com o caminho de sua pasta, i.e
$ /Foodfy_Desafio_Listando_Receitas/

# Digite o comando no terminal para instalar o Express
$ npm install express

# Digite o comando no terminal para instalar o "Nodemon"
$ npm install -D nodemon

# Digite o comando no terminal para instalar o "Nunjucks"
$ npm install nunjucks

# Digite o comando no terminal para instalar o "Nunjucks"
$ npm install method-override

# Digite o comando no terminal para instalar o "Browsersync"
$ npm install browser-sync npm-run-all

# Certifique que no arquivo package.json, na linha "scripts" esteve descrito:
"scripts": {
    "start": "npm-run-all -p nodemon browser-sync",
    "nodemon": "nodemon src/server.js",
    "browser-sync": "browser-sync start --proxy http://localhost:3338 --files 'public, src/app/admin, src/app/views'"
  },

# Digite o comando no terminal para instalar o "Postgre"
$ npm install pg

# Digite o comando no terminal para instalar o "Multer"
$ npm install multer

# Digite o comando no terminal para instalar o "Cryptjs"
$ npm install cryptjs

# Digite o comando no terminal para instalar o "Nodemailer"
$ npm install nodemailer

# Digite o comando no terminal para instalar o "Express Session"
$ npm install express session

# Digite o comando no terminal para instalar o "Connect-pg-simple"
$ npm install connect-pg-simple

# Digite no terminal o seguinte comando para rodar o servidor
$ npm start

```

### Tecnologias utilizadas 
[↩](#indice)

As seguintes ferramentas foram usadas na construção do projeto:

- [VSCode](https://code.visualstudio.com/);
- [Git](https://git-scm.com);
- [NodeJS](https://nodejs.org/en/download/);
- [Postgresql](https://www.postgresql.org/download/);
- [Postbird](https://www.electronjs.org/apps/postbird).


### Autor 
[↩](#indice)

---

<a href="https://github.com/dimasdevspro">
 <img style="border-radius: 50%;" src="https://avatars1.githubusercontent.com/u/53888623?s=460&u=3c88fc42c7a0dc90293f9480a4288bf2f6a09396&v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Dimas Alves Pereira</b></sub></a> <a href="https://github.com/dimasdevspro" title="Github"></a>


Feito com ❤️ por Dimas 👋🏽 Entre em contato!

[![Instagram Badge](https://img.shields.io/badge/-@dimasdevspro-f09433?style=flat-square&labelColor=f09433&logo=instagram&logoColor=white&link=https://www.instagram.com/dimasdevspro/)](https://www.instagram.com/dimasdevspro/) [![Linkedin Badge](https://img.shields.io/badge/-Dimas-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/dimas_apereira/)](https://www.linkedin.com/in/dimas-apereira/) 
[![Gmail Badge](https://img.shields.io/badge/-dimasdevspro@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:dimasdevspro@gmail.com)](mailto:dimasdevspro@gmail.com)


### Licença 
[↩](#indice)

<img alt="APM" src="https://img.shields.io/apm/l/vim-mode">