export type MovieResponseType = {
  source: string; // Источник видео
  iframeUrl: string | null; // URL для встраивания, может быть null
  translations: Translation[]; // Массив переводов
  success: boolean; // Статус успешности
  updatedAt: string; // Дата последнего обновления
}[];

export type Translation = {
  id: number | null; // ID перевода, может быть null
  name: string | null; // Название перевода, может быть null
  quality: string | null; // Качество видео, может быть null
  iframeUrl: string; // URL для перевода
};
