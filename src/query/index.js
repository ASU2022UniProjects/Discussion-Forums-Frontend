import { useMutation, useQuery } from 'react-query';
import { useAxios } from './AxiosProvider';
const apiUrl = process.env.REACT_APP_API;

export const useLogin = (mutationConfig) => {
  const { axios } = useAxios();
  return useMutation(async (body) => {
    const { data } = await axios.post(apiUrl + '/login', body);
    return data;
  }, mutationConfig);
};

export const coursesQueryKey = 'courses';
export const useGetCourses = () => {
  const { axios } = useAxios();
  return useQuery(coursesQueryKey, async () => {
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
    const { data } = await axios.get(
      `${apiUrl}/discussions/${discussionId}/comments`
    );
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
  return useMutation(async ({ content, discussionIdParam }) => {
    const { data } = await axios.post(
      `${apiUrl}/discussions/${discussionId || discussionIdParam}/comments`,
      { content: 'sdasd' }
    );
    return data;
  }, mutationConfig);
};

export const useAddStudent = (courseId, mutationConfig) => {
  const { axios } = useAxios();
  return useMutation(async (studentId) => {
    const { data } = await axios.post(
      `${apiUrl}/courses/${courseId}/users/${studentId}`
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

export const getCourseStudentsQueryKey = (courseId) => ['courses', courseId];
export const useGetCourseStudents = (courseId) => {
  const { axios } = useAxios();
  return useQuery(getCourseStudentsQueryKey(courseId), async () => {
    const { data } = await axios.get(
      apiUrl + '/courses/' + courseId + '/users'
    );
    return data;
  });
};

export const useDeleteComment = (commentId, mutationConfig) => {
  const { axios } = useAxios();
  return useMutation(async () => {
    const { data } = await axios.delete(`${apiUrl}/comments/${commentId}`);
    return data;
  }, mutationConfig);
};

export const useDeleteDiscussion = (discussionId, mutationConfig) => {
  const { axios } = useAxios();
  return useMutation(async () => {
    const { data } = await axios.delete(
      `${apiUrl}/discussions/${discussionId}`
    );
    return data;
  }, mutationConfig);
};

export const useCreateCourse = (mutationConfig) => {
  const { axios } = useAxios();
  return useMutation(async (course) => {
    const { data } = await axios.post(`${apiUrl}/courses`, course);
    return data;
  }, mutationConfig);
};

export const useDeleteCourse = (courseId, mutationConfig) => {
  const { axios } = useAxios();
  return useMutation(async () => {
    const { data } = await axios.delete(`${apiUrl}/courses/${courseId}`);
    return data;
  }, mutationConfig);
};
