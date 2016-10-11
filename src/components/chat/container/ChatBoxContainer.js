// @flow

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Wrapped from '../ChatBox';
import { addUser, addMessage } from '../../../ducks/chat';

export default connect(
  state => ({
    users: state.chat.get('users'),
    messages: state.chat.get('messages'),
  }),
  dispatch => bindActionCreators({
  }, dispatch)
  )(Wrapped);
