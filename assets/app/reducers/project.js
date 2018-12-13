import { types as projectTypes } from "../actions/projects";

const initialState = {
  projects: [],
  newProject: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case projectTypes.UPDATE_STORE:
      return {
        ...state,
        projects: action.response.data
      };

    case projectTypes.PROJECT_RESPONSE:
      return {
        ...state,
        newProject: action.response.data
      };

    default:
      return state;
  }
}
