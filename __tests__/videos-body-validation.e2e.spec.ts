import request from 'supertest';
import express from 'express';
import {Resolution} from '../src/videos/types/video';
import {HttpStatus} from '../src/core/types/httpStatuses';
import {setupApp} from '../src/setupApp';

describe('Video API body validation check', () => {
  const app = express();
  setupApp(app);

  beforeAll(async() => {
    await request(app).delete('/testing/all-data').expect(HttpStatus.NO_CONTENT_204);
  });

  it('Should not create video when incorrect body; POST /videos', async() => {
    const invalidVideoResponse = await request(app)
      .post('/videos')
      .send({
        title: '',
        author: 4,
        availableResolutions: [Resolution.P1080]
      })
      .expect(HttpStatus.BAD_REQUEST_400);
 
    expect(invalidVideoResponse.body.errorMessages).toHaveLength(2);

    const invalidVideoResponse2 = await request(app)
      .post('/videos')
      .send({
        title: 'NewTitle',
        author: 'Author',
        availableResolutions: [Resolution.P1080],
        map: 'map'
      })
      .expect(HttpStatus.BAD_REQUEST_400);

    expect(invalidVideoResponse2.body.errorMessages).toHaveLength(1);

    const invalidVideoResponse3 = await request(app)
      .post('/videos')
      .send({
        title: 'NewTitle',
        author: 'Author',
        availableResolutions: [Resolution.P1080, 'P3000']
      })
      .expect(HttpStatus.BAD_REQUEST_400);

    expect(invalidVideoResponse3.body.errorMessages).toHaveLength(1);

    const invalidVideoResponse4 = await request(app)
      .post('/videos')
      .send({
        title: 'NewTitle',
      })
      .expect(HttpStatus.BAD_REQUEST_400);

    expect(invalidVideoResponse4.body.errorMessages).toHaveLength(2);
  });
});