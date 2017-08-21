import PropTypes from 'prop-types';
import * as React from 'react';
import { connect } from 'react-redux';

import { loadData } from '../model/actions';

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: (data) => {
      dispatch(loadData(data));
      console.log('onLoad');
      console.log(data);
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
        <h1>app</h1>
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.object
};

export default connect(null, mapDispatchToProps)(App);
