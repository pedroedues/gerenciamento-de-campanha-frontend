# Projeto de Cadastro de Campanhas

Este projeto consiste em uma aplicação web para o cadastro e gerenciamento de campanhas. Os usuários podem cadastrar campanhas, visualizar os últimos itens criados, e realizar o redirecionamento de campanhas. A aplicação utiliza HTML, CSS e JavaScript para a construção da interface do usuário, interatividade e manipulação do DOM.

## Estrutura do Projeto

- **HTML (`index.html`):** O arquivo HTML define a estrutura da página web, incluindo formulários, tabelas e seções para cadastro e redirecionamento de campanhas.

- **CSS (`styles.css`):** O arquivo CSS estiliza a página, proporcionando um layout atraente e responsivo. Ele utiliza seletores para estilizar elementos específicos, como formulários, tabelas e botões.

- **JavaScript (`script.js`):** O arquivo JavaScript adiciona funcionalidades dinâmicas à página. Ele gerencia eventos do usuário, realiza requisições assíncronas para um servidor de API de campanhas, manipula o DOM para atualizar a interface com o usuário e armazena dados localmente no cache.

## Funcionalidades Principais

1. **Cadastro de Campanhas:**
   - O formulário de cadastro permite aos usuários inserirem o número máximo de cliques e uma lista de links.
   - Ao clicar em "Cadastrar Campanha", os dados são enviados para o servidor através de uma requisição POST, e a tabela de itens criados é atualizada.

2. **Visualização de Campanhas Criadas:**
   - Os últimos itens criados são exibidos em uma tabela, mostrando o ID e o link de acesso.

3. **Redirecionamento de Campanhas:**
   - Os usuários podem selecionar uma campanha no dropdown e visualizar detalhes, incluindo os links e cliques recebidos.
   - Ao clicar em "Acessar Campanha," é enviado um pedido ao servidor para redirecionar a campanha.

## Armazenamento Local
- Utilização do `localStorage` para armazenar dados em cache, permitindo uma experiência mais rápida ao carregar campanhas previamente acessadas.

## Como Usar
[Acesse clicando aqui](https://pedroedues.github.io/gerenciamento-de-campanha-frontend/)

## Link do Funcionamento
[Acesse clicando aqui](https://drive.google.com/file/d/1hRzCnrvT_r69a3wvyD-knOXKn4R9gjsU/view?usp=sharing)
