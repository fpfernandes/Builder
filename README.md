# Builder Automation

Este projeto contém uma suíte de testes automatizados em BDD para validar critérios de acessibilidade e usabilidade em cursos gerados pela Builder.

## Visão geral

A automação utiliza:
- Cucumber para escrever cenários em linguagem natural
- Playwright para execução dos testes no navegador
- Axe para verificar problemas comuns de acessibilidade
- Relatórios HTML gerados automaticamente para análise dos resultados

## Funcionalidades cobertas

O projeto inclui cenários para validar:
- Acessibilidade da interface do curso
- Semântica de tags e elementos
- Atributos alt em imagens
- Hierarquia de títulos
- Nome e descrição de links
- Navegação por teclado
- Uso de ARIA e nomes acessíveis
- Usabilidade e feedback visual em recursos de acessibilidade

## Estrutura do projeto

- features/: arquivos .feature com os cenários BDD
- features/support/steps/: definições dos passos do Cucumber
- features/support/pages/: Page Objects para encapsular a interação com a interface
- reports/: relatórios HTML gerados durante a execução

## Pré-requisitos

Antes de executar os testes, certifique-se de ter instalado:
- Node.js 18 ou superior
- npm

## Instalação

No diretório raiz do projeto, execute:

```bash
npm install
```

## Execução dos testes

### Executar a suíte completa

```bash
npm run test:bdd
```

### Executar em modo CI

```bash
npm run test:ci
```

## Relatórios

Os relatórios HTML de acessibilidade são salvos na pasta reports/.

Exemplos:
- reports/acessibilidade-Curso1.html
- reports/acessibilidade-Curso2.html

## Observações

Os testes são executados contra um ambiente de qualidade da Builder e dependem das URLs e credenciais configuradas nos passos de automação. Em caso de mudanças no ambiente, pode ser necessário ajustar esses valores nos arquivos de suporte.

## Licença

Este projeto está licenciado sob ISC.
