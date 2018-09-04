import React, { Fragment } from 'react';
import Link from 'next/link'

import { blue, darkerBlue } from '../variables';

const A = ({href, children}) => (
  <Fragment>
    <a href={href}>{children}</a>
    <style jsx>{`
    a {
      color: ${blue};
      font-weight: 600;
    }
    a:active {
      color: ${darkerBlue};
    }
    `}</style>
  </Fragment>
);

export default A;
