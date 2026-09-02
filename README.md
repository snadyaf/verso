# 📚 Verso

### Onde histórias encontram leitores.

O **Verso** é uma plataforma literária desenvolvida em React que permite aos usuários descobrir livros, consultar informações sobre as obras, verificar disponibilidade física e digital, reservar exemplares físicos e organizar sua biblioteca pessoal.

O projeto foi desenvolvido como parte de uma sprint de duas semanas, com foco em **React, PrimeReact, consumo de API, gerenciamento de estado, localStorage e trabalho colaborativo com Git/GitHub e Trello**.

---

## 🎯 Objetivo

Criar uma experiência simples e intuitiva para leitores descobrirem novas histórias e organizarem suas leituras.

O projeto foi planejado em formato de MVP, priorizando as funcionalidades essenciais para que a aplicação tenha um fluxo completo e funcional dentro do período da sprint.

---

## 👥 Equipe

| Integrante | Papel                                           |
| ---------- | ----------------------------------------------- |
| **Snadya** | Product Owner (PO) / Tech Lead / Desenvolvedora |
| **Sid**    | Desenvolvedor Front-end / UI                    |
| **Miguel** | Desenvolvedor Front-end / Dados e Estado        |

> Todos os integrantes participam do desenvolvimento. Os papéis representam o foco principal de cada membro durante a sprint.

---

## 🚀 Funcionalidades do MVP

### 🏠 Home

* Apresentação da plataforma.
* Destaques de livros.
* Acesso rápido ao catálogo.
* Navegação pelas principais áreas.

### 📚 Catálogo

* Pesquisa de livros.
* Consumo de API pública de livros.
* Exibição de capa, título e autor.
* Visualização dos detalhes de cada livro.
* Estados de carregamento e erro.
* Tratamento de resultados não encontrados.

### 📖 Detalhes do livro

* Capa.
* Título.
* Autor(es).
* Descrição.
* Categorias, quando disponíveis.
* Disponibilidade digital.
* Formatos digitais disponíveis, como PDF e EPUB, quando informados pela API.
* Disponibilidade física simulada pelo acervo da aplicação.

### 🔐 Conta

* Cadastro de usuário.
* Login.
* Logout.
* Validação dos formulários.
* Persistência dos usuários utilizando `localStorage`.

> A autenticação é simulada no front-end, pois o escopo da sprint não contempla backend ou autenticação real.

### 📌 Reserva

* Verificação de disponibilidade física.
* Reserva de livro físico.
* Confirmação da reserva.
* Impedimento de reserva duplicada.
* Visualização das reservas.
* Cancelamento de reserva.
* Atualização da disponibilidade simulada.

### ❤️ Minha Biblioteca

O usuário pode organizar seus livros em:

* ❤️ Favoritos
* 📚 Quero ler
* ✅ Já li

As informações são persistidas no `localStorage`.

### 👤 Perfil

* Visualização do perfil do usuário.
* Biblioteca pessoal.
* Favoritos.
* Livros que deseja ler.
* Livros já lidos.

---

## 🌐 API

O catálogo utiliza uma **API pública de livros** para obter informações bibliográficas das obras.

Os dados provenientes da API são utilizados para informações como:

* título;
* autores;
* capa;
* descrição;
* categorias;
* disponibilidade de formatos digitais, quando fornecida.

A disponibilidade de exemplares físicos é simulada localmente, pois não existe backend ou banco de dados neste projeto.

---

## 💾 Persistência de dados

Como o projeto é exclusivamente front-end, utilizamos o **localStorage** para persistência dos dados da aplicação.

Entre os dados armazenados estão:

```text
users
currentUser
userBooks
reservations
```

Essa abordagem permite que os dados continuem disponíveis após o recarregamento da página no mesmo navegador.

---

## 🛠️ Tecnologias

* **React**
* **Vite**
* **PrimeReact**
* **React Router**
* **JavaScript**
* **API pública de livros**
* **localStorage**
* **Git**
* **GitHub**
* **Trello**

---

## 🎨 PrimeReact

O projeto utiliza componentes do PrimeReact para construção da interface, incluindo recursos como:

* `Menubar`
* `Button`
* `InputText`
* `Password`
* `Card`
* `DataView`
* `Tag`
* `Dialog`
* `ConfirmDialog`
* `Toast`
* `Avatar`
* `Tabs`
* `ProgressSpinner`
* `Skeleton`

A escolha dos componentes busca manter uma interface consistente e reutilizável.

---

## 📂 Estrutura do projeto

```text
src/
├── assets/
│
├── components/
│   ├── BookCard/
│   ├── Header/
│   ├── Footer/
│   └── Loading/
│
├── pages/
│   ├── Home/
│   ├── Catalog/
│   ├── BookDetails/
│   ├── Login/
│   ├── Register/
│   ├── Profile/
│   ├── PersonalLibrary/
│   └── Reservations/
│
├── services/
│   └── booksApi.js
│
├── hooks/
│   └── useLocalStorage.js
│
├── utils/
│   └── storage.js
│
├── data/
│   └── physicalBooks.js
│
├── context/
│   └── AuthContext.jsx
│
├── routes/
│   └── AppRoutes.jsx
│
├── App.jsx
└── main.jsx
```

---

## ▶️ Como executar

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

### 2. Entrar na pasta

```bash
cd verso
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Executar o projeto

```bash
npm run dev
```

A aplicação estará disponível no endereço informado pelo Vite no terminal.

---

## 🌱 Roadmap

As funcionalidades abaixo fazem parte da evolução planejada do Verso, mas **não fazem parte do MVP desta sprint**:

### 👥 Comunidade literária

* Feed de publicações.
* Criar publicações.
* Curtir publicações.
* Comentar publicações.
* Seguir outros usuários.
* Perfis públicos.
* Visualizar atividades de outros leitores.

### 🔑 Autenticação

* Login com Google.
* Recuperação de senha.
* Autenticação real.

### ✨ Melhorias futuras

* Avaliação de livros.
* Filtros avançados.
* Ordenação.
* Estatísticas de leitura.
* Modo escuro.
* Backend.
* Banco de dados.

---

## 📋 Documentação

* [Definição do MVP](./MVP.md)
* [Quadro do Trello](https://trello.com/invite/b/6a961ea99d1c91aa0c546a3d/ATTI438e207623853f05a304436dc9e345f997F0DC88/verso)

---

## 🔀 Fluxo de desenvolvimento

O projeto utiliza Git/GitHub seguindo o fluxo:

```text
main
 │
 ├── feature/nome-da-tarefa
 │
 └── Pull Request
        │
        └── Code Review
               │
               └── Merge → main
```

Cada funcionalidade deve ser desenvolvida em uma branch própria e passar por revisão de pelo menos um integrante antes do merge.

---

## 📌 Definition of Done

Uma tarefa só é considerada concluída quando:

* [ ] Funcionalidade implementada.
* [ ] Testada pelo responsável.
* [ ] Sem erros no console.
* [ ] Branch criada para a tarefa.
* [ ] Pull Request aberto.
* [ ] Código revisado por outro integrante.
* [ ] Ajustes da revisão realizados, quando necessários.
* [ ] PR aprovado.
* [ ] Merge realizado na `main`.
* [ ] Card atualizado no Trello.

---

## 📄 Sobre o projeto

O Verso foi desenvolvido como projeto colaborativo de front-end, simulando o fluxo de trabalho de uma equipe de desenvolvimento durante uma sprint.

O projeto prioriza **escopo, colaboração, organização, qualidade de código e entrega de um MVP funcional**.
