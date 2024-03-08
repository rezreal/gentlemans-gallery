import { FunctionComponent } from 'react';

import './VideoCursor.css';
import * as React from 'react';

function calculateStyle(
  size: number,
  position: { x: number; y: number },
  doing: number
) {
  return {
    top: position.y - size / 2,
    left: position.x - size / 2,
    width: size,
    height: size,
  };
}

interface Props {
  position: { x: number; y: number };
  size: number;
  doing: number;
}

export const VideoCursor: FunctionComponent<Props> = ({
  position,
  size,
  doing,
}) => (
  <div className="videoCursor" style={calculateStyle(size, position, doing)}>
    <div className="lds-ripple">
      <div
        style={{
          borderColor: `color-mix(in srgb, white, ${
            doing < 0 ? 'red' : 'green'
          } ${Math.abs(doing)}%)`,
        }}
      ></div>
    </div>
  </div>
);
