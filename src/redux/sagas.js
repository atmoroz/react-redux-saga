import { takeEvery, put, call } from "redux-saga/effects";
import { REQUEST_POST, FETCH_POST } from "./types";
import { showLoader, hideLoader, showAlert } from "./action";

export function* sagaWatcher() {
  yield takeEvery(REQUEST_POST, sagaWorker);
}

function* sagaWorker() {
  try {
    yield put(showLoader());
    const payload = yield call(fetchPost);
    yield put({ type: FETCH_POST, payload });
    yield put(hideLoader());
  } catch (error) {
    yield put(showAlert("Что-то пошло не так"));
    yield put(hideLoader());
  }
}

async function fetchPost() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  return await response.json();
}
