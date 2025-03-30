import {Resolution} from '../types/video';

export const createVideoFieldsEnum = [
  'title', 'author', 'availableResolutions'
];

export const updateVideoFieldsEnum = [
  'title',
  'author',
  'availableResolutions',
  'canBeDownloaded',
  'minAgeRestriction',
  'publicationDate'
];

export type CreateVideoInputDto = {
  title: string;
  author: string;
  availableResolutions: Resolution[];
};

export type UpdateVideoInputDto = {
  title: string;
  author: string;
  availableResolutions: Resolution[];
  canBeDownloaded: boolean;
  minAgeRestriction: number | null;
  publicationDate: string;
};