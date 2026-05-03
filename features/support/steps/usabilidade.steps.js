import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import HeaderPage from '../pages/HeaderPage.js'
import LoginPage from '../pages/LoginPage.js'
import CoursePage from '../pages/CoursePage.js'

// BACKGROUND 

Given('que estou acessando um curso gerado pela Builder', async function () {
  this.loginPage = new LoginPage(this.page)
  this.headerPage = new HeaderPage(this.page)
  this.coursePage = new CoursePage(this.page)

  await this.page.goto("https://builderstudio-qa-prod.smartlms.com.br/")

  await this.loginPage.titulo_pagina()
  await this.loginPage.login('usuario.iterasys', 'Iterasys@123')
  await this.loginPage.botao_login()

  await this.page.waitForLoadState('networkidle')

  await this.headerPage.area_de_trabalho()
  await this.headerPage.curso_primeira_pagina('https://builderstudio-qa-prod.smartlms.com.br/preview/project/452?page=3337')
  await this.headerPage.titulo_curso('Prévia \| Copia_Fundamentos do ESG_Teste')
  await this.coursePage.botao_acessibilidade()

})


// CENÁRIO 038 – Localização rápida via TAB - Alto contraste

When('abro o painel de acessibilidade', async function () {
    await this.coursePage.navegacao_tab_acessibilidade()

})

Then('procuro pela opção "Alto contraste" usando TAB em menos de três interações', async function () {
    await this.coursePage.navegacao_alto_contraste()

})

When('o rótulo textual deve ser claro e descritivo', async function () {
    await this.coursePage.validar_rotulo_alto_contraste()
  
})


// CENÁRIO 039 – Consistência 

When('navego entre diferentes módulos do curso', async function () {

})
    
Then('a interface deve manter consistência visual e funcional', async function () {

})

When('os elementos devem estar sempre na mesma posição relativa', async function () {
    await this.coursePage.validar_interface()

})


// CENÁRIO 040 – Feedback imediato

When('ativo a funcionalidade de acessibilidade', async function () {
    await this.coursePage.navegacao_tab_acessibilidade()

})

Then('aplico as configurações e o efeito deve ser aplicado em tempo real', async function () {
    await this.coursePage.ativar_configuracoes_acessibilidade()

})

When('devo receber feedback visual ou textual confirmando a ação', async function () {
    await this.coursePage.validar_estado_acessivel()

})