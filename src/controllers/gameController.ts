import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { convertMinutesToHoursString } from '../utils/convert-minutes-to-hours-string';
import { convertHourStringToMinutes } from '../utils/convert-hour-string-to-minutes';

const prisma = new PrismaClient();

export class GameController {
  static async findAll(request: Request, response: Response) {
    const games = await prisma.game.findMany({
      include: {
        _count: {
          select: {
            ads: true,
          },
        },
      },
    });
    return response.status(200).json(games);
  }
  static async create(request: Request, response: Response) {
    const body: any = request.body;
    const game = await prisma.game.create({
      data: {
        title: body.title,
        bannerUrl: body.bannerUrl,
      },
    });

    return response.status(201).json(game);
  }
  static async findAllAdsByGame(request: Request, response: Response) {
    const gameId: string = request.params.id;
    const ads = await prisma.ad.findMany({
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
    return response.status(200).json(
      ads.map((ad) => {
        return {
          ...ad,
          weekDays: ad.weekDays.split(','),
          hourStart: convertMinutesToHoursString(ad.hourStart),
          hourEnd: convertMinutesToHoursString(ad.hourEnd),
        };
      })
    );
  }
  static async createAdForAGame(request: Request, response: Response) {
    const gameId: string = request.params.id;
    const body: any = request.body;

    //TODO: Validação (Zod JavaScript)

    const ad = await prisma.ad.create({
      data: {
        gameId,
        name: body.name,
        yearsPlaying: body.yearsPlaying,
        discord: body.discord,
        weekDays: body.weekDays.join(','),
        hourStart: convertHourStringToMinutes(body.hourStart),
        hourEnd: convertHourStringToMinutes(body.hourEnd),
        useVoiceChannel: body.useVoiceChannel,
      },
    });

    return response.status(201).json(ad);
  }
}
