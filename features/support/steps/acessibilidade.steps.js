import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { createHtmlReport } from 'axe-html-reporter'
import fs from 'fs'
import HeaderPage from '../pages/HeaderPage.js'
import LoginPage from '../pages/LoginPage.js'
import CoursePage from '../pages/CoursePage.js'

// BACKGROUND 

Given('que estou acessando o {string} do {string} gerado pela Builder', async function (pagina_curso, titulo_curso) {
  this.loginPage = new LoginPage(this.page)
  this.headerPage = new HeaderPage(this.page)
  this.coursePage = new CoursePage(this.page)

  await this.page.goto("https://builderstudio-qa-prod.smartlms.com.br/")

  await this.loginPage.titulo_pagina()
  await this.loginPage.login('', '')
  await this.loginPage.botao_login()

  await this.page.waitForLoadState('networkidle')

  await this.headerPage.area_de_trabalho()
  await this.headerPage.curso_primeira_pagina(pagina_curso)
  await this.headerPage.titulo_curso(titulo_curso)
  await this.coursePage.botao_acessibilidade()
})

// CENÁRIO 029 - SEMÂNTICA

When('executo a análise de tags semânticas na página', async function () {
  this.axeResults = await new AxeBuilder({ page: this.page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze()
})

Then('devo encontrar tags semânticas aplicadas corretamente', function () {
  const violations = this.axeResults.violations.filter(v =>
    ['landmark-one-main', 'region'].includes(v.id)
  )

  // inicializa o array de erros
  this.softErrors = this.softErrors || []

  try {
    expect(violations.length).toBe(0)
  } catch (erro) {
    // registrar o erro sem quebrar o cenário
    this.softErrors.push({
      step: 'Semântica',
      message: erro.message,
      violations
    })
    console.error('Erro na análise das tags semânticas:', erro.message)
  }

})

// CENÁRIO 031 - IMAGENS

When('executo a análise de atributo alt em imagens na página', async function () {
  this.axeResults = await new AxeBuilder({ page: this.page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze()
})

Then('cada imagem deve conter atributo alt com descrição significativa', function () {
  const violations = this.axeResults.violations.filter(v =>
    ['image-alt'].includes(v.id)
  )

  // inicializa o array de erros
  this.softErrors = this.softErrors || []

  try {
    expect(violations.length).toBe(0)
  } catch (erro) {
    // registrar o erro sem quebrar o cenário
    this.softErrors.push({
      step: 'Imagens',
      message: erro.message,
      violations
    })
    console.error('Erro na análise do atributo alt em imagens na página:', erro.message)
  }

})

// CENÁRIO 032 - TÍTULOS

When('executo a análise de títulos na página', async function () {
  this.axeResults = await new AxeBuilder({ page: this.page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze()
})

Then('os títulos devem estar em hierarquia lógica e significativa', function () {
  const violations = this.axeResults.violations.filter(v =>
    ['heading-order'].includes(v.id)
  )

  // inicializa o array de erros
  this.softErrors = this.softErrors || []

  try {
    expect(violations.length).toBe(0)
  } catch (erro) {
    // registrar o erro sem quebrar o cenário
    this.softErrors.push({
      step: 'Títulos',
      message: erro.message,
      violations
    })
    console.error('Erro na análise de títulos na página:', erro.message)
  }

})

// CENÁRIO 033 - LINKS

When('executo a análise de links na página', async function () {
  this.axeResults = await new AxeBuilder({ page: this.page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze()
})

Then('os links devem ser claros e descritivos', function () {
  const violations = this.axeResults.violations.filter(v =>
    ['link-name'].includes(v.id)
  )

  // inicializa o array de erros
  this.softErrors = this.softErrors || []

  try {
    expect(violations.length).toBe(0)
  } catch (erro) {
    // registrar o erro sem quebrar o cenário
    this.softErrors.push({
      step: 'Links',
      message: erro.message,
      violations
    })
    console.error('Erro na analise dos links:', erro.message)
  }

})

// CENÁRIO 034 - TECLADO

When('executo a análise de elementos interativos na página', async function () {
  this.axeResults = await new AxeBuilder({ page: this.page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze()
})

Then('os elementos interativos devem ser acessíveis por teclado', function () {
  const violations = this.axeResults.violations.filter(v =>
    [
      'keyboard',
      'focusable-no-name',
      'focus-order-semantics',
      'aria-hidden-focus'
    ].includes(v.id)
  )

  // inicializa o array de erros 
  this.softErrors = this.softErrors || []

  try {
    expect(violations.length).toBe(0)
  } catch (erro) {
    // registrar o erro sem quebrar o cenário
    this.softErrors.push({
      step: 'Teclado',
      message: erro.message,
      violations
    })
    console.error('Erro na análise dos elementos interativos por teclado:', erro.message)
  }

})

// CENÁRIO 036 - ARIA / NOME ACESSÍVEL

When('executo a análise de Aria e nomes acessíveis válidos na página', async function () {
  this.axeResults = await new AxeBuilder({ page: this.page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze()
})

Then('os elementos devem possuir Aria e nomes acessíveis válidos', function () {
  const violations = this.axeResults.violations.filter(v =>
    [
      'button-name',
      'link-name',
      'aria-valid-attr',
      'aria-valid-attr-value',
      'aria-allowed-attr',
      'aria-prohibited-attr',
      'aria-required-attr'
    ].includes(v.id)
  )

  // inicializa o array de erros
  this.softErrors = this.softErrors || []

  try {
    expect(violations.length).toBe(0)
  } catch (erro) {
    // registrar o erro sem quebrar o cenário
    this.softErrors.push({
      step: 'Aria / Nome acessível',
      message: erro.message,
      violations
    })
    console.error('Erro na análise dos elementos ARIA / Nomes acessíveis:', erro.message)
  }

})

// RELATÓRIO FINAL

When('executo a análise completa de acessibilidade da página', async function () {
  this.axeResults = await new AxeBuilder({ page: this.page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze()
})

Then('gero o {string} consolidado de acessibilidade em HTML', function (relatorio) {
  if (this.softErrors && this.softErrors.length > 0) {
    console.log('Erros encontrados durante o cenário:')
    console.table(this.softErrors)
  }

  const html = createHtmlReport({
    results: this.axeResults,
    options: {
      projectKey: 'Curso Builder',
      outputDir: 'reports',
      reportFileName: relatorio
    }
  })

  if (!fs.existsSync('reports')) {
    fs.mkdirSync('reports')
  }

  fs.writeFileSync(`reports/${relatorio}`, html)
})
