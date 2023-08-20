import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { ScoreService } from './score.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Score')
@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get()
  async findAll() {
    return this.scoreService.findAll();
  }

  @Post()
  async create(@Body() data: CreateScoreDto) {
    return this.scoreService.create(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.scoreService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: UpdateScoreDto) {
    return this.scoreService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.scoreService.remove(id);
  }
}
