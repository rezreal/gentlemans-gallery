import { FunctionComponent } from 'react';

import './Cursor.css';
import { RegionType } from './rules';
import * as React from 'react';

function calculateStyle(size: number, position: { x: number; y: number }) {
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
  hint?: RegionType;
}

export const Cursor: FunctionComponent<Props> = ({ position, size, hint }) => (
  <div
    className="cursor"
    data-hint={hint}
    style={calculateStyle(size, position)}
  >
    <div className="lds-ripple">
      <div></div>
    </div>
  </div>
);
