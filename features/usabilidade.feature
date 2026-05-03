Feature: Requisitos não funcionais - Usabilidade

  Background:
    Given que estou acessando um curso gerado pela Builder

  @localizacao
  Scenario: Cenario 038 - Localização rápida de informações
    When abro o painel de acessibilidade
    Then procuro pela opção "Alto contraste" usando TAB em menos de três interações
    And o rótulo textual deve ser claro e descritivo

  @consistencia
  Scenario: Cenario 039 - Consistência de interface
    When navego entre diferentes módulos do curso
    Then a interface deve manter consistência visual e funcional
    And os elementos devem estar sempre na mesma posição relativa

  @feedback
  Scenario: Cenario 040 - Feedback imediato e claro
    When ativo a funcionalidade de acessibilidade
    Then aplico as configurações e o efeito deve ser aplicado em tempo real
    And devo receber feedback visual ou textual confirmando a ação
