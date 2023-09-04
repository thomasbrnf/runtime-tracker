import { Controller, Get } from '@nestjs/common';
import { ScriptService } from './script.service';

@Controller('script')
export class ScriptController {
    constructor(private scriptService: ScriptService) {}

    @Get() 
    async fetchFile(){
        return this.scriptService.retriveFile();
    }
}
