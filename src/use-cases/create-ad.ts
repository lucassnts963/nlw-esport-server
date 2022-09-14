import { Ad, AdsRepository } from '../repository';

export interface CreateAdRequest {
  gameId: string;
  name: string;
  yearsPlaying: number;
  discord: string;
  weekDays: string;
  hourStart: number;
  hourEnd: number;
  useVoiceChannel: boolean;
}

export type CreateAdResponse = Ad;

export class CreateAd {
  async execute({
    gameId,
    name,
    yearsPlaying,
    discord,
    weekDays,
    hourStart,
    hourEnd,
    useVoiceChannel,
  }: CreateAdRequest): Promise<CreateAdResponse> {
    const ad = await this.adRepo.create({
      gameId,
      name,
      yearsPlaying,
      discord,
      weekDays,
      hourStart,
      hourEnd,
      useVoiceChannel,
    });
    return ad;
  }

  constructor(private adRepo: AdsRepository) {}
}
