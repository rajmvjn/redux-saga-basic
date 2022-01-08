import { takeEvery, takeLatest, take, call, fork, put } from 'redux-saga/effects';
import * as actions from '../actions/users';
import * as apis from '../api/users';

function* getUsers() {
    try {
        const result = yield call(apis.getUsers);
        yield put(actions.getUsersSuccess({items: result.data.data}));        
    } catch (error) {
        yield put(actions.usersError({error: 'api call errored'})) 
    }
}

function* watchGetUsersRequest() {
    yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

function* createUser(action) {
    try {
        yield call(apis.createUser, { firstName: action.payload.firstName, lastName: action.payload.lastName });
        yield call(getUsers);
    } catch (error) {
        yield put(actions.usersError({error: 'api call errored'})) 
    }
}

function* watchCreateUserRequest() {
    yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser)
}


function* deleteUser({userId}) {
    try {
        yield call(apis.deleteUser, userId);
        yield call(getUsers);
    } catch (e) {
        yield put(actions.usersError({error: 'api call errored'}))        
    }
}

function* watchDeleteUserRequest() {
    while(true) {
        const action = yield take(actions.Types.DELETE_USER_REQUEST);
        yield call(deleteUser, {
            userId: action.payload.userId
        })
    }
}

const usersSagas = [
    fork(watchGetUsersRequest),
    fork(watchCreateUserRequest),
    fork(watchDeleteUserRequest)
]

export default usersSagas;