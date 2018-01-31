import React from 'react';

const Input = ({ input, meta, label, defaultValue, ...rest }) => {
  return (
    <div className="form__input-container">
      <input
        className={input.value || defaultValue ? 'form__input has-content' : 'form__input'}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        onChange={input.onChange}
        defaultValue={defaultValue}

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
