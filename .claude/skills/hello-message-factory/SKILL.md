---
name: hello-message-factory
description: Cria uma fábrica simples (Simple Factory) de mensagens "Hello, World" em diferentes idiomas. Use quando o usuário pedir uma fábrica, factory ou novo idioma de mensagem hello world neste projeto Spring Boot.
---

# Hello Message Factory (Simple Factory)

Uma única classe fábrica com um método estático que recebe o idioma e devolve a mensagem.

## Código

Pacote: `com.example.helloworld.message` (`src/main/java/com/example/helloworld/message/`).

`Language.java`:

```java
public enum Language {
    EN, PT, ES
}
```

`HelloMessage.java` (produto):

```java
public interface HelloMessage {
    String getText();
}
```

`HelloMessageFactory.java`:

```java
public class HelloMessageFactory {

    private HelloMessageFactory() {
    }

    public static HelloMessage create(Language language) {
        return switch (language) {
            case EN -> () -> "Hello, World!";
            case PT -> () -> "Olá, Mundo!";
            case ES -> () -> "¡Hola, Mundo!";
        };
    }
}
```

Uso:

```java
String text = HelloMessageFactory.create(Language.PT).getText(); // "Olá, Mundo!"
```

## Passo a passo

1. Leia `HelloController.java` e crie os três arquivos acima.
2. Use a fábrica no controller sem mudar as respostas atuais (`/hello` → `Hello, World!`, `/hello2` → `Hello, World 2!`).
3. Só crie endpoint novo (ex.: `/hello/{lang}`) se o usuário pedir; nesse caso siga a regra de três lugares do `CLAUDE.md` (controller, `bruno/<Nome>.bru`, `README.md`).
4. Para um novo idioma: adicione o valor no enum `Language` e um `case` no `switch` (o compilador avisa se esquecer).

## Regras

- Mantenha simples: sem classes por idioma, sem Creator abstrato, sem Spring beans.
- Sem novas dependências no `pom.xml`.
- Código em inglês; documentação ao usuário em português.
