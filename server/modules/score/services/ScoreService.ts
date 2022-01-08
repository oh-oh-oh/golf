import { Service } from "typedi";
import { Score } from "../models";
import { ScoreRepository } from "../repositories";

@Service()
class ScoreService {
  constructor(private scoreRepository: ScoreRepository) {}

  async findById(id: number): Promise<Score> {
    const score = await this.scoreRepository.findById(id);
    return score;
  }

  // async find(): Promise<Score[]> {
  //   const scores = await this.scoreRepository.find();
  //   return scores;
  // }
}

export default ScoreService;
