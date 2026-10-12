import {defineConfig} from '@playwright/test';
import {existsSync} from 'node:fs';
const chrome='C:/Program Files/Google/Chrome/Application/chrome.exe';
export default defineConfig({testDir:'./tests',timeout:60000,workers:1,use:{baseURL:'http://localhost:5173',headless:true,launchOptions:existsSync(chrome)?{executablePath:chrome}:{}},webServer:{command:'npm run dev -- --port 5173 --strictPort',url:'http://localhost:5173',reuseExistingServer:true},reporter:'list'});

