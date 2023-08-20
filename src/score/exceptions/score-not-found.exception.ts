import { HttpException, HttpStatus } from '@nestjs/common';

export class ScoreNotFoundException extends HttpException {
  constructor() {
    super('score.not-found', HttpStatus.NOT_FOUND);
  }
}
