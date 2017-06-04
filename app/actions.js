/* eslint-disable no-use-before-define */

import store from './store';
import axios from 'axios';

export const GET_DATA = 'GET_DATA';

export function getData() {
	return (dispatch, getState) => {
		getDataWithKey().then(function(response) {
			dispatch({ data: response, type: GET_DATA });
		});
	};
}

function getDataWithKey() {
  const api = '270385d8fdc840d29fe1d8cc54f2c1e8';
	return new Promise(function(resolve, reject) {
		axios.get(`https://newsapi.org/v1/articles?source=ars-technica&sortBy=top&apiKey=${api}`).then(function(response){
			resolve(response.data ? response.data : {});
		});
	});
}