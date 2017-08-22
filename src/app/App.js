import PropTypes from 'prop-types';
import * as React from 'react';
import {connect} from 'react-redux';

import {loadData} from '../model/actions';
import World from '../view/World';

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: (data) => {
      dispatch(loadData(data));
    }
  };
};

class App extends React.Component {
  componentDidMount() {
    const {onLoad, data} = this.props;
    onLoad(data);
  }

  render() {
    return (
      <div className="App">
        <World/>
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.shape({
    people: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  onLoad: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(App);
