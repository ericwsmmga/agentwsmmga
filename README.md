# agentwsmmga

Uma CLI interativa instalável globalmente que gera e configura automaticamente um time especializado de Agentes de IA (Personas) no seu projeto. 

Feito para funcionar com **Antigravity**, **Codex**, e **Claude Code**.

## 👑 Governança Principal (A Lei da Equipe)

Para garantir a qualidade, segurança e alinhamento do projeto, nossa equipe de agentes opera sob as seguintes regras inegociáveis:

1. **Humano no Comando:** A IA sugere, debate e implementa, mas a decisão final, especialmente em impasses, é sempre do usuário (o Humano).
2. **TDD Inviolável (Test-Driven Development):** O código de produção só entra se estiver coberto. O Dev tem a obrigação de manter a cobertura de testes sempre **acima de 80%**.
3. **Trilha Imutável de Decisões:** Todo debate, alteração de requisito ou mudança de arquitetura é documentado. Nenhuma decisão tomada e aprovada desaparece no vazio; mantemos um histórico claro do porquê cada caminho foi escolhido.

## 🕹 Cultura Pop e Comunicação (Anos 80/90/00)

O ambiente de desenvolvimento não precisa ser chato! Nossos agentes são programados para interagir entre si e com você de forma **amigável e divertida**. Sempre que possível, as interações contarão com referências e piadas da cultura pop dos anos 80, 90 e 2000. Prepare-se para ver um "You shall not pass!" em um Code Review ou um "Hasta la vista, bug!" do QA.

### 🎭 Nossas Personas (O Ecossistema)

Cada agente possui não apenas uma função técnica, mas também um "personagem" que dita seu tom e personalidade nas conversas. Embora tragam uma pitada de cultura pop para deixar o ambiente leve, eles são **diretos e focados**, sem enrolação ou jogar conversa fora.

Você pode invocar os agentes tanto pelo nome oficial da função quanto pelo nome do personagem:

*   **`/agent-wsmmga-po` ou `/agent-wsmmga-xavier` (Product Owner - Professor Xavier):** Lendo a mente do cliente e guiando a equipe telepaticamente. Ele extrai os requisitos de negócio, cria as user stories detalhadas e estabelece os critérios de aceite antes de qualquer linha de código ser escrita.
*   **`/agent-wsmmga-dev` ou `/agent-wsmmga-neo` (Dev Senior - Neo):** O escolhido que vê a Matrix do código limpo. Foca na clareza arquitetural, implementação segura e no cumprimento do **TDD**. Ele recusa soluções "sujas" e evita over-engineering.
*   **`/agent-wsmmga-db` ou `/agent-wsmmga-oraculo` (Especialista BD - A Oráculo):** Sabe de tudo que já aconteceu no seu banco e prevê como os dados devem ser estruturados para o futuro. Responsável por otimizar queries, desenhar tabelas, normalizar o banco e garantir a escalabilidade dos dados.
*   **`/agent-wsmmga-review` ou `/agent-wsmmga-gandalf` (Revisor de Código - Gandalf):** Pega os requisitos do Xavier e cruza com o código do Neo. Ele revisa rigidamente cada Pull Request. Ele não deixa código ruim passar para a master: *"You shall not pass!"*
*   **`/agent-wsmmga-qa` ou `/agent-wsmmga-t800` (Qualidade - Exterminador T-800):** Uma máquina enviada do futuro com uma única missão: caçar e destruir bugs. Ele testa exaustivamente cenários de borda, fluxos alternativos e valida se os critérios do PO foram integralmente atendidos: *"Hasta la vista, bug!"*
*   **`/agent-wsmmga-commit` ou `/agent-wsmmga-doc` (Especialista de Versionamento - Dr. Emmett Brown):** O guardião da linha do tempo! Após tudo aprovado, ele entra em cena para empacotar o código. Cria branches dentro dos padrões (feature/, bugfix/), elabora commits semânticos ("*Great Scott!*") e documenta de forma impecável o que foi entregue.

*(Estes nomes são sugestões e a dinâmica pode ser adaptada conforme a cultura do seu time!)*

## 🏗 Stack Tecnológica & Estrutura

Para suportar essa inteligência e entregar uma CLI rápida e universal, utilizamos a seguinte stack:

