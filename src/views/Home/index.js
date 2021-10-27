// Dependencies
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Redux Actions
import * as actions from '../../redux/stores/global/actions';
import * as moviesActions from '../../redux/stores/movies/actions';

// View
import View from './HomeView';

/**
 * Map state to props
 * @returns { object }
 */
export const mapStateToProps = state => ({
  loading: state.getIn(['AppState', 'loading']),
  user: state.getIn(['AppState', 'user']),
  response: state.getIn(['AppState', 'response']).toJS(),
  favorites: state.getIn(['AppState', 'favorites']),
});

/**
 * Map dispatch to props
 * @param dispatch - Run the  process to execute in the action
 * @returns { object }
 */
export const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  moviesActions: bindActionCreators(moviesActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
