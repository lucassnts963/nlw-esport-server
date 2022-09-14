import { PrismaClient } from '@prisma/client';

import { Game, GameRepository } from '../game-repository';
import { Ad } from '../ads-repository';

export class PrismaGameRepository implements GameRepository {
  private prisma = new PrismaClient();
  async findAll() {
    const games = await this.prisma.game.findMany({
      include: {
        _count: {
          select: {
            ads: true,
          },
        },
      },
    });

    return games;
  }
  async findAllAdsByGame(gameId: string) {
    const ads = await this.prisma.ad.findMany({
      select: {
        id: true,
        name: true,
        weekDays: true,
        useVoiceChannel: true,
        yearsPlaying: true,
        hourStart: true,
        hourEnd: true,
      },
      where: {
        gameId,
      },
      orderBy: {
        createAt: 'desc',
      },
    });

    return ads;
  }
  async create({ title, bannerUrl }: Game) {
    const game = await this.prisma.game.create({
      data: {
        title,
        bannerUrl,
      },
    });

    return game;
  }
  remove(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  update(id: string, game: Game): Promise<Game> {
    throw new Error('Method not implemented.');
  }
}
