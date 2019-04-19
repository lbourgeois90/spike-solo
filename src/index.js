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
var moment = require('moment-timezone');

console.log('Date is', moment().format('YYYY-MM-DD'));
console.log('Time is', moment().format('HH:mm:ss'));

//watcher saga to take in dispatches
function* watcherSaga() {
   yield takeEvery ('GET_CLASSES', getClassesSaga)
   yield takeEvery ('ADD_ACTIVATOR', addActivatorSaga)
}

function* getClassesSaga(action){
    console.log('in getClassesSaga');
    try {
        const response = yield axios.get('/spikesolo');
        console.log('Response is', response);
        yield put ({type:'SET_CLASSES', payload: response.data});
    }
    catch(error) {
        console.log('ERROR IN GET CLASSES', error);
        alert(`Sorry! There was an error getting classes. Try again later.`);
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



// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();



// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        getClassesReducer,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(watcherSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();