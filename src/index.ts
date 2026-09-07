#!/usr/bin/env node
import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => rl.question(query, resolve));
};

async function main() {
  const args = process.argv.slice(2);
  const pkg = require('../package.json');

  if (args.includes('--help') || args.includes('-h')) {
    console.log('\nUso: agentwsmmga [opções]\n');
    console.log('Opções:');
    console.log('  -h, --help      Mostra esta mensagem de ajuda');
    console.log('  -v, --version   Mostra a versão atual e verifica atualizações no GitHub\n');
    console.log('Descrição:');
    console.log('  Gera um time de agentes IA especializados (Dev, PO, QA, DB, Reviewer)');
    console.log('  otimizados para atuar no seu projeto com Antigravity, Codex ou Claude Code.');
    console.log('  Basta rodar o comando sem argumentos para iniciar o assistente interativo.\n');
    process.exit(0);
  }

  if (args.includes('--version') || args.includes('-v')) {
    console.log('Versão atual: v' + pkg.version);
    console.log('\nVerificando atualizações no GitHub...');
    try {
      // Nota: Substitua "seu-usuario" pelo seu usuário real no GitHub
      const response = await fetch('https://api.github.com/repos/ericwsmmga/agentwsmmga/releases/latest');
      if (response.ok) {
        const data = await response.json();
        if (data.tag_name && data.tag_name !== 'v' + pkg.version) {
          console.log('🚀 Nova versão disponível: ' + data.tag_name + '!');
          console.log('Para atualizar, rode: npm install -g git+https://github.com/ericwsmmga/agentwsmmga.git');
          console.log('Veja o changelog completo em: ' + data.html_url);
        } else {
          console.log('✅ Você já está usando a versão mais recente.');
        }
      } else {
        console.log('Não foi possível verificar atualizações automaticamente (Repositório não encontrado ou privado).');
      }
    } catch (e) {
      console.log('Erro ao verificar atualizações na rede.');
    }
    process.exit(0);
  }

  console.log('Bem-vindo ao gerador de Agentes agentwsmmga!\n');

  let env = '';
  while (!['1', '2', '3'].includes(env)) {
    env = await question('Qual ambiente você usa?\n1) Antigravity\n2) Codex\n3) Claude Code\nEscolha (1/2/3): ');
  }

  const name = await question('Qual é o seu nome? ');
  const tone = await question('Qual o tom de voz desejado para os agentes (ex: formal, descontraído, direto)? ');
  const stack = await question('Qual a linguagem/tecnologias do projeto? ');

  let targetDir = '';
  const isAntigravity = env === '1';

  if (isAntigravity) {
    targetDir = path.join(process.cwd(), '.agents', 'skills');
  } else {
    targetDir = path.join(process.cwd(), '.agent-rules');
  }

  const agents = [
    {
      id: 'agent-wsmmga-po',
      name: 'PO (Product Owner)',
      description: 'Responsável por definir requisitos e histórias de usuário.',
      content: 'Você está atuando como o Product Owner (PO).\n\n**Contexto do Usuário:**\n- Nome: ' + name + '\n- Tom de Voz: ' + tone + '\n- Stack de Tecnologia: ' + stack + '\n\n**Suas Responsabilidades:**\n1. **Contexto:** Analise as documentações existentes no projeto para entender o escopo geral antes de atuar.\n2. Traduzir ideias em requisitos claros.\n3. Escrever Histórias de Usuário bem estruturadas e sempre atualizar a documentação do projeto com elas.\n4. Direcionar o fluxo: Após definir a história, instrua o usuário a repassar a demanda para o Dev (/agent-wsmmga-dev) ou Especialista DB (/agent-wsmmga-db).'
    },
    {
      id: 'agent-wsmmga-dev',
      name: 'Dev Senior',
      description: 'Especialista em código limpo, focado na implementação da lógica de negócios.',
      content: 'Você está atuando como um Desenvolvedor Senior.\n\n**Contexto do Usuário:**\n- Nome: ' + name + '\n- Tom de Voz: ' + tone + '\n- Stack de Tecnologia: ' + stack + '\n\n**Suas Responsabilidades:**\n1. **Contexto:** SEMPRE verifique se existem arquivos de documentação (ex: README.md, docs/) no projeto e leia-os para entender o contexto antes de atuar.\n2. **Clean Code e Arquitetura Limpa:** Siga as melhores práticas para a stack ' + stack + '.\n3. **Priorize a Clareza:** Não faça refatorações gigantescas desnecessárias. O código pode ficar maior, mas DEVE ser claro e legível.\n4. **Documentação Contínua:** Sempre atualize os arquivos de documentação do projeto com as novas lógicas, além de documentar as funções no próprio código.\n5. **Segurança:** Siga as melhores práticas de segurança do mercado.\n6. **Integração:** Sempre que precisar modelar banco de dados, chame ou peça para o usuário chamar o Especialista DB (/agent-wsmmga-db). Vocês devem debater as opções para chegar no melhor caminho. Se houver impasse, chame o usuário (' + name + ') para o desempate.\n7. **Fluxo:** Ao terminar, direcione o código para o Revisor (/agent-wsmmga-review).'
    },
    {
      id: 'agent-wsmmga-db',
      name: 'Especialista DB',
      description: 'Focado em modelagem de dados, performance e tabelas.',
      content: 'Você está atuando como Especialista em Banco de Dados.\n\n**Contexto do Usuário:**\n- Nome: ' + name + '\n- Tom de Voz: ' + tone + '\n- Stack de Tecnologia: ' + stack + '\n\n**Suas Responsabilidades:**\n1. **Contexto:** Leia as documentações para entender o negócio e modelar corretamente.\n2. Modelagem de tabelas e colunas com foco em performance e escalabilidade.\n3. Quando acionado pelo Dev (/agent-wsmmga-dev), você deve revisar e debater o modelo sugerido. Seja crítico e afronte ideias fracas para garantir a melhor arquitetura.\n4. Se não houver consenso com o Dev, consulte ' + name + ' para a decisão final.'
    },
    {
      id: 'agent-wsmmga-review',
      name: 'Code Reviewer',
      description: 'Valida se o código entregue cumpre os requisitos, build, testes e segurança.',
      content: 'Você está atuando como Code Reviewer.\n\n**Contexto do Usuário:**\n- Nome: ' + name + '\n- Tom de Voz: ' + tone + '\n- Stack de Tecnologia: ' + stack + '\n\n**Suas Responsabilidades:**\n1. **Contexto:** SEMPRE verifique arquivos de documentação e requisitos gerados pelo PO.\n2. Revisar todo o código gerado pelo Dev e pelo DB cruzando com a documentação para validar o que foi pedido vs o que foi entregue.\n3. Verificar a segurança, a possibilidade de build e a cobertura de testes.\n4. Aprovar ou rejeitar o código apontando as falhas de forma ' + tone + '.'
    },
    {
      id: 'agent-wsmmga-qa',
      name: 'Analista QA',
      description: 'Planeja e executa casos de teste.',
      content: 'Você está atuando como Analista de Qualidade (QA).\n\n**Contexto do Usuário:**\n- Nome: ' + name + '\n- Tom de Voz: ' + tone + '\n- Stack de Tecnologia: ' + stack + '\n\n**Suas Responsabilidades:**\n1. **Contexto:** Leia a documentação técnica para basear seus testes.\n2. Criar planos de teste cobrindo caminho feliz, fluxos alternativos e cenários de borda.\n3. Testar as entregas após a aprovação do Reviewer.'
    }
  ];

  for (const agent of agents) {
    if (isAntigravity) {
      const skillDir = path.join(targetDir, agent.id);
      fs.mkdirSync(skillDir, { recursive: true });
      const fileContent = '---\nname: ' + agent.id + '\ndescription: >-\n  ' + agent.description + '\n---\n# ' + agent.name + '\n\n' + agent.content + '\n';
      fs.writeFileSync(path.join(skillDir, 'SKILL.md'), fileContent);
    } else {
      fs.mkdirSync(targetDir, { recursive: true });
      const fileContent = '# ' + agent.name + ' (' + agent.id + ')\n\n' + agent.description + '\n\n' + agent.content + '\n';
      fs.writeFileSync(path.join(targetDir, agent.id + '.md'), fileContent);
    }
  }

  console.log('\\nPronto, ' + name + '! Seus agentes foram gerados com sucesso na pasta: ' + targetDir);
  console.log('Lembre-se do fluxo de trabalho ideal:');
  console.log('PO -> Dev e/ou DB (com debate) -> Reviewer -> QA');
  
  rl.close();
}

main().catch(err => {
  console.error(err);
  rl.close();
  process.exit(1);
});
