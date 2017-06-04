import React, { Component } from 'react';
import store from '../store';
import * as actions from '../actions';
import Article from './Article';

import '../assets/scss/main.scss';

class Ars extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		let { data, ready } = store.getState();
		this.state = {
			data,
      ready,
			unsubscribe: store.subscribe(this.onStoreUpdated.bind(this))
		};
	}

	componentWillUnmount() {
		this.state.unsubscribe();
	}

  componentDidMount() {
    store.dispatch(actions.getData());
  }

	onStoreUpdated() {
		let { data, ready } = store.getState();

		this.setState({
			data,
      ready
		});
	}

	render() {
		if(this.state.ready === true) {
      return (
			<section className="container">
      <h1>{ this.state.data.source }</h1>
      { this.state.data.articles.map(article => <Article key={article.publishedAt} {...article} />) }
			</section>
		);
    } else {
      return (
        <div>
        <p>Error fetching data :(</p>
        </div>
      )
    }
	}
}

export default Ars;
