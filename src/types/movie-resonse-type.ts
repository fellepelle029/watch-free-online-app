export type MovieResponseType = {
  source: string;
  iframeUrl: string | null;
  translations: Translation[];
  success: boolean;
  updatedAt: string;
}[];

export type Translation = {
  id: number | null;
  name: string | null;
  quality: string | null;
  iframeUrl: string;
};
