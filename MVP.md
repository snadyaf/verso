# 📚 Verso — Definição do MVP

## 1. Visão do produto

O **Verso** é uma plataforma literária para descoberta e organização de livros.

A proposta é permitir que leitores encontrem livros, consultem suas informações, verifiquem disponibilidade física e digital, reservem exemplares físicos e organizem sua biblioteca pessoal.

A visão de longo prazo do produto inclui uma comunidade literária para conectar leitores, compartilhar experiências e acompanhar atividades de outros usuários.

---

# 2. Objetivo da sprint

Entregar, ao final de uma sprint de duas semanas, uma versão funcional do Verso utilizando:

* React;
* Vite;
* PrimeReact;
* API pública de livros;
* `localStorage`;
* Git/GitHub;
* Trello.

O foco do MVP é entregar um **fluxo completo e funcional**, em vez de tentar implementar todas as funcionalidades previstas para a visão futura do produto.

---

# 3. Público principal

### Leitor

Pessoa que deseja:

* descobrir livros;
* consultar informações sobre obras;
* saber se existe exemplar físico disponível;
* acessar conteúdo digital quando disponível;
* organizar sua lista de leitura;
* reservar livros físicos.

---

# 4. Escopo do MVP

## P0 — Essencial

| Funcionalidade                | Prioridade |
| ----------------------------- | ---------- |
| Home                          | P0         |
| Catálogo                      | P0         |
| Pesquisa de livros            | P0         |
| Integração com API            | P0         |
| Detalhes do livro             | P0         |
| Disponibilidade física        | P0         |
| Disponibilidade digital       | P0         |
| Cadastro                      | P0         |
| Login simulado                | P0         |
| Reserva                       | P0         |
| Minhas reservas               | P0         |
| Favoritos                     | P0         |
| Quero ler                     | P0         |
| Já li                         | P0         |
| Perfil                        | P0         |
| Persistência com localStorage | P0         |
| Feedback visual               | P0         |
| Responsividade básica         | P0         |

---

# 5. User Stories

## 5.1 Home

### User Story

> Como visitante, quero conhecer a plataforma e descobrir livros para decidir se quero explorar o catálogo.

### Critérios de pronto

* [ ] Apresentar proposta do Verso.
* [ ] Possuir seção principal/hero.
* [ ] Possuir chamada para o catálogo.
* [ ] Exibir livros em destaque.
* [ ] Possuir navegação.
* [ ] Possuir footer.
* [ ] Funcionar em diferentes tamanhos de tela.

---

## 5.2 Catálogo

### User Story

> Como leitor, quero pesquisar livros para encontrar novas opções de leitura.

### Critérios de pronto

* [ ] Campo de pesquisa disponível.
* [ ] Pesquisa realizada por meio da API.
* [ ] Resultados exibidos em cards.
* [ ] Capa exibida.
* [ ] Título exibido.
* [ ] Autor exibido.
* [ ] Loading implementado.
* [ ] Tratamento de erro implementado.
* [ ] Mensagem para nenhum resultado.
* [ ] Acesso aos detalhes do livro.

---

## 5.3 Detalhes do livro

### User Story

> Como leitor, quero visualizar os detalhes de um livro para decidir se quero lê-lo ou reservá-lo.

### Critérios de pronto

* [ ] Capa.
* [ ] Título.
* [ ] Autor(es).
* [ ] Descrição, quando disponível.
* [ ] Categorias, quando disponíveis.
* [ ] Disponibilidade digital.
* [ ] Formatos digitais disponíveis.
* [ ] Disponibilidade física.
* [ ] Botão de favorito.
* [ ] Botão "Quero ler".
* [ ] Botão "Já li".
* [ ] Botão de reserva quando houver exemplar físico.

---

## 5.4 Disponibilidade física

### User Story

> Como leitor, quero saber se um livro possui exemplar físico disponível para decidir se desejo reservá-lo.

### Critérios de pronto

* [ ] Acervo físico simulado localmente.
* [ ] Livro relacionado pelo ID da API.
* [ ] Informação de disponibilidade.
* [ ] Quantidade simulada.
* [ ] Status visual utilizando PrimeReact.
* [ ] Quantidade atualizada após reserva.

---

## 5.5 Cadastro

### User Story

> Como visitante, quero criar uma conta para utilizar os recursos pessoais da plataforma.

