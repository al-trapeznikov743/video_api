import {Router, Request, Response} from 'express';
import {HttpStatus} from '../../core/types/httpStatuses';
import {db} from '../../db/memory.db';
import {
  createVideoInputDtoValidation,
  updateVideoInputDtoValidation
} from '../validation/videosInputDtoValidation';
import {createErrorMessages} from '../../core/utils/error.utils';

export const videosRouter = Router();

videosRouter
  .get('', (_: Request, res: Response) => {
    res.status(HttpStatus.OK_200).send(db.videos);
  })

  .get('/:id', ({params}: Request, res: Response) => {
    const videoId = parseInt(params.id);
    const resVideo = db.videos.find(({id}) => id === videoId);

    if (!resVideo) {
      res.status(HttpStatus.NOT_FOUND_404).send(
        createErrorMessages([{field: 'id', message: 'Video not found'}])
      );

      return;
    }

    res.status(HttpStatus.OK_200).send(resVideo);
  })

  .post('', ({body}: Request, res: Response) => {
    const errors = createVideoInputDtoValidation(body);

    if (errors.length) {
      res.status(HttpStatus.BAD_REQUEST_400).send(createErrorMessages(errors));

      return;
    }

    const createdAt = new Date().toISOString();

    const nextDay = new Date(createdAt);
    nextDay.setDate(nextDay.getDate() + 1);
    const publicationDate = nextDay.toISOString();

    const newVideo = {
      ...body,
      id: Date.now(),
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: createdAt,
      publicationDate: publicationDate
    };

    db.videos.push(newVideo);

    res.status(HttpStatus.CREATED_201).send(newVideo);
  })

  .put('/:id', ({params, body}: Request, res: Response) => {
    const videoId = parseInt(params.id);
    const index = db.videos.findIndex(({id}) => id === videoId);

    if (index === -1) {
      res.status(HttpStatus.NOT_FOUND_404).send(
        createErrorMessages([{field: 'id', message: 'Video not found'}])
      );

      return;
    }

    const errors = updateVideoInputDtoValidation(body);

    if (errors.length) {
      res.status(HttpStatus.BAD_REQUEST_400).send(createErrorMessages(errors));

      return;
    }

    db.videos[index] = {
      ...db.videos[index],
      ...body
    };

    res.sendStatus(HttpStatus.NO_CONTENT_204);
  })

  .delete('/:id', ({params}: Request, res: Response) => {
    const videoId = parseInt(params.id);
    const index = db.videos.findIndex(({id}) => id === videoId);

    if (index === -1) {
      res.status(HttpStatus.NOT_FOUND_404).send(
        createErrorMessages([{field: 'id', message: 'Video not found'}])
      );

      return;
    }

    db.videos.splice(index, 1);

    res.sendStatus(HttpStatus.NO_CONTENT_204);
  });