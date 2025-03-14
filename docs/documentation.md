# Documentação do Projeto: Controle de Compras no Cartão de Crédito

## 1. Visão Geral do Projeto
O objetivo deste projeto é criar uma aplicação web que ajude o responsável pelo cartão de crédito a gerenciar as compras feitas, calculando automaticamente os valores devidos por cada responsável e organizando as compras de acordo com o período de fatura.

## 2. Requisitos Funcionais

### 2.1. Cadastro de Compras
**Descrição:** O usuário poderá registrar compras feitas no cartão de crédito.

**Campos necessários:**
- Valor da compra
- Data da compra
- Descrição da compra
- Responsável pela compra (quem fez a compra)
- Status da compra (ex: Paga, Pendente)
- Quantidade de parcelas (se for parcelado)

### 2.2. Visualização de Compras
**Descrição:** O usuário poderá visualizar todas as compras registradas no banco de dados.

**Funcionalidades:**
- Exibição das compras por mês (filtrando pela data de vencimento ou período de fatura).
- Exibição de compras filtradas por responsável.
- Exibição dos cálculos de valores devidos por cada responsável.

### 2.3. Controle de Parcelas
**Descrição:** A aplicação permitirá que compras parceladas sejam divididas em parcelas mensais.

**Funcionalidades:**
- Calcular e salvar o valor de cada parcela.
- Exibir as parcelas divididas por mês, com o valor devido a cada responsável.

### 2.4. Relatórios e Gráficos
**Descrição:** Exibição de gráficos de valores por responsável.

**Funcionalidades:**
- Gráficos de barras ou pizza, mostrando a distribuição dos valores das compras entre os responsáveis.

### 2.5. Autenticação de Usuários
**Descrição:** O acesso à aplicação será restrito a usuários autenticados.

**Funcionalidades:**
- Login e logout.
- Criação de usuários com autenticação segura (senha criptografada).
- Permitir que o responsável pelo cartão acesse os dados de compras.

### 2.6. Segurança
**Descrição:** Garantir a segurança dos dados pessoais e financeiros dos usuários.

**Funcionalidades:**
- Criptografar senhas de usuários.
- Validar entradas para evitar ataques de injeção SQL.

## 3. Requisitos Não Funcionais

### 3.1. Usabilidade
- A interface será minimalista e funcional, com foco na experiência do usuário, especialmente no celular.
- O design será responsivo, garantindo uma boa visualização tanto em dispositivos móveis quanto em desktops.

### 3.2. Performance
- A aplicação será otimizada para carregar rapidamente e realizar as operações de cadastro e consulta de forma eficiente.

### 3.3. Acessibilidade
- A interface será simples e intuitiva para garantir fácil navegação, mesmo para usuários com pouca experiência.

## 4. Tecnologias Utilizadas

- **Frontend:** Next.js, para construção da interface do usuário.
- **Backend:** Next.js Server Actions (usando Prisma para integração com o banco de dados).
- **Banco de Dados:** PostgreSQL, com Prisma para migrações e consultas.
- **Autenticação:** NextAuth ou outra ferramenta de autenticação para gerenciar login e segurança de usuários.
- **Gráficos:** Chart.js ou Recharts para gerar gráficos de valores por responsável.
- **Deploy:** Vercel ou Netlify, para hospedar a aplicação.

## 5. Planejamento de Desenvolvimento

### **Semana 1: Configuração Inicial e Cadastro de Compras**
- **Configuração do Projeto Next.js**
  - Criar o repositório e configurar o projeto com Next.js.
  - Configurar o Prisma e conectar ao banco de dados PostgreSQL.
  - Criar as primeiras migrações para as tabelas principais (compras, usuários).
- **Autenticação de Usuários**
  - Implementar a autenticação de usuários com NextAuth.
  - Garantir que a senha seja criptografada.
- **Cadastro de Compras**
  - Criar a interface de cadastro de compras.
  - Implementar a lógica de inserção de dados (valor, data, descrição, responsável, parcelas) utilizando Server Actions.

### **Semana 2: Visualização de Compras e Controle de Parcelas**
- **Visualização de Compras**
  - Criar uma página para listar as compras registradas.
  - Adicionar filtros para exibição por mês e responsável.
  - Implementar a lógica para calcular os valores devidos por cada responsável.
- **Controle de Parcelas**
  - Implementar a lógica de divisão das compras parceladas.
  - Exibir as parcelas de cada compra no mês correspondente.

### **Semana 3: Relatórios, Gráficos e Melhorias Visuais**
- **Relatórios e Gráficos**
  - Implementar gráficos de barras ou pizza mostrando os valores de compras por responsável.
- **Design e Responsividade**
  - Melhorar a interface com design minimalista.
  - Garantir que a interface seja responsiva e fácil de usar no celular.
- **Testes**
  - Realizar testes básicos para garantir que os cálculos de parcelas e valores devidos estão corretos.

### **Semana 4: Deployment e Ajustes Finais**
- **Deploy**
  - Fazer o deploy da aplicação em Vercel ou Netlify.
- **Ajustes de Segurança**
  - Revisar e reforçar as medidas de segurança, como a criptografia de dados sensíveis e validações de entrada.
- **Documentação e Feedback**
  - Finalizar a documentação da aplicação e realizar uma revisão final com base no feedback dos usuários.

## 6. Possíveis Funcionalidades Futuras

- **Suporte offline (PWA):** Possibilidade de converter a aplicação em um PWA no futuro, permitindo o uso offline.
- **Integração com APIs bancárias:** Futuramente, pode-se integrar a aplicação com APIs bancárias para importar automaticamente as compras.
- **Notificações:** Implementação de lembretes de vencimento de parcelas ou outras notificações úteis.

Esta documentação proporciona uma visão clara sobre o desenvolvimento da aplicação e a estrutura do projeto. Agora, você tem uma base sólida para começar a trabalhar no código, e também para comunicar sua visão a outros membros da equipe (caso haja algum).