### Critérios de pronto

* [ ] Campo de nome.
* [ ] Campo de email.
* [ ] Campo de senha.
* [ ] Confirmação de senha.
* [ ] Validação de campos obrigatórios.
* [ ] Validação de email.
* [ ] Validação de confirmação de senha.
* [ ] Verificação de email duplicado.
* [ ] Usuário salvo no localStorage.
* [ ] Toast de sucesso/erro.

---

## 5.6 Login

### User Story

> Como usuário cadastrado, quero entrar na minha conta para acessar meus recursos pessoais.

### Critérios de pronto

* [ ] Campo de email.
* [ ] Campo de senha.
* [ ] Validação das credenciais.
* [ ] Mensagem para credenciais inválidas.
* [ ] Usuário atual armazenado.
* [ ] Logout.
* [ ] Interface adaptada ao estado de autenticação.

### Observação

A autenticação será **simulada no front-end**, utilizando `localStorage`.

Não será implementada autenticação real nesta sprint.

---

## 5.7 Reserva

### User Story

> Como usuário autenticado, quero reservar um livro físico disponível para garantir um exemplar.

### Critérios de pronto

* [ ] Botão de reserva para livros disponíveis.
* [ ] Verificação de autenticação.
* [ ] Redirecionamento para login/cadastro quando necessário.
* [ ] Verificação de disponibilidade.
* [ ] Dialog de confirmação.
* [ ] Reserva armazenada no localStorage.
* [ ] Impedimento de reserva duplicada.
* [ ] Atualização da quantidade disponível.
* [ ] Toast de confirmação.

---

## 5.8 Minha Biblioteca

### User Story

> Como leitor, quero organizar meus livros para acompanhar minhas leituras.

### Categorias

```text
❤️ Favoritos
📚 Quero ler
✅ Já li
```

### Critérios de pronto

* [ ] Favoritar livro.
* [ ] Remover favorito.
* [ ] Adicionar à lista "Quero ler".
* [ ] Remover da lista "Quero ler".
* [ ] Marcar como "Já li".
* [ ] Remover da lista.
* [ ] Dados vinculados ao usuário.
* [ ] Dados persistidos após atualizar a página.

---

## 5.9 Perfil

### User Story

> Como usuário, quero visualizar minha biblioteca pessoal para acompanhar minhas leituras.

### Critérios de pronto

* [ ] Nome do usuário.
* [ ] Avatar ou representação visual.
* [ ] Quantidade de livros.
* [ ] Favoritos.
* [ ] Quero ler.
* [ ] Já li.
* [ ] Utilização dos componentes de livro existentes.

---

## 5.10 Minhas Reservas

### User Story

> Como usuário, quero visualizar minhas reservas para acompanhar os livros reservados.

### Critérios de pronto

* [ ] Listar reservas do usuário atual.
* [ ] Exibir livro.
* [ ] Exibir data.
* [ ] Exibir status.
* [ ] Permitir cancelar.
* [ ] Restaurar disponibilidade após cancelamento.
* [ ] Exibir feedback da ação.

---

# 6. Modelo de dados

## Usuários

```js
{
  id: "user-01",
  name: "Nome",
  email: "email@email.com",
  password: "senha"
}
```

## Biblioteca

```js
{
  userId: "user-01",
  bookId: "book-01",
  status: "want-to-read",
  favorite: true
}
```

## Reserva

```js
{
  id: "reservation-01",
  userId: "user-01",
  bookId: "book-01",
  reservedAt: "2026-09-02",
  status: "active"
}
```

---

# 7. Dados externos x dados locais

O projeto terá duas fontes principais de informação.

### API pública

Responsável pelos dados bibliográficos:

```text
Título
Autor
Capa
Descrição
Categorias
Informações digitais
```

### Dados locais

Responsáveis pelo comportamento da plataforma:

```text
Usuários
Usuário atual
Biblioteca pessoal
Reservas
Disponibilidade física
```

Essa separação permite utilizar uma API externa sem depender de backend próprio.

---

# 8. Fluxo principal

