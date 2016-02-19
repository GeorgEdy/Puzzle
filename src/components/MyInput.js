require('normalize.css');
require('styles/App.css');

import React from 'react';
import Board from './Board';

var MyInput = React.createClass({
  render: function () {
    return (
      <div>
        <input type="number"/>
      </div>
    )
  }
});
export default MyInput;
