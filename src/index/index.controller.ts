import { Controller, Get, Request, Response } from '@nestjs/common';
import path from 'path';

import { IndexService } from './index.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Index')
@Controller()
export class IndexController {
  constructor(private readonly service: IndexService) {}

  @Get()
  @ApiOperation({ summary: 'Return success on home route' })
  @ApiResponse({ status: 200, description: 'NestJS Backend Boiler Plate' })
  getHello(): string {
    return this.service.getHello();
  }

  @Get('/favicon.ico')
  @ApiOperation({ summary: 'Return favicon.ico' })
  @ApiResponse({ status: 200, description: 'favicon.ico' })
  getFavicon(@Request() req, @Response() res) {
    return res.sendFile(path.join(__dirname + '../../../assets/favicon.ico'));
  }
}
