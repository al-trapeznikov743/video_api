import {Resolution, Video} from '../videos/types/video';

export const db = {
  videos: <Video[]>[
    {
      id: 1,
      title: 'Introduction to TypeScript',
      author: 'John Doe',
      canBeDownloaded: true,
      minAgeRestriction: null,
      createdAt: '2025-03-26T10:00:00.000Z',
      publicationDate: '2025-03-27T10:00:00.000Z',
      availableResolutions: [Resolution.P720, Resolution.P1080]
    },
    {
      id: 2,
      title: 'Advanced JavaScript',
      author: 'Jane Smith',
      canBeDownloaded: false,
      minAgeRestriction: 16,
      createdAt: '2025-03-25T15:30:00.000Z',
      publicationDate: '2025-03-26T15:30:00.000Z',
      availableResolutions: [Resolution.P480, Resolution.P720]
    },
    {
      id: 3,
      title: 'React Best Practices',
      author: 'Alice Johnson',
      canBeDownloaded: true,
      minAgeRestriction: null,
      createdAt: '2025-03-24T08:45:00.000Z',
      publicationDate: '2025-03-25T08:45:00.000Z',
      availableResolutions: [Resolution.P1080, Resolution.P1440]
    },
    {
      id: 4,
      title: 'Node.js Performance Tips',
      author: 'Bob Williams',
      canBeDownloaded: false,
      minAgeRestriction: 18,
      createdAt: '2025-03-23T20:15:00.000Z',
      publicationDate: '2025-03-24T20:15:00.000Z',
      availableResolutions: [Resolution.P360, Resolution.P480, Resolution.P720]
    },
    {
      id: 5,
      title: 'Docker and Kubernetes Basics',
      author: 'Emily Brown',
      canBeDownloaded: true,
      minAgeRestriction: null,
      createdAt: '2025-03-22T12:00:00.000Z',
      publicationDate: '2025-03-23T12:00:00.000Z',
      availableResolutions: [Resolution.P144, Resolution.P240, Resolution.P360]
    }
  ]
};