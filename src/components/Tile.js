require('normalize.css');
require('styles/App.css');

import React from 'react';

var Tile = React.createClass({

  onClick: function () {
    this.props.onClick(this.props.index)
  },

  render: function () {
    var pos = this.props.position;
    var startPos = this.props.startPos;
    var boardSize = this.props.boardSize;
    var mod = this.props.mod;
    var style = {left: pos.x, top: pos.y, backgroundSize:boardSize, backgroundPositionX: -startPos.x, backgroundPositionY:-startPos.y, width:boardSize/mod, height:boardSize/mod};

    return (
      <div className="tile" style={style} onClick={this.onClick}>
      </div>);
  }
});

export  default Tile;
