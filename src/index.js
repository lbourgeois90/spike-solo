import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import axios from 'axios';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import {takeEvery, put} from 'redux-saga/effects';
var moment = require('moment');

console.log('Date is', moment().format('YYYY-MM-DD'));
console.log('Time is', moment().format('HH:mm:ss'));

//watcher saga to take in dispatches
function* watcherSaga() {;
   yield takeEvery ('GET_CLASSES', getClassesSaga);
   yield takeEvery ('ADD_ACTIVATOR', addActivatorSaga);
   yield takeEvery ('GET_ACTIVATOR_START', getActivatorStartSaga);
   yield takeEvery ('GET_ACTIVATOR_END', getActivatorEndSaga);
   yield takeEvery ('ADD_ANSWER', addAnswerSaga);
}


function* addAnswerSaga(action) {
    console.log('in addAnswerSaga');
    try{
        yield axios.post('/spikesolo/answer', action.payload);
    }
    catch (error) {
        console.log('ERROR IN POST Answer', error);
        alert(`Sorry! Unable to add answer. Try again later.`)
    }
}

console.log('The Date Is', Date.now());

function* getClassesSaga(action){
    console.log('in getClassesSaga');
    try {
        const response = yield axios.get('/spikesolo/classes');
        console.log('Classes are', response.data);
        yield put ({type:'SET_CLASSES', payload: response.data});
    }
    catch(error) {
        console.log('ERROR IN GET CLASSES', error);
        alert(`Sorry! There was an error getting classes. Try again later.`);
    }
}

function* getActivatorStartSaga(action){
    console.log('in getActivatorStartSaga');
    try {
        const response = yield axios.get('/spikesolo/activators/start');
        console.log('Activators are', response.data);
        yield put ({type:'SET_ACTIVATOR_START', payload: response.data});
    }
    catch(error) {
        console.log('ERROR IN GET ACTIVATOR START', error);
        alert(`Sorry! There was an error getting activator start. Try again later.`);
    }
}

function* getActivatorEndSaga(action){
    console.log('in getActivatorEndSaga');
    try {
        const response = yield axios.get('/spikesolo/activators/end');
        console.log('End response is', response.data);
        yield put ({type:'SET_ACTIVATOR_END', payload: response.data});
    }
    catch(error) {
        console.log('ERROR IN GET ACTIVATOR END', error);
        alert(`Sorry! There was an error getting activator end. Try again later.`);
    }
}


function* addActivatorSaga(action) {
    console.log('in addActivatorSaga');
    try{
        yield axios.post('/spikesolo', action.payload);
    }
    catch (error) {
        console.log('ERROR IN POST ACTIVATOR', error);
        alert(`Sorry! Unable to add activator. Try again later.`)
    }
}

console.log('The Date Is', Date.now());




const getClassesReducer = ( state= [], action) => {
    switch (action.type) {
        case 'SET_CLASSES':
            return action.payload
        default:
            return state;
    }
}

const getActivatorReducer = ( state= [], action) => {
    if (action.type === 'SET_ACTIVATOR_START'){
        return action.payload
    }
    if (action.type === 'SET_ACTIVATOR_END'){
        return action.payload
    }   
    return state;
}


// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();



// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        getClassesReducer,
        getActivatorReducer,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(watcherSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();