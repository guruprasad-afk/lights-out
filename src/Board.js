import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.3
  };

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
  }

  createBoard() {
    let board = [];
    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for (let x = 0; x < this.props.ncols; x++) {
        row.push(true);
      }
      board.push(row);
    }
    return board;
  }

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [x, y] = coord.split("-").map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    flipCell(x, y);
    flipCell(x - 1, y);
    flipCell(x + 1, y);
    flipCell(x, y - 1);
    flipCell(x, y + 1);

    let hasWon = board.every(row => row.every(cell => !cell));

    this.setState({ board, hasWon });
  }

  makeTable() {
    let tblBoard = [];
    for (let x = 0; x < this.props.nrows; x++) {
      let row = [];
      for (let y = 0; y < this.props.ncols; y++) {
        let coord = `${x}-${y}`;
        row.push(
          <Cell
            key={coord}
            isLit={this.state.board[x][y]}
            flipCellsAroundMe={() => this.flipCellsAround(coord)}
          ></Cell>
        );
      }
      tblBoard.push(<tr key={x}>{row}</tr>);
    }
    return (
      <table className="Board">
        <tbody>{tblBoard}</tbody>
      </table>
    );
  }

  render() {
    return (
      <div>
        {this.state.hasWon ? (
          <div className="winner">
            <span className="neon-orange">YOU</span>
            <span className="neon-blue">WIN!</span>
          </div>
        ) : (
          <div>
            <div className="Board-title">
              <div className="neon-orange">Lights</div>
              <div className="neon-blue">Out</div>
            </div>
            <hr></hr>
            {this.makeTable()}
            <hr></hr>
            <span className="neon-orange-disp">Turn Off All Lights</span>
          </div>
        )}
      </div>
    );
  }
}

export default Board;
