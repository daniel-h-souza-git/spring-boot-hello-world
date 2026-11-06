# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Minimal Spring Boot 3.5 REST API (Maven, `spring-boot-starter-web` only — no database, security or other starters). The README and project descriptions are in Portuguese; keep new user-facing docs and Bruno test names consistent with that.

## Commands

Run from the repository root:

```bash
mvn spring-boot:run          # start the API on http://localhost:8080
mvn clean package            # build target/spring-boot-hello-world-0.0.1-SNAPSHOT.jar
java -jar target/spring-boot-hello-world-0.0.1-SNAPSHOT.jar
```

- There is no Maven wrapper (`mvnw`); a system Maven 3.6.3+ is required.
- `pom.xml` sets `java.version` to **19** (intentionally, though past end of support). Building with an older JDK (e.g. 17) will fail.
- There are currently no tests (`src/test` does not exist), and no lint configuration.
- Port is set in `src/main/resources/application.properties` (`server.port=8080`); override with `--server.port=...` to avoid conflicts.

## Architecture

Single package `com.example.helloworld`:

- `HelloWorldApplication` — Spring Boot entry point.
- `HelloController` — `@RestController` with `GET /hello/{lang}` (uses `message.HelloMessageFactory`; `lang` = en|pt|es, else 400) and `GET /hello2`, each returning `text/plain`.

## Adding or changing an endpoint

Endpoints are mirrored in three places, so update all of them together:

1. `HelloController.java` — the handler.
2. `bruno/<Name>.bru` — a Bruno request using `{{baseUrl}}` (defined in `bruno/environments/Local.bru`), with `seq` incremented and tests asserting status 200 and the exact body.
3. `README.md` — the cURL example, the Bruno description and the "Estrutura" tree.
