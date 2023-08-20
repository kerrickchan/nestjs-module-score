import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import {
  DeleteResult,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Score)
    private scoreRepository: Repository<Score>,
  ) {}

  async findAll(): Promise<Score[]> {
    return this.scoreRepository.find();
  }

  async create(data: CreateScoreDto): Promise<Score> {
    const score = this.scoreRepository.create(data);
    return this.scoreRepository.save(score);
  }

  async findOne(id: number): Promise<Score | undefined> {
    return this.scoreRepository.findOne({ where: { id } });
  }

  async findOneBy(options: FindOneOptions<Score>): Promise<Score | undefined> {
    return this.scoreRepository.findOne(options);
  }

  async update(id: number, data: UpdateScoreDto): Promise<UpdateResult> {
    const scoreToUpdate = await this.scoreRepository.findOne({ where: { id } });
    if (!scoreToUpdate) {
      throw new NotFoundException();
    }
    return this.scoreRepository.update(id, data);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.scoreRepository.delete(id);
  }
}
