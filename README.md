# agentwsmmga

Uma CLI interativa instalável globalmente que gera e configura automaticamente um time especializado de Agentes de IA (Personas) no seu projeto. 

Feito para funcionar com **Antigravity**, **Codex**, e **Claude Code**.

## 🚀 Instalação Global (via GitHub)

A ferramenta foi projetada para atuar como uma biblioteca (CLI) que fica no seu computador. Quando instalada, ela vai para a pasta global de libs do seu Node, mantendo a sua máquina organizada (não fica sujando seus diretórios locais como Downloads).

Para instalar a partir do GitHub, você deve usar o comando de instalação global do NPM apontando para o seu repositório:

\`\`\`bash
# Substitua 'seu-usuario' pelo seu usuário do GitHub
npm install -g git+https://github.com/ericwsmmga/agentwsmmga.git
\`\`\`

> **Dica:** Ao fazer isso, o NPM baixa, compila e salva o executável globalmente. Você poderá rodar `agentwsmmga` em qualquer projeto seu. Se você clonou este repositório localmente só para testar, você pode rodar `npm install -g .` e **depois excluir a pasta**, pois os arquivos já estarão no cache global do sistema.

## 🛠 Como Utilizar

Após instalar globalmente, vá para a pasta raiz de qualquer projeto seu e execute o comando:

\`\`\`bash
agentwsmmga
\`\`\`

A CLI fará 4 perguntas:
1. Qual ambiente você usa (Antigravity, Codex ou Claude Code)?
2. Qual é o seu nome?
3. Qual o tom de voz dos agentes?
4. Qual a linguagem/stack de tecnologia do seu projeto?

Dependendo do ambiente escolhido, ela criará uma pasta (ex: `.agents/skills` ou `.agent-rules`) contendo todas as Personas otimizadas com as suas respostas!

## 🎭 Nossas Personas (Agentes)

Esta CLI gera 5 agentes especializados para invocar via barra (ex: `/agent-wsmmga-dev`):

- **`/agent-wsmmga-po` (Product Owner):** Cria e define os requisitos e escreve as histórias de usuário.
- **`/agent-wsmmga-dev` (Dev Senior):** Escreve o código limpo, foca na clareza (evitando refatorações desnecessárias), cuida da segurança e documenta as funções exaustivamente.
- **`/agent-wsmmga-db` (Especialista Banco de Dados):** Otimiza as queries, define as tabelas e a estrutura de dados para garantir escalabilidade.
- **`/agent-wsmmga-review` (Revisor de Código):** Pega os requisitos criados pelo PO e cruza com o código gerado pelo Dev. Ele valida, critica falhas de segurança e verifica os testes.
- **`/agent-wsmmga-qa` (Qualidade):** Cria os cenários de teste, fluxos alternativos e validações de borda (edge cases).

## 🔄 Fluxo Correto de Interação

Para o time gerar o melhor resultado possível, você deve orquestrar a chamada desses agentes na ordem certa:

\`\`\`mermaid
flowchart TD
    A[PO] -->|Define Requisitos e História| B(Dev)
    B <-->|Debate sobre Dados e Tabelas| C(Especialista DB)
    B -->|Envia Código Pronto| D{Reviewer}
    C -->|Aprova Banco| D
    D -->|Se aprovado| E[QA testa tudo]
    D -->|Se reprovado| B
\`\`\`

1. Invoque o **PO** para descrever o problema.
2. Invoque o **Dev** para implementar o que o PO desenhou.
3. Se a tarefa envolver banco de dados, o Dev deve obrigatoriamente chamar o **Especialista DB** (ou você deve chamá-lo). **Eles devem debater as opções fortemente.** Se houver impasse entre eles, você (usuário) toma a decisão.
4. Finalizado o código, o **Reviewer** faz uma análise profunda checando build, segurança e cruzamento com a especificação do PO.
5. Tudo certo? O **QA** atua gerando os cenários de testes e validando.
