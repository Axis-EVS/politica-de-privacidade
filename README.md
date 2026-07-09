# Guesbay — Política de Privacidade (Hospedagem GitHub Pages)

Este repositório contém a página estática oficial da **Política de Privacidade** do aplicativo **Guesbay**, estruturada e estilizada em conformidade jurídica com a **Lei Geral de Proteção de Dados (LGPD)** brasileira e com foro eleito em **São José dos Campos - SP**.

O projeto foi organizado de forma estática pura (HTML5/CSS3/JS) para permitir a hospedagem gratuita e imediata no **GitHub Pages**.

---

## 📁 Estrutura de Arquivos

```
guesbay-politica-pages/
├── index.html        # Página principal e única (HTML/CSS/JS embutidos)
├── .gitignore        # Configurações de exclusão de arquivos de sistema e IDEs
└── README.md         # Documentação explicativa do repositório (este arquivo)
```

> **Nota de Performance e Portabilidade:** O CSS (design system, modo escuro, animações) e o JavaScript (controle de tema e navegação) estão inline/internos dentro do `index.html`. Isso garante que o documento não sofra quebras de links relativos independentemente da URL ou subpasta do subdomínio do GitHub Pages.

---

## 🚀 Como Hospedar Grátis no GitHub Pages

Siga o passo a passo abaixo para colocar o seu site no ar:

### Passo 1: Criar um Repositório no GitHub
1. Acesse sua conta no [GitHub](https://github.com).
2. Clique no botão **New** (Novo repositório).
3. Dê um nome ao repositório, por exemplo: `guesbay-politica` ou `politica-privacidade`.
4. Deixe o repositório como **Public** (Público) — requisito para o GitHub Pages gratuito.
5. **Não** marque a opção de inicializar com README, `.gitignore` ou licença (já criamos esses arquivos para você).
6. Clique em **Create repository** (Criar repositório).

### Passo 2: Inicializar o Git Localmente e Fazer o Push
Abra o seu terminal (Prompt de Comando, PowerShell ou Git Bash) na pasta **deste projeto** (`guesbay-politica-pages`) e execute os comandos:

```bash
# 1. Inicializar o repositório Git local
git init

# 2. Adicionar todos os arquivos da pasta
git add .

# 3. Criar o primeiro commit
git commit -m "feat: estrutura inicial da politica de privacidade"

# 4. Definir a branch principal como main
git branch -M main

# 5. Conectar com o repositório do GitHub (Substitua pela URL gerada no seu GitHub)
git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git

# 6. Enviar os arquivos para o GitHub
git push -u origin main
```

### Passo 3: Ativar o GitHub Pages
1. Acesse o seu repositório no site do GitHub.
2. Vá na aba ⚙️ **Settings** (Configurações) no menu superior.
3. No menu lateral esquerdo, clique em **Pages** (dentro da seção *Code and automation*).
4. Em **Build and deployment**, na opção **Source**, selecione **Deploy from a branch**.
5. Em **Branch**, selecione `main` e a pasta `/ (root)` e clique em **Save** (Salvar).
6. Aguarde cerca de 1 a 2 minutos. Atualize a página e o link oficial do seu site aparecerá no topo da seção (ex: `https://seu-usuario.github.io/nome-do-repositorio/`).

---

## ⚙️ Customização do URL no Aplicativo

Assim que seu site do GitHub Pages estiver ativo, copie o link público gerado e configure-o no arquivo de rotas ou no seu link de referência no aplicativo principal Guesbay.
