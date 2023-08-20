import { Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { Repository } from 'typeorm';
import { ScoreNotFoundException } from './exceptions/score-not-found.exception';

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
    return this.scoreRepository.create(data);
  }

  async findOne(id: number): Promise<Score | undefined> {
    return this.scoreRepository.findOne({ where: { id } });
  }

  async update(id: number, data: UpdateScoreDto): Promise<Score> {
    const scoreToUpdate = await this.scoreRepository.findOne({ where: { id } });
    if (!scoreToUpdate) {
      throw new ScoreNotFoundException();
    }
    return this.scoreRepository.create(data);
  }

  async remove(id: number): Promise<void> {
    this.scoreRepository.delete(id);
  }
}
