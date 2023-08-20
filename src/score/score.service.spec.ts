import { Test, TestingModule } from '@nestjs/testing';
import { ScoreService } from './score.service';
import { Score } from './entities/score.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const testScore = 'Neutral';

const scoreArray = [
  new Score(1, 'Strongly Disagree'),
  new Score(2, 'Disagree'),
  new Score(3, 'Neutral'),
  new Score(4, 'Agree'),
  new Score(5, 'Strongly Agree'),
];

const oneScore = new Score(3, 'Neutral');
oneScore.id = 1;

describe('ScoreService', () => {
  let service: ScoreService;
  let repo: Repository<Score>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScoreService,
        {
          provide: getRepositoryToken(Score),
          useValue: {
            find: jest.fn().mockResolvedValue(scoreArray),
            findOne: jest.fn().mockResolvedValue(oneScore),
            findOneBy: jest.fn().mockResolvedValue(oneScore),
            create: jest.fn().mockReturnValue(oneScore),
            save: jest.fn().mockReturnValue(oneScore),
            update: jest.fn().mockResolvedValue({ affected: 1 }),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<ScoreService>(ScoreService);
    repo = module.get<Repository<Score>>(getRepositoryToken(Score));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of scores', () => {
      const repoSpy = jest.spyOn(repo, 'find');
      expect(service.findAll()).resolves.toEqual(scoreArray);
      expect(repoSpy).toBeCalledWith();
    });
  });

  describe('findOne', () => {
    it('should find a single score', () => {
      const repoSpy = jest.spyOn(repo, 'findOne');
      expect(service.findOne(1)).resolves.toEqual(oneScore);
      expect(repoSpy).toBeCalledWith({ where: { id: 1 } });
    });
  });

  describe('findOneBy', () => {
    it('should find one score', () => {
      const repoSpy = jest.spyOn(repo, 'findOne');
      expect(
        service.findOneBy({ where: { name: testScore } }),
      ).resolves.toEqual(oneScore);
      expect(repoSpy).toBeCalledWith({ where: { name: testScore } });
    });
  });

  describe('insertOne', () => {
    it('should successfully insert a score', async () => {
      const score = await service.create({
        score: 3,
        name: 'Neutral',
      });

      expect(score).toEqual(oneScore);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith({
        score: 3,
        name: 'Neutral',
      });
      expect(repo.save).toBeCalledTimes(1);
    });
  });

  describe('updateOne', () => {
    it('should call the update method', async () => {
      const score = await service.update(1, {
        name: testScore,
      });
      expect(score).toEqual({ affected: 1 });
      expect(repo.update).toBeCalledTimes(1);
      expect(repo.update).toBeCalledWith(1, {
        name: testScore,
      });
    });
  });

  describe('deleteOne', () => {
    it('should return true', async () => {
      const repoSpy = jest.spyOn(repo, 'delete');
      expect(service.remove(1)).resolves.toEqual({ affected: 1 });
      expect(repoSpy).toBeCalledWith(1);
      expect(repoSpy).toBeCalledTimes(1);
    });
  });
});
