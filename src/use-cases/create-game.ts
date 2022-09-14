import { Game, GameRepository } from '../repository';

export interface CreateGameRequest {
  title: string;
  bannerUrl: string;
}

export type CreateGameResponse = Game;

export class CreateGame {
  async execute({
    title,
    bannerUrl,
  }: CreateGameRequest): Promise<CreateGameResponse> {
    const game = await this.gameRepo.create({ title, bannerUrl });
    return game;
  }

  constructor(private gameRepo: GameRepository) {}
}
