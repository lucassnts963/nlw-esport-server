import { AdsRepository } from '../repository';

export interface GetDiscordByAdRequest {
  adId: string;
}

export interface GetDiscordByAdResponse {
  discord: string;
}

export class GetDiscordByAd {
  async execute({
    adId,
  }: GetDiscordByAdRequest): Promise<GetDiscordByAdResponse> {
    const ad = await this.adRepo.getDiscordByAd(adId);

    return ad;
  }

  constructor(private adRepo: AdsRepository) {}
}
