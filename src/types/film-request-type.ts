export type FilmRequestType = {
  keyword: string;
  pagesCount: number;
  films: Film[];
  searchFilmsCountResult: number;
};

export type Film = {
  filmId: number;
  nameRu?: string;
  nameEn: string;
  type: string;
  year: string;
  description?: string;
  filmLength: string;
  countries: Country[];
  genres: Genre[];
  rating: string;
  ratingVoteCount: number;
  posterUrl: string;
  posterUrlPreview: string;
};

export type Country = {
  country: string;
};

export type Genre = {
  genre: string;
};
