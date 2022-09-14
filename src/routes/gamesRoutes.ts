import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

import { convertMinutesToHoursString } from '../utils/convert-minutes-to-hours-string';
import { convertHourStringToMinutes } from '../utils/convert-hour-string-to-minutes';

const routes = Router();

const prisma = new PrismaClient();

routes.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });
  return res.status(200).json(games);
});

routes.post('/games', async (req, res) => {
  return res.status(201).json([]);
});

routes.get('/games/:id/ads', async (req, res) => {
  const gameId: string = req.params.id;
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
  return res.status(200).json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(','),
        hourStart: convertMinutesToHoursString(ad.hourStart),
        hourEnd: convertMinutesToHoursString(ad.hourEnd),
      };
    })
  );
});

routes.post('/games/:id/ads', async (req, res) => {
  const gameId: string = req.params.id;
  const body: any = req.body;

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

  return res.status(201).json(ad);
});

export default routes;
