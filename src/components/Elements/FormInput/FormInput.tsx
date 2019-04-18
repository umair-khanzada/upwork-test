import React, { PureComponent, createRef } from 'react';
import { Field, FieldProps } from 'formik';
import { Form, Checkbox, Select, InputNumber } from 'antd';
import { Input, Password } from '../../Input';
import { isFunction } from 'lodash';

interface InputProps {
  type: InputType;
  name: string;
  placeholder?: string;
  prefix?: React.ReactNode;
  autoFocus?: boolean;
  useNumberOnly?: boolean;
  ref?: React.RefObject<any>;
  handleChange?: (e: any, name?: string, value?: any) => void;
  onPressEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>, value: any) => void;
  // Input
  maxLength?: number;
  // Input Number
  min?: number;
  max?: number;
  // Select
  options?: Array<{ value: string | number; label: string }>;
  showSearch?: boolean;
}

declare type InputType = 'text' | 'password' | 'number' | 'checkbox' | 'select' | 'date' | 'textarea';

type CustomProps = FieldProps<any> & InputProps;

class FormInput extends PureComponent<InputProps, {}> {
  protected static defaultProps = {
    placeholder: '',
  };

  private myInput = createRef<any>();

  public render(): React.ReactNode {
    return <Field {...this.props} component={this.renderFormInput} />;
  }

  private renderInputText = (props: CustomProps): React.ReactNode => {
    const {
      field,
      form,
      ref,
      ...restProps
    } = props;
    const { touched, errors } = form;
    const errorMsg = touched[field.name] && errors[field.name];
    const InputComponent = restProps.type === 'password' ? Password : Input;

    return (
      <Form.Item validateStatus={errorMsg ? 'error' : ''} help={errorMsg || ''}>
        <InputComponent
          ref={this.myInput}
          {...field}
          {...restProps}
        />
      </Form.Item>
    );
  }

  private renderInputNumber = (props: CustomProps): React.ReactNode => {
    const { field, form, prefix, type, onKeyUp, handleChange, ...restProps } = props;
    const { touched, errors, setFieldValue } = form;
    const errorMsg = touched[field.name] && errors[field.name];

    return (
      <Form.Item validateStatus={errorMsg ? 'error' : ''} help={errorMsg || ''}>
        <InputNumber {...field} {...restProps} onChange={(value) => setFieldValue(field.name, value)} />
      </Form.Item>
    );
  }

  private renderSelect = (props: CustomProps): React.ReactNode => {
    const {
      field: { onChange, onBlur, ...field },
      form: { touched, errors, setFieldValue },
      options,
      type,
      ...restProps
    } = props;
    const errorMsg = touched[field.name] && errors[field.name];

    return (
      <Form.Item validateStatus={errorMsg ? 'error' : ''} help={errorMsg || ''}>
        <Select {...field} {...restProps} onChange={(newValue: any) => setFieldValue(field.name, newValue)}>
          {options &&
            options.length > 0 &&
            options.map((option) => (
              <Select.Option value={option.value} key={option.value}>
                {option.label}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
    );
  }

  private renderCheckbox = (props: CustomProps): React.ReactNode => {
    const { field, form, ...restProps } = props;
    const { touched, errors } = form;
    const errorMsg = touched[field.name] && errors[field.name];

    return (
      <Form.Item validateStatus={errorMsg ? 'error' : ''} help={errorMsg || ''}>
        <Checkbox {...field} {...restProps}>
          {restProps.placeholder}
        </Checkbox>
      </Form.Item>
    );
  }

  private renderFormInput = (props: CustomProps): React.ReactNode => {
    const { type } = props;
    switch (type) {
      case 'text':
      case 'password':
      case 'textarea':
        return this.renderInputText(props);
      case 'number':
        return this.renderInputNumber(props);
      case 'select':
        return this.renderSelect(props);
      case 'checkbox':
        return this.renderCheckbox(props);
      case 'date':
        return null;
      default:
        return this.renderInputText(props);
    }
  }
}

export default FormInput;
