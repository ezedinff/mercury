import { select } from "redux-saga/effects";
import { takeEvery } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { push } from "react-router-redux";
import { reset } from "redux-form";

import api from "utils/api";
import { types as projectTypes } from "../actions/projects";
import { types as errorTypes } from "actions/errors";

// addProject

function* watchAndLog() {
  yield takeEvery("*", function* logger(action) {
    const state = yield select();

    console.log("action triggered---->:", action);
    console.log("state after action ---->:", state);
  });
}

function addProject(data) {
  return api.post("/projects", data);
}

function getAllProjects(data) {
  return api.fetch("/projects");
}

function* callGetAllProjects() {
  const result = yield call(getAllProjects);
  if (result.data.data) {
    yield put({
      type: projectTypes.UPDATE_STORE,
      response: result.data
    });
  } else {
    yield put({ type: errorTypes.NEW_ERROR, message: result.data.errors });
  }
}

function* calladdProject({ data }) {
  const result = yield call(addProject, data);
  if (result.data.data) {
    yield put({ type: projectTypes.GET_PROJECTS });
    yield put({
      type: projectTypes.PROJECT_RESPONSE,
      response: result.data
    });
  } else {
    yield put({ type: errorTypes.NEW_ERROR, message: result.data.errors });
  }
}

function* addProjectSaga() {
  yield* takeEvery(projectTypes.POST_PROJECT, calladdProject);
}

function* getAllProjectSaga() {
  yield* takeEvery(projectTypes.GET_PROJECTS, callGetAllProjects);
}

export default [addProjectSaga, getAllProjectSaga];
