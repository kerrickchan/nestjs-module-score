import { Test, TestingModule } from '@nestjs/testing';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';
import { Score } from './entities/score.entity';

const scoreArray = [
  new Score(1, 'Strongly Disagree'),
  new Score(2, 'Disagree'),
  new Score(3, 'Neutral'),
  new Score(4, 'Agree'),
  new Score(5, 'Strongly Agree'),
];

const oneScore = new Score(3, 'Neutral');
oneScore.id = 1;

describe('ScoreController', () => {
  let controller: ScoreController;
  let service: ScoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScoreController],
      providers: [
        {
          provide: ScoreService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(scoreArray),
            findOne: jest.fn().mockResolvedValue(oneScore),
            findOneBy: jest.fn().mockResolvedValue(oneScore),
            create: jest.fn().mockReturnValue(oneScore),
            update: jest.fn().mockResolvedValue({ affected: 1 }),
            remove: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    controller = module.get<ScoreController>(ScoreController);
    service = module.get<ScoreService>(ScoreService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
