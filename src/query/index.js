import Axios from 'axios';
import { useMutation, useQuery } from 'react-query';

const apiUrl = process.env.REACT_APP_API;

export const useGetCourses = () => {
  return useQuery('courses', async () => {
    const { data } = await Axios.get(apiUrl + '/courses');
    return data;
  });
};

export const getDiscussionsQueryKey = (courseId) => [courseId, 'discussions']

export const useGetDiscussions = (courseId) => {
  return useQuery(getDiscussionsQueryKey(courseId), async () => {
    const { data } = await Axios.get(
      `${apiUrl}/courses/${courseId}/discussions`
    );
    return data;
  });
};

export const useGetDiscussion = (discussionId) => {
  return useQuery(['Discussion', discussionId], async () => {
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

export const useCreateComment = (discussionId) => {
  return useMutation(async (comment) => {
    const { data } = await Axios.post(
      `${apiUrl}/discussions/${discussionId}/comments`,
      comment
    );
    return data;
  });
};
