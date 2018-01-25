import React, { Fragment } from 'react';

const Input = ({ input, meta, ...rest }) => {
  return (
    <Fragment>
      <input
        className="form__input"
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        onChange={input.onChange}
        {...rest}
      />
      {meta.touched && <div className="form__error">{meta.error}</div>}
    </Fragment>
  );
};

export default Input;
