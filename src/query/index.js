import Axios from 'axios';
import { useMutation, useQuery } from 'react-query';

const apiUrl = process.env.REACT_APP_API;

export const useGetCourses = () => {
  return useQuery('courses', async () => {
    const { data } = await Axios(apiUrl + '/courses');
    return data;
  });
};
export const useGetDiscussions = (courseId) => {
  return useQuery([courseId, 'discussions'], async () => {
    const { data } = await Axios.get(
      `${apiUrl}/courses/${courseId}/discussions`
    );
    return data;
  });
};
export const useGetDiscussion = (courseId, discussionId) => {
  return useQuery(['Discussion', discussionId], async () => {
    const { data } = await Axios.get(
      `${apiUrl}/courses/${courseId}/discussions/${discussionId}`
    );
    return data;
  });
};
export const useCreateDiscussion = (courseId) => {
  return useMutation(async (discussion) => {
    const { data } = await Axios.post(
      `${apiUrl}/courses/${courseId}/discussions`,
      JSON.stringify(discussion)
    );
    return data;
  });
};
export const useCreateComment = (courseId, discussionId) => {
  return useMutation(async (comment) => {
    const { data } = await Axios.post(
      `${apiUrl}/courses/${courseId}/discussions/${discussionId}/comments`,
      JSON.stringify(comment)
    );
    return data;
  });
};
