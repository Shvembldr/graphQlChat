import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

class FormSelect extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.object)
  };

  state = {
    value: ''
  };

  handleSelectChange = (value) => {
    this.setState({ value });
    this.props.input.onChange(value.split(',').map(id => parseInt(id, 10)));
  };

  render() {
    const { input, meta, options, ...rest } = this.props;
    return (
        <Select
          style={{
            width: `100%`
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
   );
  }
}

export default FormSelect;