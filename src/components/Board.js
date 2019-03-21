import React from 'react';
import Square from './Square.js';

export default class Board extends React.Component {

  renderSquare(index) {
    return <Square value={this.props.squares[index]} onClick={() => this.props.onClick(index)} />;
  }

  render() {
    let square = -1;
    return (
      <div>
      {
        [1,2,3].map(() => {
				  return <div className="board-row">
            {
            	[1,2,3].map( () => {
                square ++;
          			return (this.renderSquare(square))
          		})
            }
          </div>
      	})
      }
      </div>
    );
  }
}
