import React, { Fragment } from 'react';
import {Input, Label, Form} from 'semantic-ui-react';

const MaterialInput = ({ input, meta, ...rest }) => {
  return (
    <Form.Field>
      <Input
        error={meta.error && meta.touched}
        {...input}
        {...rest}
        onChange={input.onChange}
        size="small"
      />
      {meta.error &&
        meta.touched && (
          <Label basic color="red" pointing>
            {meta.error}
          </Label>
        )}
    </Form.Field>
  );
};

export default MaterialInput;
