import { AdResponse as Ad } from './ads-repository';

export interface Game {
  id?: string;
  title: string;
  bannerUrl: string;
  _count?: {
    ads: number;
  };
}

export interface GameRepository {
  findAll(): Promise<Game[]>;
  findAllAdsByGame(gameId: string): Promise<Ad[]>;
  create(game: Game): Promise<Game>;
  remove(id: string): Promise<boolean>;
  update(id: string, game: Game): Promise<Game>;
}
