import { Request, Response } from 'express';
import { PrismaAdsRepository } from '../repository/prisma';

import { GetDiscordByAd } from '../use-cases';

const adsRepository = new PrismaAdsRepository();

export class AdController {
  static async getDiscord(request: Request, response: Response) {
    const adId = request.params.id;

    const getDiscordByAd = new GetDiscordByAd(adsRepository);

    const ad = await getDiscordByAd.execute({ adId });

    return response.status(200).json({
      discord: ad.discord,
    });
  }
}
