import React, { Fragment } from 'react';
import Link from 'next/link'

import { blue, darkerBlue } from '../variables';

const A = ({href, onClick, children}) => (
  <Fragment>
    {href ? (
      <a href={href}>{children}</a>
    ) : (
      <a onClick={onClick}>{children}</a>
    )}
    <style jsx>{`
    a {
      color: ${blue};
      font-weight: 600;
      text-decoration: underline;
      user-select: none;
      cursor: pointer;
    }
    a:active {
      color: ${darkerBlue};
    }
    `}</style>
  </Fragment>
);

export default A;
