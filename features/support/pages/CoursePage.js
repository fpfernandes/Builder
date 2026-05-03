import { expect } from '@playwright/test'

export default class CoursePage {

    constructor(page) {
        this.page = page
        this.seletorAcessibilidade = '#a11y-toggle'
        this.seletorContraste = 'button[data-a11y-action="toggle-contrast"]'
        this.seletorAjusteFonte = 'button[data-a11y-action="toggle-readable-font"]'
        this.seletorMascaraLeitura = 'button[data-a11y-action="toggle-reading-mask"]'
        this.seletorEscalaCinza = 'button[data-a11y-action="toggle-grayscale"]'

    }

    async botao_acessibilidade() {
        // Acessa diretamente o frame correto pelo padrão da URL
        const frame = this.page.frame({ url: /embed=1/ })
        // Valida o botão dentro do frame
        await frame.waitForSelector(this.seletorAcessibilidade, {
            state: 'visible',
            timeout: 15000
        })
        await expect(frame.locator(this.seletorAcessibilidade)).toBeVisible()

    }

    async navegacao_tab_acessibilidade() {
        const frame = this.page.frame({ url: /embed=1/ })
        // Navega via TAB até focar o botão dentro do iframe
        for (let i = 0; i < 10; i++) {
            const isFocused = await frame.evaluate((selector) => {
                const el = document.querySelector(selector)
                return el === document.activeElement
            }, this.seletorAcessibilidade)

            if (isFocused) {
                await frame.press('body', 'Enter')   // abre o painel
                return
            }
            await frame.press('body', 'Tab')
        }

        //throw new Error('Botão de acessibilidade não foi encontrado via TAB dentro do iframe.')
    }

    async navegacao_alto_contraste() {
        const frame = this.page.frame({ url: /embed=1/ })
        //Espera o painel aparecer dentro do iframe
        await frame.waitForSelector('#a11y-panel', { state: 'visible', timeout: 10000 })
        //Seleciona o botão de Alto Contraste dentro do iframe
        await frame.waitForSelector(this.seletorContraste, { state: 'visible', timeout: 5000 })
        //Foca o botão (equivalente ao TAB ter chegado nele)
        await frame.focus(this.seletorContraste)
        await this.page.waitForTimeout(700)
        //Pressiona ENTER para ativar
        await frame.press(this.seletorContraste, 'Enter')
        await this.page.waitForTimeout(1000)
        //Valida o estado acessível
        const estado = await frame.getAttribute(this.seletorContraste, 'aria-pressed')
        expect(estado).toBe('true')

    }

    async validar_rotulo_alto_contraste() {
        const frame = this.page.frame({ url: /embed=1/ })
        const label = await frame.evaluate(() => {
            const el = document.activeElement;
            return el?.innerText || el?.getAttribute('aria-label') || ''
        })
        expect(label.trim().length).toBeGreaterThan(0)
        expect(label.toLowerCase()).toContain('contraste')

    }

    async ativar_configuracoes_acessibilidade() {
        const frame = this.page.frame({ url: /embed=1/ })
        // Espera o painel aparecer dentro do iframe
        await frame.waitForSelector('#a11y-panel', { state: 'visible', timeout: 10000 })
        // Seleciona os botoes dentro do iframe
        const lista_seletores = [
            this.seletorContraste, 
            this.seletorAjusteFonte, 
            this.seletorMascaraLeitura, 
            this.seletorEscalaCinza
        ]

        for (const seletor of lista_seletores) {
            await frame.waitForSelector(seletor, { state: 'visible', timeout: 5000 })
            // Foca nos botoes (equivalente ao TAB ter chegado nele)
            await frame.focus(seletor)
            await this.page.waitForTimeout(700)
            // Pressiona ENTER para ativar
            await frame.press(seletor, 'Enter')
            await this.page.waitForTimeout(1000)
        }

    }

    async validar_estado_acessivel() {
        const frame = this.page.frame({ url: /embed=1/ })
        const lista_seletores = [this.seletorContraste, this.seletorAjusteFonte, this.seletorMascaraLeitura, this.seletorEscalaCinza]
        for (const seletor of lista_seletores) {
                const estado = await frame.getAttribute(seletor, 'aria-pressed')
                expect(estado).toBe('true')

        }

    }

    async validar_interface() {
        const modulos = [
            'https://builderstudio-qa-prod.smartlms.com.br/preview/project/452?page=3340',
            'https://builderstudio-qa-prod.smartlms.com.br/preview/project/452?page=3342',
            'https://builderstudio-qa-prod.smartlms.com.br/preview/project/452?page=3343'
        ]

        const layout = {
            header: 'header.ui-header',
            content: '.content-wrapper',
            footer: 'footer.ui-footer'
        }

        for (const modulo of modulos) {
            await this.page.goto(modulo)
            const frame = this.page.frame({ url: /embed=1/ })
            await frame.waitForSelector('header.ui-header', { timeout: 15000 })
            await expect(frame.locator(layout.header)).toBeVisible()
            await expect(frame.locator(layout.content)).toBeVisible()
            await expect(frame.locator(layout.footer)).toBeVisible()
        }

    }

}