*   **Linguagem Core:** TypeScript (com tipagem estrita para segurança e manutenibilidade).
*   **Ambiente de Execução:** Node.js.
*   **Formato de Distribuição:** CLI (Command Line Interface) instalada globalmente no sistema operacional.
*   **IAs Suportadas (Integração):** Antigravity, Codex, Claude Code.

A estrutura gerada nos projetos (`.agents/skills/` ou diretórios configuráveis) contém prompts e scripts individuais de cada agente, mantendo a responsabilidade única de cada "Persona" separada e evolutiva.

## 🚀 Como Utilizar (O Workflow)

A ferramenta foi projetada para atuar como uma biblioteca (CLI) global no seu computador, mantendo sua máquina organizada.

### 1. Instalação Global (via GitHub)

```bash
npm install -g git+https://github.com/ericwsmmga/agentwsmmga.git
```

> **Dica:** O NPM baixa, compila e salva o executável globalmente. Você poderá rodar `agentwsmmga` em qualquer projeto seu de forma instantânea.

### 2. Configurando um Projeto (Setup Inicial)

Vá para a pasta raiz de qualquer projeto que você queira implementar a governança da equipe e execute:

\`\`\`bash
agentwsmmga
\`\`\`

A CLI iniciará um questionário iterativo para entender o contexto do projeto:
1. **Nome do Humano (Você)**: Para os agentes saberem com quem estão falando.
2. **Qual IA** será o motor principal do projeto.
3. **Idioma do Código**: Inglês, Português, etc.
4. **Idioma de Interação**: Define o tom divertido e o idioma nativo dos agentes.
5. **Padrões de Git**: Regras de nomenclatura de branches e commits que o Doc Brown usará.

Uma pasta `.agents` será gerada na sua raiz com todos os agentes orquestrados.

### 3. Fluxo de Trabalho (Orquestrando a Equipe)

O segredo do sucesso do ecossistema é o fluxo de trabalho imutável. Para o time gerar o melhor resultado possível, orquestre a chamada desses agentes na ordem certa:

\`\`\`mermaid
flowchart TD
    A[Xavier - PO] -->|Define História e Requisitos| B(Neo - Dev)
    B <-->|Debate Modelagem e Escalabilidade| C(Oráculo - DB)
    B -->|Envia Código e Testes| D{Gandalf - Review}
    C -->|Aprova Esquema| D
    D -->|Se reprovado| B
    D -->|Se aprovado| E[T-800 - QA]
    E -->|Se encontrar falha| B
    E -->|Testes Passaram| F[Doc Brown - Commit]
    F -->|Entrega Versionada na Timeline| G((FIM))
\`\`\`

#### O Passo a Passo no Dia a Dia:

1. **Ideação (PO - Xavier):** Você descreve o problema ou a feature que deseja criar. O PO analisa, quebra em histórias menores e devolve a documentação oficial.
2. **Construção (Dev - Neo):** Você pega a história do PO e entrega para o Dev. Ele escreve os testes antes (TDD) e depois a implementação.
3. **Decisões de Dados (DB - Oráculo):** Se a tarefa do Dev envolver persistência, banco ou estado, o Dev **precisa** consultar o Especialista de DB. Eles debatem. Em caso de impasse, **você** decide.
4. **Inspeção (Review - Gandalf):** Terminado o código, o Reviewer entra verificando se a arquitetura foi seguida, se não há furos de segurança e se atende exatamente ao que o PO pediu.
5. **Certificação (QA - T-800):** O código teoricamente está perfeito? O QA vai tentar quebrar de todas as formas possíveis e garantir que a cobertura de testes é real.
6. **Entrega (Commit - Doc Brown):** Tudo passou? Chame o Especialista de Versionamento. Ele vai gerar as mensagens de commit semânticas (`feat:`, `fix:`, `chore:`), organizar a branch no padrão e registrar a mudança na linha do tempo imutável.

## 🤝 O Papel do Desenvolvedor (Você)

Neste ecossistema, o seu papel como humano muda de um "digitador de código" para um **Arquiteto Diretor**. 

Você é o maestro dessa orquestra. Embora a IA crie o código, você detém o poder de veto. Você resolve conflitos entre agentes, fornece contexto de negócio que a máquina não possui e direciona a arquitetura de longo prazo. A equipe obedece a você, e o projeto cresce sob a sua visão.
