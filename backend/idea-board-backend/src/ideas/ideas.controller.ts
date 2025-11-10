import { Body, Controller, Get, Post } from '@nestjs/common';
import { Idea } from './idea.entity';
import { IdeasService } from './ideas.service';

@Controller('ideas')
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @Get()
  getAll(): Promise<Idea[]> {
    return this.ideasService.findAll();
  }

  @Post()
  createIdea(@Body() body: Partial<Idea>) {
    return this.ideasService.create(body);
  }
}
