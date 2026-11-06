# Graph Report - spring-boot-hello-world  (2026-11-06)

## Corpus Check
- Corpus is ~1,355 words - fits in a single context window. You may not need a graph.

## Summary
- 38 nodes · 57 edges · 6 communities (2 shown, 4 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.77)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Controller e Factory
- Docs e Regra dos Três Lugares
- Skill Factory e Idiomas
- Mensagem e Mapeamento
- Aplicação Spring Boot
- Maven POM

## God Nodes (most connected - your core abstractions)
1. `HelloController` - 8 edges
2. `HelloMessageFactory` - 7 edges
3. `Language` - 7 edges
4. `Skill hello-message-factory` - 7 edges
5. `README.md (guia do projeto)` - 5 edges
6. `CLAUDE.md (instruções do projeto)` - 5 edges
7. `Regra dos três lugares (controller, bruno, README)` - 5 edges
8. `HelloWorldApplication` - 4 edges
9. `HelloMessage` - 4 edges
10. `Coleção Bruno (bruno/)` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Simple Factory pattern` --implemented_by--> `HelloMessageFactory`  [EXTRACTED]
  .claude/skills/hello-message-factory/SKILL.md → src/main/java/com/example/helloworld/message/HelloMessageFactory.java
- `CLAUDE.md (instruções do projeto)` --describes--> `HelloWorldApplication`  [EXTRACTED]
  CLAUDE.md → src/main/java/com/example/helloworld/HelloWorldApplication.java
- `Skill hello-message-factory` --documents--> `HelloMessage`  [EXTRACTED]
  .claude/skills/hello-message-factory/SKILL.md → src/main/java/com/example/helloworld/message/HelloMessage.java
- `Endpoint GET /hello/{lang}` --uses--> `HelloMessageFactory`  [EXTRACTED]
  README.md → src/main/java/com/example/helloworld/message/HelloMessageFactory.java
- `Skill hello-message-factory` --documents--> `HelloMessageFactory`  [EXTRACTED]
  .claude/skills/hello-message-factory/SKILL.md → src/main/java/com/example/helloworld/message/HelloMessageFactory.java

## Import Cycles
- None detected.

## Communities (6 total, 4 thin omitted)

### Community 1 - "Docs e Regra dos Três Lugares"
Cohesion: 0.50
Nodes (8): Coleção Bruno (bruno/), Endpoint GET /hello2, Endpoint GET /hello/{lang}, Java 19 (fim de suporte, intencional), Regra dos três lugares (controller, bruno, README), CLAUDE.md (instruções do projeto), README.md (guia do projeto), HelloController

### Community 2 - "Skill Factory e Idiomas"
Cohesion: 0.25
Nodes (7): Regra: sem novas dependências / sem Spring beans, Simple Factory pattern, Skill hello-message-factory, Language, EN, ES, PT

## Knowledge Gaps
- **5 isolated node(s):** `com.example:spring-boot-hello-world`, `EN`, `PT`, `ES`, `Regra: sem novas dependências / sem Spring beans`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 14 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `CLAUDE.md (instruções do projeto)` connect `Docs e Regra dos Três Lugares` to `Skill Factory e Idiomas`, `Aplicação Spring Boot`?**
  _High betweenness centrality (0.277) - this node is a cross-community bridge._
- **What connects `com.example:spring-boot-hello-world`, `EN`, `PT` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Why does `Skill hello-message-factory` connect `Skill Factory e Idiomas` to `Controller e Factory`, `Docs e Regra dos Três Lugares`, `Mensagem e Mapeamento`?**
  _High betweenness centrality (0.267) - this node is a cross-community bridge._
- **Why does `HelloController` connect `Docs e Regra dos Três Lugares` to `Controller e Factory`, `Mensagem e Mapeamento`?**
  _High betweenness centrality (0.248) - this node is a cross-community bridge._