import React from 'react';
import classnames from 'classnames';

import 'styles/Wrapper.scss';

export default function Wrapper({ className, children }: { className?, children }) {
  return (
    <div className={classnames('Wrapper', { [className]: true })}>
      {children}
    </div>
  );
}
