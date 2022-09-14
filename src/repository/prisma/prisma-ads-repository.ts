import { PrismaClient } from '@prisma/client';
import { Ad, AdsRepository } from '../ads-repository';

export class PrismaAdsRepository implements AdsRepository {
  private prisma = new PrismaClient();
  async create({
    gameId,
    name,
    yearsPlaying,
    discord,
    weekDays,
    hourStart,
    hourEnd,
    useVoiceChannel,
  }: Ad) {
    const ad = await this.prisma.ad.create({
      data: {
        gameId,
        name,
        yearsPlaying,
        discord,
        weekDays,
        hourStart,
        hourEnd,
        useVoiceChannel,
      },
    });

    return ad;
  }
  async getDiscordByAd(adId: string) {
    const ad = await this.prisma.ad.findUniqueOrThrow({
      select: {
        discord: true,
      },
      where: {
        id: adId,
      },
    });

    return ad;
  }
}
