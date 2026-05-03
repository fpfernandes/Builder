import { defineConfig } from "playwright/test"

export default defineConfig({
    testDir: './features',  // diretorio onde estao os arquivos .features
    timeout: 30000,
    retries: 1,
    use: {
        baseURL: 'https://builderstudio-qa-prod.smartlms.com.br/', 
        headless: false, 
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    }
})
