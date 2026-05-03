import { expect } from '@playwright/test'

export default class HeaderPage {

    constructor(page) {
        this.page = page
        this.tituloAreaTrabalho = '#area-de-trabalho'
        
    }

    async area_de_trabalho() {
        await this.page.waitForSelector(this.tituloAreaTrabalho, {
            state: 'attached',   
            timeout: 15000
        })

        await expect(this.page.locator(this.tituloAreaTrabalho)).toBeVisible({
            timeout: 15000
        })
        
    }


    async curso_primeira_pagina(pagina_curso) {
        await this.page.goto(pagina_curso)

    }


    async titulo_curso(titulo) {
        const locator = this.page.locator(`text=${titulo}`)
        await locator.waitFor({ state: 'visible', timeout: 15000 })
        await expect(locator).toBeVisible({ timeout: 15000 })

    }


}