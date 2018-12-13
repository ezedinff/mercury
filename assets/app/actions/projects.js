import api from "utils/api";

export const types = {
  GET_PROJECTS: "GET_PROJECTS",
  POST_PROJECT: "POST_PROJECT",
  PROJECT_RESPONSE: "PROJECT_RESPONSE",
  UPDATE_STORE: "UPDATE_STORE"
};

export const postProject = data => {
  //const result = api.post("/projects", data);
  return { type: types.POST_PROJECT, data };
};

export const getProject = () => {
  return { type: types.GET_PROJECTS };
};

export const projectResponse = response => ({
  type: types.PROJECT_RESPONSE,
  response
});

export const updateStore = response => {
  return { type: types.UPDATE_STORE, response };
};
