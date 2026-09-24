import { Controller, Get } from '@nestjs/common';
@Controller()
export class AppController {
  @Get()
  greet() {
    return 'hello qdhuy';
  }
}
