import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Idea } from './idea.entity';

@Injectable()
export class IdeasService {
  constructor(
    @InjectRepository(Idea)
    private readonly ideaRepo: Repository<Idea>,
  ) {}

  findAll() {
    return this.ideaRepo.find();
  }

  create(ideaData: Partial<Idea>) {
    const idea = this.ideaRepo.create(ideaData);
    return this.ideaRepo.save(idea);
  }
}
