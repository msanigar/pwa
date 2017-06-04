import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Article = props => (
  <div className="article">
    <strong className="title">{props.title}</strong>
    <blockquote>{props.description}</blockquote>
    <img src={props.urlToImage} />
    <p><a href={props.url}>{props.url}</a></p>
    <p><em>Author: {props.author}</em></p>
  </div>
);

export default Article;
