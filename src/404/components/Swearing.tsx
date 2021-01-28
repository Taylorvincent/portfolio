import * as React from 'react';
import { Word } from '../interfaces';

interface Props{
  golfer_top: number
  words: Word[]
}

const Swearing = (props: Props) => {

  return (
    <div className="swearing-container" style={{ top: props.golfer_top }}>
      <div>
        {props.words.map((word, key) => {
          return <div key={key} className="swearing" style={{ marginLeft: word.margin.left, marginTop: word.margin.top }}>{word.text}</div>
        })}
      </div>
    </div>
  );

}

export default Swearing;
