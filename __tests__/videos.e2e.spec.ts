import request from 'supertest';
import express from 'express';
import {Resolution} from '../src/videos/types/video';
import {HttpStatus} from '../src/core/types/httpStatuses';
import {setupApp} from '../src/setupApp';
import {CreateVideoInputDto} from '../src/videos/dto/video.input-dto';

describe('Video API', () => {
  const app = express();
  setupApp(app);

  const testVideoForCreate: CreateVideoInputDto = {
    title: 'NewVideo',
    author: 'Author',
    availableResolutions: [Resolution.P1080]
  };

  beforeAll(async() => {
    await request(app).delete('/testing/all-data').expect(HttpStatus.NO_CONTENT_204);
  });

  it('Should return videos; GET /videos', async() => {    
    await request(app)
      .post('/videos')
      .send(testVideoForCreate)
      .expect(HttpStatus.CREATED_201);
    
    await request(app)
      .post('/videos')
      .send(testVideoForCreate)
      .expect(HttpStatus.CREATED_201);

    const resVideos = await request(app)
      .get('/videos')
      .expect(HttpStatus.OK_200);

    expect(resVideos.body).toBeInstanceOf(Array);
    expect(resVideos.body.length).toBeGreaterThanOrEqual(2);
  });

  it('Should create video; POST /videos', async() => {
    const createdVideoResponse = await request(app)
      .post('/videos')
      .send(testVideoForCreate)
      .expect(HttpStatus.CREATED_201);
 
    expect(createdVideoResponse.body.title).toBe(testVideoForCreate.title);
  });

  it('Should return video by id; GET /videos/:id', async() => {
    const createdVideoResponse = await request(app)
      .post('/videos')
      .send(testVideoForCreate)
      .expect(HttpStatus.CREATED_201);

    const resVideo = await request(app)
      .get(`/videos/${createdVideoResponse.body.id}`)
      .expect(HttpStatus.OK_200);

    expect(resVideo.body).toEqual({
      ...resVideo.body,
      id: expect.any(Number),
      createdAt: expect.any(String)
    });
  });
});