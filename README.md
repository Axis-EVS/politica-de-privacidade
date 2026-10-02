# Guesbay — Site Oficial de Política de Privacidade & Termos de Uso (GitHub Pages)

Esta pasta contém o site estático oficial, autônomo e de alta performance com a **Política de Privacidade** e os **Termos de Uso** do aplicativo **Guesbay**, pronto para ser publicado no **GitHub Pages** e vinculado à **Google Play Console** e à **Apple App Store**.

---

## 🌟 Recursos Deste Site

1. **Totalmente Autônomo e Estático**:
   - Zero conexões com banco de dados ou APIs sensíveis (atende à exigência estrita de independência técnica).
   - Funciona imediatamente em qualquer servidor estático ou no GitHub Pages gratuito.
2. **Suporte Completo a 4 Idiomas (PT, EN, ES, VI)**:
   - 🇧🇷 **Português**: Conforme LGPD (Lei nº 13.709/2018), Marco Civil da Internet (Lei nº 12.965/2014) e Resoluções ANPD nº 18/2024 e 19/2024.
   - 🇺🇸 **English**: Conforme Google Play Data Safety, Apple App Store Guidelines e GDPR.
   - 🇪🇸 **Español**: Para mercados hispano-americanos.
   - 🇻🇳 **Tiếng Việt**: Para o mercado vietnamita.
3. **Alternância Instantânea entre Documentos**:
   - 🛡️ **Política de Privacidade** (Aba padrão para atender diretamente à Google Play Store).
   - 📜 **Termos de Uso** (Regras de licença, Lei de Direitos Autorais nº 9.610/1998 e Notice & Takedown do Art. 19 do Marco Civil).
4. **Índice Interativo (Table of Contents)** e **Busca em Tempo Real**:
   - Permite a qualquer usuário, advogado ou auditor do Google/Apple encontrar qualquer cláusula em milissegundos.
5. **Estilo para Impressão e PDF (@media print)**:
   - Permite que qualquer pessoa clique em "Imprimir / PDF" e gere uma via física ou documento em PDF limpo, formal e preto e branco.
6. **Arquivo `.nojekyll` Incluído**:
   - Evita que o GitHub Pages tente processar arquivos como Jekyll, garantindo carregamento ultrarrápido dos assets.

---

## 🚀 Como Criar e Publicar no GitHub Pages (Passo a Passo)

### Passo 1: Criar um Repositório Público no GitHub
1. Acesse o seu GitHub ([https://github.com](https://github.com)) e faça login.
2. Clique no botão verde **"New"** (ou acesse [https://github.com/new](https://github.com/new)).
3. Preencha os campos:
   - **Repository name**: escolha um nome amigável, por exemplo: `guesbay-privacidade` ou `politica-privacidade-guesbay`.
   - **Description**: `Política de Privacidade e Termos de Uso Oficiais do Guesbay`.
   - **Public / Private**: Marque obrigatoriamente **Public** (a Google Play Store exige que a página seja acessível publicamente na internet).
   - **Add a README file**: deixe desmarcado (você já usará os arquivos desta pasta).
4. Clique em **Create repository**.

---

### Passo 2: Fazer o Upload dos Arquivos

#### Opção A (Direto pelo Navegador no GitHub - Mais Fácil):
1. Na página do repositório recém-criado, clique em **"uploading an existing file"**.
2. Abra no seu computador a pasta:  
   `f:\Documentos\app\politicas de privacidade`
3. Arraste e solte **todos os arquivos e pastas** para dentro da janela do navegador:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `legal_data.js`
   - `.nojekyll`
   - Pasta `assets/` (com o logo e os ícones)
4. Em "Commit changes", digite uma mensagem (ex: `Versão inicial da política de privacidade`) e clique no botão verde **Commit changes**.

#### Opção B (Via Terminal Git):
Se você preferir usar o terminal dentro da pasta `politicas de privacidade`:
```bash
cd "f:\Documentos\app\politicas de privacidade"
git init
git add .
git commit -m "Publicação da Política de Privacidade e Termos de Uso Guesbay 2026.1"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/guesbay-privacidade.git
git push -u origin main
```
*(Substitua `SEU_USUARIO` pelo seu usuário real do GitHub)*.

---

### Passo 3: Ativar o GitHub Pages em 1 Minuto
1. No seu repositório no GitHub, clique na aba **Settings** (Configurações, na parte superior).
2. No menu lateral esquerdo, clique em **Pages** (dentro da seção "Code and automation").
3. Em **Build and deployment**:
   - **Source**: selecione **Deploy from a branch**.
   - **Branch**: selecione a branch **main** (ou master) e a pasta **/ (root)**.
   - Clique em **Save**.
4. Aguarde cerca de 1 a 2 minutos e recarregue a página. O GitHub exibirá uma tarja verde com a sua URL pública:
   > **"Your site is live at https://SEU_USUARIO.github.io/guesbay-privacidade/"**

---

### Passo 4: Como Configurar na Google Play Console

1. Acesse a sua conta na **[Google Play Console](https://play.google.com/console)**.
2. Selecione o aplicativo **Guesbay**.
3. No menu lateral esquerdo, role até **Política e programas** e clique em **Conteúdo do app**.
4. Localize o card **Política de privacidade** e clique em **Iniciar** (ou **Gerenciar**).
5. No campo **URL da política de privacidade**, cole a URL gerada pelo GitHub Pages:  
   `https://SEU_USUARIO.github.io/guesbay-privacidade/`
6. Clique em **Salvar**.
7. Na seção **Segurança dos dados (Data Safety)**:
   - Marque que o app coleta Nome e E-mail para gerenciamento da conta e do aplicativo.
   - Marque que **não há compartilhamento com terceiros nem corretores de dados**.
   - Declare que os dados são criptografados em trânsito (HTTPS).
   - Declare que o app oferece mecanismo de exclusão de conta e dados.

---

### Passo 5: Como Configurar na Apple App Store (Se for publicar no iOS)

1. Acesse o **[App Store Connect](https://appstoreconnect.apple.com/)**.
2. Selecione o app **Guesbay** > **Informações do App**.
3. No campo **URL da Política de Privacidade**, cole:  
   `https://SEU_USUARIO.github.io/guesbay-privacidade/`
4. Em **Privacidade do App (App Privacy)**, declare as práticas de privacidade (coleta para funcionalidade da conta sem rastreamento de terceiros).

---

## 📁 Estrutura de Arquivos Desta Pasta

- `index.html`: Documento HTML5 responsivo com SEO, OpenGraph e pré-renderização em português.
- `styles.css`: Estilização Obsidian Dark com realces em Verde Esmeralda, cards glassmorphism e folha de estilos limpa para impressão (`@media print`).
- `script.js`: Lógica para alternância dinâmica de idiomas (PT, EN, ES, VI), alternância de abas, busca ao vivo de cláusulas e cópia de links.
- `legal_data.js`: Base de dados dos textos legais completos nos 4 idiomas.
- `.nojekyll`: Garante que o GitHub Pages sirva os arquivos estáticos de forma direta e sem bloqueios.
- `assets/`: Logotipos oficiais da marca Guesbay e ícones do aplicativo.
- `README.md`: Este manual completo de instruções.