```text
                    HOME
                      │
                      ↓
                  CATÁLOGO
                      │
                      ↓
                 PESQUISAR
                      │
                      ↓
              DETALHES DO LIVRO
                      │
             ┌────────┴────────┐
             ↓                 ↓
          DIGITAL            FÍSICO
             │                 │
             ↓                 ↓
      Ler/Download          Reservar
                               │
                               ↓
                         Está logado?
                         /          \
                       NÃO          SIM
                        │            │
                        ↓            ↓
                   Login/Cadastro  Confirmar
                                     │
                                     ↓
                              Minhas Reservas
```

### Fluxo da biblioteca

```text
Catálogo
   ↓
Livro
   ↓
Favoritar / Quero ler / Já li
   ↓
Minha Biblioteca
   ↓
Perfil
```

---

# 9. PrimeReact

O MVP deve utilizar diferentes componentes do PrimeReact de forma adequada às necessidades da aplicação.

### Componentes previstos

| Necessidade | PrimeReact                 |
| ----------- | -------------------------- |
| Navegação   | Menubar                    |
| Pesquisa    | InputText                  |
| Senha       | Password                   |
| Livro       | Card                       |
| Status      | Tag                        |
| Detalhes    | Dialog                     |
| Confirmação | ConfirmDialog              |
| Feedback    | Toast                      |
| Perfil      | Avatar                     |
| Listagem    | DataView                   |
| Abas        | Tabs                       |
| Loading     | ProgressSpinner / Skeleton |
| Ações       | Button                     |

---

# 10. Funcionalidades desejáveis

Estas funcionalidades ficam no backlog e só serão desenvolvidas se o MVP estiver concluído.

## Comunidade

### Feed

> Como usuário, quero visualizar publicações de outros leitores para acompanhar a comunidade.

### Criar publicação

> Como usuário, quero compartilhar minhas experiências de leitura.

### Curtir

> Como usuário, quero curtir publicações de outros leitores.

### Comentar

> Como usuário, quero comentar publicações para participar das discussões.

### Seguir

> Como usuário, quero seguir outros leitores para acompanhar suas atividades.

### Perfil público

> Como usuário, quero visualizar o perfil de outros leitores.

---

# 11. Fora do escopo da sprint

Não serão implementados nesta sprint:

* Backend próprio.
* Banco de dados.
* API própria.
* Autenticação real.
* Google OAuth real.
* Recuperação de senha.
* Sistema real de empréstimos.
* Pagamentos.
* Segurança de dados de produção.

---

# 12. Definition of Done

Um card somente poderá ser movido para **Concluído** quando:

* [ ] Implementação finalizada.
* [ ] Funcionalidade testada.
* [ ] Sem erros no console.
* [ ] Branch própria utilizada.
* [ ] Commit realizado com mensagem clara.
* [ ] Pull Request aberto.
* [ ] Outro integrante realizou code review.
* [ ] Ajustes solicitados foram realizados.
* [ ] PR aprovado.
* [ ] Merge realizado na `main`.
* [ ] Card atualizado no Trello.

---

# 13. Critério de sucesso

O MVP será considerado funcional quando o usuário conseguir executar o seguinte fluxo sem erros:

```text
Acessar Home
     ↓
Explorar catálogo
     ↓
Pesquisar livro
     ↓
Visualizar detalhes
     ↓
Consultar disponibilidade
     ↓
Criar conta
     ↓
Fazer login
     ↓
Adicionar livro à biblioteca
     ↓
Reservar livro físico disponível
     ↓
Visualizar reserva
     ↓
Acessar perfil
     ↓
Visualizar biblioteca pessoal
```

---

# 14. Priorização

## 🔴 P0 — Obrigatório

Tudo que está definido na seção **Escopo do MVP**.

## 🟡 P1 — Se houver tempo

* Feed.
* Criar publicação.
* Curtidas.
* Comentários.
* Perfil público.
* Seguir usuários.

## 🟢 P2 — Futuro

* Google OAuth.
* Backend.
* Banco de dados.
* Autenticação real.
* Estatísticas.
* Avaliações.
* Recursos avançados da comunidade.

---

# 15. Regra de escopo

> **Primeiro entregar o MVP funcionando. Depois melhorar a interface. Só então adicionar funcionalidades desejáveis.**

Caso surjam novos requisitos durante a sprint, eles deverão ser adicionados ao Backlog e avaliados pela equipe antes de entrarem na sprint atual.

O objetivo é evitar que novas funcionalidades comprometam a entrega das funcionalidades essenciais.
