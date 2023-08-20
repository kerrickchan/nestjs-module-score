import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { Score } from './entities/score.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Score])],
  providers: [ScoreService],
  controllers: [ScoreController],
})
export class ScoreModule {}
