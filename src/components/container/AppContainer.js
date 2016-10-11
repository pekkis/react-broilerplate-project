// @flow

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Wrapped from '../App';
import { getTodos } from '../../ducks/todo';

export default connect(
  () => ({}),
  dispatch => bindActionCreators({
    getTodos,
  }, dispatch)
  )(Wrapped);
