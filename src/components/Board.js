require('normalize.css');
require('styles/App.css');

import React from 'react';
import Tile from './Tile';

var Board = React.createClass({
  getInitialState: function () {
    var boardSize = 400;
    var mod = 2;
    var tileNumber = mod * mod -1;
    var check = Math.floor(boardSize/mod);
    var emptyPosVal = boardSize - check;
    var board = [];
    for (var i = 0; i < tileNumber; i++) {
      var x = Math.floor(i % mod) * check;
      var y = Math.floor(i / mod) * check;
      var pos = {x: x, y: y};
      var startPos = {x:x, y:y};

      board.push({number: i + 1, pos: pos, startPos: startPos, boardSize: boardSize, mod: mod})
    }
    return {
      emptyPos: {
      x: emptyPosVal,
      y: emptyPosVal
    },
      board: board,
      tileNumber: tileNumber,
      boardSize: boardSize,
      mod: mod,
      check: check
    }
  },

  render: function () {
    var tiles = [];
    for (var i = 0; i < this.state.tileNumber; i++) {
      var tile = <Tile
        index={i}
        key={i}
        number={i+1}
        mod={this.state.board[i].mod}
        position={this.state.board[i].pos}
        boardSize = {this.state.board[i].boardSize}
        startPos={this.state.board[i].startPos}
        onClick={this.onTileClick}
      />;
      tiles.push(tile);
    }

    var styles = {height: this.state.boardSize, width: this.state.boardSize};
    return (
      <div>
        <div className="board" style={styles}>
          {tiles}
        </div>
      </div>);
  },
  shuffling: function () {
    var board = this.state.board;
    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }
    for(var i =0; i< board.length;i++) {
      var indexA = Math.floor(getRandomArbitrary(0,board.length));
      var indexB =  Math.floor(getRandomArbitrary(0, board.length));
      var itemA = board[indexA];
      var itemB = board[indexB];
      var temp = itemA.pos;
      itemA.pos = itemB.pos;
      itemB.pos = temp;
    }
  },
  isWinningBoard: function () {
    var board = this.state.board;
    for ( var i = 0; i<board.length; i++) {
      var pos = board[i].pos;
      var startPos = board[i].startPos;
      if( startPos.x !== pos.x || startPos.y !== pos.y ) {
        return false;
      }
    }
    alert('Great saccess');
    return true;
  },
  componentWillMount: function () {
    this.shuffling();
  },
  onTileClick: function (index) {
    var isValidMove = this.isValidMove(this.state.board[index].pos, this.state.emptyPos);
    if (!isValidMove) {
      return alert('You cannot move that tile')
    }
    var obj = {};
    obj = this.state.board[index].pos;
    this.state.board[index].pos = this.state.emptyPos;
    this.state.emptyPos = obj;
    this.forceUpdate(this.isWinningBoard);

  },

  isValidMove: function (startPos, targetPos) {
    var diffX = Math.floor(Math.abs(targetPos.x - startPos.x));
    var diffY = Math.floor(Math.abs(targetPos.y - startPos.y));
    var validX = diffX === this.state.check && diffY === 0;
    var validY = diffY === this.state.check && diffX === 0;

    return !!(validX || validY);
  }

});

export default Board;
