import { readdirSync } from "fs";
import { resolve } from 'path';

export default defineEventHandler((event) => {  
    const files = readdirSync(resolve('./content')).filter((v)=>v.endsWith('.xlsx') && v.startsWith('payroll-'));
    return files;
})
