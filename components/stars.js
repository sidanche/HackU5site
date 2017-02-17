import React from 'react'

export default class extends React.Component {
  render() {
    return (
      <div>
        <style>
        {`
          .flex {
            display: -webkit-flex;
            display: flex;
            -webkit-flex-direction: row;
            flex-direction: row;
            justify-content: center;
          }
          .stars {
              width: 100%;
              max-width: 400px;
              margin: 0 auto 1rem;
          }
          .star {
            -webkit-clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
            clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
            width: 80px;
            height: 80px;
            background-color: #BDBDBD;
            -moz-transition: background-color 400ms cubic-bezier(.4,0,.2,1);
            -webkit-transition: background-color 400ms cubic-bezier(.4,0,.2,1);
            -o-transition: background-color 400ms cubic-bezier(.4,0,.2,1);
            transition: background-color 400ms cubic-bezier(.4,0,.2,1);
          }
          .stars.one div:nth-child(1), 
          .stars.two div:nth-child(-n+2), 
          .stars.three div:nth-child(-n+3),
          .stars.four div:nth-child(-n+4),
          .stars.five div 
          {
              background-color: rgb(240, 179, 35);
              -moz-transition: background-color 400ms cubic-bezier(.4,0,.2,1);
              -webkit-transition: background-color 400ms cubic-bezier(.4,0,.2,1);
              -o-transition: background-color 400ms cubic-bezier(.4,0,.2,1);
              transition: background-color 400ms cubic-bezier(.4,0,.2,1);
          }    
        `}
        </style>
        <div className={this.props.stars}>
          <div className="star"/>
          <div className="star"/>
          <div className="star"/>
          <div className="star"/>
          <div className="star"/>
        </div>
        </div>
      )
  }
}