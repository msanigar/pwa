/* eslint-disable no-use-before-define */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { loadState, saveState } from './localStorage';
import { GET_DATA } from './actions';

const mainReducer = (state = initialState, action) => {

	if (action.type === GET_DATA) {
		return getData(state, action);
	}

	return state;
};

function getData(state, action) {
	var newState = Object.assign({}, state);
	var obj = action.data;
	newState.data = obj;
  newState.ready = true;
	return newState;
}

const initialState = {
	data: {},
  ready: false
};

let store;
const persistedState = loadState(initialState);

if (process.env.NODE_ENV === 'development') {
	// eslint-disable-line no-process-env
	store = createStore(
		mainReducer,
		persistedState,
		compose(
			applyMiddleware(thunk),
			window.__REDUX_DEVTOOLS_EXTENSION__
				? window.__REDUX_DEVTOOLS_EXTENSION__()
				: f => f
		)
	);

	if (window.devToolsOptions) {
		window.devToolsOptions.shouldCatchErrors = false;
	}
} else {
	store = createStore(
		mainReducer,
		persistedState,
		compose(applyMiddleware(thunk))
	);
}

store.subscribe(() => {
	saveState(store.getState());
});

export default store;
