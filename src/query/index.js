import { useMutation, useQuery } from 'react-query';
import { useAxios } from './AxiosProvider';
const apiUrl = process.env.REACT_APP_API;

export const useGetCourses = () => {
  const { axios } = useAxios();
  return useQuery('courses', async () => {
    const { data } = await axios.get(apiUrl + '/courses');
    return data;
  });
};

export const getDiscussionsQueryKey = (courseId) => [courseId, 'discussions'];

export const useGetDiscussions = (courseId) => {
  const { axios } = useAxios();
  return useQuery(getDiscussionsQueryKey(courseId), async () => {
    const { data } = await axios.get(
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
  const { axios } = useAxios();
  return useQuery(getDiscussionQueryKey(discussionId), async () => {
    const { data } = await axios.get(`${apiUrl}/discussions/${discussionId}`);
    return data;
  });
};

export const useCreateDiscussion = (courseId, mutationConfig) => {
  const { axios } = useAxios();
  return useMutation(async (discussion) => {
    const { data } = await axios.post(
      `${apiUrl}/courses/${courseId}/discussions`,
      discussion
    );
    return data;
  }, mutationConfig);
};

export const useCreateComment = (discussionId, mutationConfig) => {
  const { axios } = useAxios();
  return useMutation(async (comment) => {
    const { data } = await axios.post(
      `${apiUrl}/discussions/${discussionId}/comments`,
      comment
    );
    return data;
  }, mutationConfig);
};

export const useAddStudent = (courseId, mutationConfig) => {
  const { axios } = useAxios();
  return useMutation(async (studentId) => {
    const { data } = await axios.post(
      `${apiUrl}/courses/${courseId}/students`,
      {
        id: studentId,
      }
    );
    return data;
  }, mutationConfig);
};

export const useDeleteStudent = (courseId, mutationConfig) => {
  const { axios } = useAxios();
  return useMutation(async (studentId) => {
    const { data } = await axios.delete(
      `${apiUrl}/courses/${courseId}/students`,
      {
        id: studentId,
      }
    );
    return data;
  }, mutationConfig);
};

export const useGetCourseStudents = (courseId) => {
  const { axios } = useAxios();
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
