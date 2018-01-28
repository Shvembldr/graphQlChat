import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

class FormSelect extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.object),
  };

  state = {
    value: '',
  };

  handleSelectChange = value => {
    this.setState({ value });
    value
      ? this.props.input.onChange(value.split(',').map(id => parseInt(id, 10)))
      : this.props.input.onChange('');
  };

  render() {
    const { input, meta, options, ...rest } = this.props;
    return (
      <div className="form__input-container">
        <Select
          style={{
            width: `100%`,
          }}
          multi
          onChange={this.handleSelectChange}
          placeholder="add user"
          removeSelected={true}
          simpleValue
          closeOnSelect={false}
          options={options}
          value={this.state.value}
          {...rest}
        />
        <div
          className={
            !meta.touched ? 'form__error' : 'form__error form__error--visible'
          }
        >
          {meta.error}
        </div>
      </div>
    );
  }
}

export default FormSelect;
