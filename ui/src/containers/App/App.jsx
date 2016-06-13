// Deps
import React from 'react';
import { connect } from 'react-redux';

// Styles
import reset from 'normalize.css';
import icons from '../../assets/font/css/open-iconic.css';
import fontAwesome from '../../assets/font/css/font-awesome.css';
import styles from '../../components/Global/global.css';

function App({ pushPath, children }) {
  return children;
}

export default connect(
  state => ({})
)(App);
