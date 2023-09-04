import { Injectable } from '@nestjs/common';

@Injectable()
export class ScriptService {
    async retriveFile() {
        const scriptPath = '/server/src/script/template/script.js';
        const script = require(scriptPath);
        console.log(script);
    }
}
