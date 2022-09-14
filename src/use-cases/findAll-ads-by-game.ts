import { GameRepository, AdResponse } from '../repository';

export interface FindAllAdsByGameRequest {
  gameId: string;
}

export type FindAllAdsByGameResponse = AdResponse[];

export class FindAllAdsByGame {
  async execute({
    gameId,
  }: FindAllAdsByGameRequest): Promise<FindAllAdsByGameResponse> {
    const ads = this.gameRepo.findAllAdsByGame(gameId);
    return ads;
  }

  constructor(private gameRepo: GameRepository) {}
}
