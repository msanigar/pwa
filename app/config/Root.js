import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Ars from '../components/Ars';

import { Provider } from 'react-redux';
import store from '../store';

export default class Root extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div>
          <header>
            <div className="container">
              <i className="fa fa-code"></i>
            </div>
          </header>
					<main className="wrapper">
						<div className="row">
							<Route exact path="/pwa" component={ Ars } />
						</div>
					</main>
					</div>
				</Router>
			</Provider>
		);
	}
}
