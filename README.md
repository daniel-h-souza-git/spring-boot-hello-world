# spring-boot-hello-world

API REST mínima em **Java 19**, **Spring Boot 3.5** e **Maven**. Disponibiliza um endpoint HTTP que responde com a mensagem `Hello, World!`.

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

```bash
curl http://localhost:8080/hello
```

No PowerShell do Windows, também é possível chamar explicitamente o executável:

```powershell
curl.exe http://localhost:8080/hello
```

**Resposta:** HTTP 200, `Content-Type: text/plain`, com o corpo:

```text
Hello, World!
```

## Chamar com Bruno

A pasta [`bruno/`](bruno/) contém uma coleção com a requisição **Hello World**.

1. Abra o [Bruno](https://www.usebruno.com/).
2. Selecione **Open Collection** e escolha a pasta `bruno/` deste projeto.
3. Selecione o ambiente **Local**.
4. Abra a requisição **Hello World** e clique em **Send**.

A requisição faz `GET {{baseUrl}}/hello`, em que `baseUrl` vale `http://localhost:8080` no ambiente Local. Inclui duas verificações simples de resposta no Bruno (status HTTP 200 e corpo esperado).

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

## Estrutura

```text
spring-boot-hello-world/
├── .gitignore
├── README.md
├── pom.xml
├── src/main/java/com/example/helloworld/
│   ├── HelloWorldApplication.java
│   └── HelloController.java
├── src/main/resources/
│   └── application.properties
└── bruno/
    ├── bruno.json
    ├── Hello World.bru
    └── environments/
        └── Local.bru
```
