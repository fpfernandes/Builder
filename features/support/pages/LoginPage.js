import { expect } from '@playwright/test'

export default class LoginPage {

    constructor(page) {
        this.page = page 
        this.username = '#maryda7aa2b3238dcfffd20cfde2eccad45demail'
        this.password = '#mary2f4391247b971fea519e9dc349999b01password'
        this.botaoLogin = page.getByRole('button', { name: 'Acessar' })

    }

    async titulo_pagina() {
        await expect(this.page.locator('[data-cy="login-title"]')).toHaveText('Bem-vindo')
        
    }

    async login(username, password) {
        await this.page.fill(this.username, username)
        await this.page.fill(this.password, password)

    }    

    async botao_login() {
        await this.botaoLogin.click()

    }

}