import React from 'react';

const Input = ({ input, meta, label, ...rest }) => {
  return (
    <div className="form__input-container">
      <input
        className={input.value ? 'form__input has-content' : 'form__input'}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        onChange={input.onChange}
        {...rest}
      />
      <label>{label}</label>
      <span className="focus-border" />
      <div
        className={
          !meta.touched ? 'form__error' : 'form__error form__error--visible'
        }
      >
        {meta.error || meta.submitError}
      </div>
    </div>
  );
};

export default Input;
