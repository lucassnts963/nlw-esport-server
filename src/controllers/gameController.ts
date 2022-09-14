import { Request, Response } from 'express';

import {
  convertMinutesToHoursString,
  convertHourStringToMinutes,
} from '../utils';

import {
  FindAllGames,
  CreateGame,
  FindAllAdsByGame,
  CreateAd,
} from '../use-cases';

import {
  PrismaGameRepository,
  PrismaAdsRepository,
} from '../repository/prisma';

const gameRepository = new PrismaGameRepository();
const adRepository = new PrismaAdsRepository();

export class GameController {
  static async findAll(request: Request, response: Response) {
    const findAllGames = new FindAllGames(gameRepository);
    const games = await findAllGames.execute();
    return response.status(200).json(games);
  }
  static async create(request: Request, response: Response) {
    //TODO: Validação (Zod JavaScript)
    const body: any = request.body;
    const createGame = new CreateGame(gameRepository);
    const game = await createGame.execute({
      title: body.title,
      bannerUrl: body.bannerUrl,
    });

    return response.status(201).json(game);
  }
  static async findAllAdsByGame(request: Request, response: Response) {
    const gameId: string = request.params.id;
    const findAllAds = new FindAllAdsByGame(gameRepository);
    const ads = await findAllAds.execute({ gameId });

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

    const createAd = new CreateAd(adRepository);

    //TODO: Validação (Zod JavaScript)

    const ad = await createAd.execute({
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    });

    return response.status(201).json(ad);
  }
}
