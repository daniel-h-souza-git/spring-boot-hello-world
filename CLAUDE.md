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

`frontend/` is a separate React 19 + Vite app (`npm run dev` / `npm test` / `npm run build` from that folder). It calls the API through the Vite proxy in `frontend/vite.config.js` (no CORS config in the backend) and reads responses with `response.text()` because the API returns `text/plain`.

## Adding or changing an endpoint

Endpoints are mirrored in three places, so update all of them together:

1. `HelloController.java` — the handler.
2. `bruno/<Name>.bru` — a Bruno request using `{{baseUrl}}` (defined in `bruno/environments/Local.bru`), with `seq` incremented and tests asserting status 200 and the exact body.
3. `README.md` — the cURL example, the Bruno description and the "Estrutura" tree.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- When graphify-out/graph.json exists, run `graphify query "<question>"` before your first grep, search or source-file read for a codebase question, and put this rule in every subagent prompt that explores code. Read raw files only for lines the graph or an earlier read already located. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- A committed graphify-out/graph.json is rewritten whole on every build, so a large diff to it in a pull request is expected. Do not flag it as churn or suggest skipping the graph rebuild or its hooks.
