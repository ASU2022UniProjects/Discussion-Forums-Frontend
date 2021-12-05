import * as ax from 'axios';
import { useMutation, useQuery } from 'react-query';
const apiUrl = process.env.REACT_APP_API;

const Axios = ax.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtZXllckBnbWFpbC5jb20iLCJyb2xlIjoiU3R1ZGVudCIsImlhdCI6MTYzODczMTA5MiwiZXhwIjoxNjM4NzM4MjkyfQ.wDCrky-1F1Qh1oY75ZUSo3asrfseUpQ1lw2Tat0ZpwQ`,
  },
  timeout: 10000,
});

export const useGetCourses = () => {
  return useQuery('courses', async () => {
    const { data } = await Axios.get(apiUrl + '/courses');
    return data;
  });
};

export const getDiscussionsQueryKey = (courseId) => [courseId, 'discussions'];

export const useGetDiscussions = (courseId) => {
  return useQuery(getDiscussionsQueryKey(courseId), async () => {
    const { data } = await Axios.get(
      `${apiUrl}/courses/${courseId}/discussions`
    );
    return data;
  });
};

export const getDiscussionQueryKey = (discussionId) => [
  'Discussion',
  discussionId,
];

export const useGetDiscussion = (discussionId) => {
  return useQuery(getDiscussionQueryKey(discussionId), async () => {
    const { data } = await Axios.get(`${apiUrl}/discussions/${discussionId}`);
    return data;
  });
};

export const useCreateDiscussion = (courseId, mutationConfig) => {
  return useMutation(async (discussion) => {
    const { data } = await Axios.post(
      `${apiUrl}/courses/${courseId}/discussions`,
      discussion
    );
    return data;
  }, mutationConfig);
};

export const useCreateComment = (discussionId, mutationConfig) => {
  return useMutation(async (comment) => {
    const { data } = await Axios.post(
      `${apiUrl}/discussions/${discussionId}/comments`,
      comment
    );
    return data;
  }, mutationConfig);
};

export const useAddStudent = (courseId, mutationConfig) => {
  return useMutation(async (studentId) => {
    const { data } = await Axios.post(
      `${apiUrl}/courses/${courseId}/students`,
      {
        id: studentId,
      }
    );
    return data;
  }, mutationConfig);
};

export const useDeleteStudent = (courseId, mutationConfig) => {
  return useMutation(async (studentId) => {
    const { data } = await Axios.delete(
      `${apiUrl}/courses/${courseId}/students`,
      {
        id: studentId,
      }
    );
    return data;
  }, mutationConfig);
};

export const useGetCourseStudents = (courseId) => {
  return useQuery(['courses', courseId], async () => {
    // const { data } = await Axios.get(apiUrl + '/courses/' + courseId);
    // return data;
    return [
      {
        studentName: 'Meyer Wafik',
        email: 'meyer@gmail.com',
        pwHash: '$2a$10$RUS12epKHAsfuF8/4sIF1eTifwNdi1goTnGsZiY3A4MvpSeaAJu4S',
        userRole: 'Student',
        token: null,
        id: 1,
        createdAt: '2021-12-05T18:52:37.000Z',
        updatedAt: '2021-12-05T18:52:37.000Z',
      },
      {
        studentName: 'Meyer Wafik 2',
        email: 'meyer@gmail.com',
        pwHash: '$2a$10$RUS12epKHAsfuF8/4sIF1eTifwNdi1goTnGsZiY3A4MvpSeaAJu4S',
        userRole: 'Student',
        token: null,
        id: 22,
        createdAt: '2021-12-05T18:52:37.000Z',
        updatedAt: '2021-12-05T18:52:37.000Z',
      },
      {
        studentName: 'Meyer Wafik 3',
        email: 'meyer@gmail.com',
        pwHash: '$2a$10$RUS12epKHAsfuF8/4sIF1eTifwNdi1goTnGsZiY3A4MvpSeaAJu4S',
        userRole: 'Student',
        token: null,
        id: 33,
        createdAt: '2021-12-05T18:52:37.000Z',
        updatedAt: '2021-12-05T18:52:37.000Z',
      },
    ];
  });
};
