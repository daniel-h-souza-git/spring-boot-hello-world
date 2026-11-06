# Graph Report - spring-boot-hello-world  (2026-11-06)

## Corpus Check
- 18 files · ~2,757 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: .bru 5, (none) 2, .css 1)

## Summary
- 79 nodes · 124 edges · 10 communities (6 shown, 4 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.77)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `965d9a81`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Docs e Regra dos Três Lugares
- Skill Factory e Idiomas
- Mensagem e Mapeamento
- Aplicação Spring Boot
- Maven POM
- App.jsx
- package.json
- Skill hello-message-factory
- scripts

## God Nodes (most connected - your core abstractions)
1. `HelloController` - 8 edges
2. `App()` - 7 edges
3. `HelloMessageFactory` - 7 edges
4. `Language` - 7 edges
5. `Skill hello-message-factory` - 7 edges
6. `fetchHello()` - 6 edges
7. `scripts` - 5 edges
8. `react` - 5 edges
9. `ApiError` - 5 edges
10. `describeError()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Endpoint GET /hello/{lang}` --uses--> `HelloMessageFactory`  [EXTRACTED]
  README.md → src/main/java/com/example/helloworld/message/HelloMessageFactory.java
- `Simple Factory pattern` --implemented_by--> `HelloMessageFactory`  [EXTRACTED]
  .claude/skills/hello-message-factory/SKILL.md → src/main/java/com/example/helloworld/message/HelloMessageFactory.java
- `Skill hello-message-factory` --documents--> `Language`  [EXTRACTED]
  .claude/skills/hello-message-factory/SKILL.md → src/main/java/com/example/helloworld/message/Language.java
- `Skill hello-message-factory` --documents--> `HelloMessage`  [EXTRACTED]
  .claude/skills/hello-message-factory/SKILL.md → src/main/java/com/example/helloworld/message/HelloMessage.java
- `CLAUDE.md (instruções do projeto)` --describes--> `HelloWorldApplication`  [EXTRACTED]
  CLAUDE.md → src/main/java/com/example/helloworld/HelloWorldApplication.java

## Import Cycles
- None detected.

## Communities (10 total, 4 thin omitted)

### Community 1 - "Docs e Regra dos Três Lugares"
Cohesion: 0.50
Nodes (8): Coleção Bruno (bruno/), Endpoint GET /hello2, Endpoint GET /hello/{lang}, Java 19 (fim de suporte, intencional), Regra dos três lugares (controller, bruno, README), CLAUDE.md (instruções do projeto), README.md (guia do projeto), HelloController

### Community 2 - "Skill Factory e Idiomas"
Cohesion: 0.40
Nodes (4): Language, EN, ES, PT

### Community 6 - "App.jsx"
Cohesion: 0.22
Nodes (12): react@^19.1.0, ApiError, describeError(), fetchHello(), App(), load(), submitCustom(), LANGUAGES (+4 more)

### Community 7 - "package.json"
Cohesion: 0.15
Nodes (15): dependencies, react-dom@^19.1.0, devDependencies, vite@^7.0.0, @vitejs/plugin-react@^5.0.0, vitest@^3.2.0, name, private (+7 more)

### Community 8 - "Skill hello-message-factory"
Cohesion: 0.40
Nodes (4): Regra: sem novas dependências / sem Spring beans, Simple Factory pattern, Skill hello-message-factory, HelloMessageFactory

### Community 9 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, preview, test

## Knowledge Gaps
- **5 isolated node(s):** `EN`, `ES`, `PT`, `com.example:spring-boot-hello-world`, `Regra: sem novas dependências / sem Spring beans`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 26 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `App.jsx` to `package.json`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **What connects `EN`, `ES`, `PT` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Why does `CLAUDE.md (instruções do projeto)` connect `Docs e Regra dos Três Lugares` to `Skill hello-message-factory`, `Aplicação Spring Boot`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Why does `Skill hello-message-factory` connect `Skill hello-message-factory` to `Docs e Regra dos Três Lugares`, `Skill Factory e Idiomas`, `Mensagem e Mapeamento`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._