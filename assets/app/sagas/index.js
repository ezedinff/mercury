import { fork } from "redux-saga/effects";
import Session from "sagas/session";
import Project from "sagas/project";

const sagas = [...Session, ...Project];

export default function* root() {
  yield sagas.map(saga => fork(saga));
}
