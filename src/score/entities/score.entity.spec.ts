import { Score } from './score.entity';

describe('ScoreModel', () => {
  it('should make a Score with score only', () => {
    const score = new Score(1);
    expect(score).toBeTruthy();
    expect(score.score).toBe(1);
    expect(score.name).toBe('');
  });
  it('should make a Score with name', () => {
    const score = new Score(2, 'Normal');
    expect(score).toBeTruthy();
    expect(score.score).toBe(2);
    expect(score.name).toBe('Normal');
  });
});
