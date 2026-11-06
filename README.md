# spring-boot-hello-world

API REST mínima em **Java 19**, **Spring Boot 3.5** e **Maven**. Disponibiliza o endpoint `/hello/{lang}`, que responde com a mensagem *Hello, World* no idioma escolhido, e o endpoint `/hello2`, que não depende de idioma.

## Requisitos

- JDK 19 (confirme com `java -version`)
- Apache Maven 3.6.3+ (confirme com `mvn -version`)

> **Nota:** Java 19 já chegou ao fim do suporte oficial. Ele foi usado aqui conforme solicitado; para projetos novos de produção, prefira uma versão Java LTS.

## Executar

Na pasta raiz do projeto:

```bash
mvn spring-boot:run
```

A API estará disponível em `http://localhost:8080`.

## Chamar com cURL

O endpoint `GET /hello/{lang}` recebe o idioma na URL (`en`, `pt` ou `es`, sem diferenciar maiúsculas de minúsculas) e usa a `HelloMessageFactory` para montar a mensagem.

```bash
# Inglês
curl http://localhost:8080/hello/en
# Hello, World!

# Português
curl http://localhost:8080/hello/pt
# Olá, Mundo!

# Espanhol
curl http://localhost:8080/hello/es
# ¡Hola, Mundo!
```

No PowerShell do Windows, também é possível chamar explicitamente o executável:

```powershell
curl.exe http://localhost:8080/hello/pt
```

**Resposta:** HTTP 200, `Content-Type: text/plain;charset=UTF-8`, com a mensagem do idioma. Um idioma não suportado (ex.: `/hello/fr`) retorna HTTP 400.

O endpoint `/hello2` não usa a factory nem recebe idioma; responde sempre com `Hello, World 2!`:

```bash
curl http://localhost:8080/hello2
```

## Chamar com Bruno

A pasta [`bruno/`](bruno/) contém uma coleção com as requisições **Hello World EN**, **Hello World PT**, **Hello World ES** (uma por idioma) e **Hello World 2**.

1. Abra o [Bruno](https://www.usebruno.com/).
2. Selecione **Open Collection** e escolha a pasta `bruno/` deste projeto.
3. Selecione o ambiente **Local**.
4. Abra a requisição **Hello World PT** (por exemplo) e clique em **Send**.

A requisição faz `GET {{baseUrl}}/hello/pt`, em que `baseUrl` vale `http://localhost:8080` no ambiente Local. Inclui duas verificações simples de resposta no Bruno (status HTTP 200 e corpo esperado).

## Frontend web (React)

A pasta [`frontend/`](frontend/) contém uma página em **React 19 + Vite** que chama `GET /hello/{lang}` e mostra a resposta num painel de aeroporto com letras que viram (*split-flap*). Há botões para `en`, `pt` e `es` e um campo para testar um idioma não suportado (retorna 400, exibido como erro amigável).

### Requisitos

- Node.js 20+ e npm (confirme com `node -v` e `npm -v`)
- A API rodando em `http://localhost:8080`

### Inicializar (desenvolvimento)

Use **dois terminais**.

Terminal 1 — API, na raiz do projeto:

```bash
mvn spring-boot:run
```

Terminal 2 — frontend:

```bash
cd frontend
npm install        # só na primeira vez
npm run dev
```

Abra `http://localhost:5173`. O Vite repassa as chamadas `/hello/...` para a API em `localhost:8080` (proxy em `frontend/vite.config.js`), então **não é necessário configurar CORS** no backend.

### Testar

Testes automatizados (Vitest, validam a chamada à API e as mensagens de erro):

```bash
cd frontend
npm test
```

Teste manual no navegador, com a API e o `npm run dev` ativos:

1. Clique em **English**, **Português** e **Español**: o painel deve exibir `HELLO, WORLD!`, `OLÁ, MUNDO!` e `¡HOLA, MUNDO!`.
2. Digite `fr` em **Outro idioma** e clique em **Buscar mensagem**: o painel mostra `ERRO 400` e aparece o aviso de idioma não suportado.
3. Pare a API (`Ctrl+C` no terminal 1) e clique em um idioma: o painel mostra `SEM CONEXÃO` com a orientação para iniciar a API.

### Build de produção

```bash
cd frontend
npm run build      # gera frontend/dist
npm run preview    # serve o build em http://localhost:4173 (com o mesmo proxy para a API)
```

> **Nota:** o `dist/` é só estático. Para publicá-lo fora do `npm run preview`, sirva-o atrás de um servidor que repasse `/hello` para a API (ou configure CORS no Spring Boot).

## Gerar o JAR

```bash
mvn clean package
java -jar target/spring-boot-hello-world-0.0.1-SNAPSHOT.jar
```

## Publicar no GitHub

Crie no GitHub um **repositório vazio** chamado `spring-boot-hello-world` (sem inicializar com README). Depois, na raiz do projeto:

```bash
git init
git add .
git commit -m "Initial commit: Hello World REST API"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/spring-boot-hello-world.git
git push -u origin main
```

Substitua `SEU-USUARIO` pelo seu usuário do GitHub.

## Logs

Os logs (Logback) saem no console e no arquivo `./logs/spring-boot-hello-world.log` (rotação diária/10MB, 14 dias). Cada requisição gera `--> METHOD URI` na entrada e `<-- METHOD URI status=... (N ms)` na saída; respostas 4xx saem como `WARN` e 5xx como `ERROR`. Configuração em `src/main/resources/logback-spring.xml`.

## Estrutura

```text
spring-boot-hello-world/
├── .gitignore
├── README.md
├── pom.xml
├── src/main/java/com/example/helloworld/
│   ├── HelloWorldApplication.java
│   ├── HelloController.java
│   ├── RequestLoggingFilter.java
│   └── message/
│       ├── Language.java
│       ├── HelloMessage.java
│       └── HelloMessageFactory.java
├── src/main/resources/
│   ├── application.properties
│   └── logback-spring.xml
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── FlapBoard.jsx
│   │   ├── api.js
│   │   └── styles.css
│   └── tests/
│       └── api.test.js
└── bruno/
    ├── bruno.json
    ├── Hello World.bru
    ├── Hello World PT.bru
    ├── Hello World ES.bru
    ├── Hello World 2.bru
    └── environments/
        └── Local.bru
```
