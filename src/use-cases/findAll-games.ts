import { GameRepository, Game } from '../repository';

export interface FindAllGamesRequest {}

export type FindAllGamesResponse = Game[];

export class FindAllGames {
  async execute(): Promise<FindAllGamesResponse> {
    const games = this.gameRepo.findAll();
    return games;
  }

  constructor(private gameRepo: GameRepository) {}
}
