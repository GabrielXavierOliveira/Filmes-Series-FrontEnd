# Simulador de Votos para Mídias (Frontend)

Este é o frontend da aplicação de um simulador de votos para filmes e séries, desenvolvido em **React** e **Bootstrap**. A aplicação se conecta ao backend para autenticar usuários, listar mídias, e registrar votos.

## Configuração do Projeto

### Pré-requisitos

  - Node.js (versão 14 ou superior)
  - O backend da aplicação deve estar rodando e configurado no axios (`src/services/api.js`).

### Instalação

1.  Clone este repositório:

    ```bash
    git clone https://github.com/GabrielXavierOliveira/Filmes-Series-FrontEnd.git
    cd Filmes-Series-FrontEnd
    ```

2.  Instale as dependências:

    ```bash
    npm install
    ```

## Inicialização

Para iniciar o servidor de desenvolvimento do frontend, execute o seguinte comando:

```bash
npm start
```

O aplicativo estará disponível em `http://localhost:3000`.

## Funcionalidades Principais

  - **Autenticação**:
      - Página de Login para usuários existentes.
      - Página de Registro para novos usuários.
  - **Lista de Mídias**:
      - Exibe uma lista de filmes e séries com seus respectivos votos.
      - Mostra a contagem geral de votos positivos e negativos.
  - **Votação**:
      - Detalhes de cada mídia podem ser acessados clicando em seu card.
      - Na página de detalhes, os usuários logados podem votar positivamente (👍) ou negativamente (👎).
      - O voto do usuário é exibido visualmente, e a contagem de votos é atualizada em tempo real.
  - **Gerenciamento de Mídias**:
      - Uma página dedicada para registrar novas mídias no sistema, permitindo o cadastro de título, descrição, URL da imagem e seleção de gêneros.