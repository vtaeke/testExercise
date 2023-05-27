export type Review = {
  name: string;
  review: string;
  date: string;
};

export type LanguageReviews = {
  [key: string]: {
    [key: string]: Review;
  };
};

export type ReviewsData = {
  ru: LanguageReviews;
  en: LanguageReviews;
};
