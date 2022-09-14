export interface Ad {
  id?: string;
  gameId: string;
  name: string;
  yearsPlaying: number;
  discord: string;
  weekDays: string;
  hourStart: number;
  hourEnd: number;
  useVoiceChannel: boolean;
  createAt?: Date;
}

export interface AdResponse {
  id?: string;
  name: string;
  weekDays: string;
  useVoiceChannel: boolean;
  yearsPlaying: number;
  hourStart: number;
  hourEnd: number;
}

export interface AdsRepository {
  create(ad: Ad): Promise<Ad>;
  getDiscordByAd(adsId: string): Promise<{ discord: string }>;
}
