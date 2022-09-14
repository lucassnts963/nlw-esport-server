import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const routes = Router();

routes.get('/ads/:id/discord', async (req, res) => {
  const adId = req.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  return res.status(200).json({
    discord: ad.discord,
  });
});

export default routes;
