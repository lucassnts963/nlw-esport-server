import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AdController {
  static async getDiscord(request: Request, response: Response) {
    const adId = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
      select: {
        discord: true,
      },
      where: {
        id: adId,
      },
    });

    return response.status(200).json({
      discord: ad.discord,
    });
  }
}
