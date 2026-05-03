Feature: Acessibilidade do curso Builder

Scenario Outline: Validação de acessibilidade do curso Builder
  Given que estou acessando o "<link>" do "<curso>" gerado pela Builder

  # Scenario: Cenario 029 - Uso de semântica adequada
    When executo a análise de tags semânticas na página
    Then devo encontrar tags semânticas aplicadas corretamente

  # Scenario: Cenario 031 - Atributos alt em imagens
    When executo a análise de atributo alt em imagens na página
    Then cada imagem deve conter atributo alt com descrição significativa

  # Scenario: Cenario 032 - Títulos significativos
    When executo a análise de títulos na página
    Then os títulos devem estar em hierarquia lógica e significativa
  
  # Scenario: Cenario 033 - Links descritivos
    When executo a análise de links na página
    Then os links devem ser claros e descritivos

  # Scenario: Cenario 034 - Elementos interativos acessíveis por teclado
    When executo a análise de elementos interativos na página
    Then os elementos interativos devem ser acessíveis por teclado

  # Scenario: Cenario 036 - Elementos devem possuir Aria e nomes acessíveis válidos
    When executo a análise de Aria e nomes acessíveis válidos na página
    Then os elementos devem possuir Aria e nomes acessíveis válidos

  # Scenario: Relatório consolidado de acessibilidade
    When executo a análise completa de acessibilidade da página
    Then gero o "<relatorio>" consolidado de acessibilidade em HTML

Examples:
  | link                                                                        | curso                                                                              | relatorio                  |
  | https://builderstudio-qa-prod.smartlms.com.br/preview/project/452?page=3337 | Prévia \| Copia_Fundamentos do ESG_Teste                                           | acessibilidade-Curso1.html |
  | https://builderstudio-qa-prod.smartlms.com.br/preview/project/10?page=37    | Prévia \| LF2023.04 - Assédio Moral e Sexual - Tudo o que sua equipe precisa saber | acessibilidade-Curso2.html |
  
