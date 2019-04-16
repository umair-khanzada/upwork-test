import React, { createRef } from 'react';
import { Row, Col, Form, Icon } from 'antd';
import { LoginVerifyWrap, ResendCode, ButtonVerify } from './styled';
import Heading from '../Heading/Heading';
import { FormInput } from '../Elements';
import { get, every } from 'lodash';
import { FormikProps } from 'formik';
import { LoginFormValues } from '../LoginForm/LoginForm';
import { SubHeading } from '../LoginForm/styled';

interface LoginVerifyProp {
  loading: boolean;
  formProps: FormikProps<LoginFormValues>;
  message: string;
  onSubmit: () => void;
  error?: string;
}

const LoginVerify: React.FC<LoginVerifyProp> = ({ loading = false, error, formProps, message = '', onSubmit }) => {
  const isFullFilledCode =
    formProps.values.code &&
    formProps.values.code.length === 4 &&
    every(formProps.values.code, (code: string) => code && code.length);
  const onKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>,
    value: string | undefined,
    nextFocus?: React.RefObject<any>,
    prevFocus?: React.RefObject<any>,
  ) => {
    // "Backspace"
    if (event.keyCode === 8) {
      if (prevFocus && get(prevFocus, 'current.myInput.current.myRef.current.focus')) {
        prevFocus.current.myInput.current.myRef.current.focus();
      }
    } else {
      if (value) {
        if (nextFocus && get(nextFocus, 'current.myInput.current.myRef.current.focus')) {
          nextFocus.current.myInput.current.myRef.current.focus();
        } else {
          if (isFullFilledCode && !loading) {
            onSubmit();
          }
        }
      }
    }
  };
  const code1 = createRef<any>();
  const code2 = createRef<any>();
  const code3 = createRef<any>();
  const code4 = createRef<any>();

  return (
    <LoginVerifyWrap>
      <Row gutter={16}>
        <Col xs={{ span: 16, offset: 1 }} lg={{ span: 20, offset: 2 }}>
          <Heading titleText={'Just one more step'} level={2} className="default" />
          <SubHeading>{message}</SubHeading>
          <div className="verify-form">
            <FormInput
              type="text"
              name="code[0]"
              autoFocus
              maxLength={1}
              onKeyUp={(e, value) => onKeyUp(e, value, code2)}
              useNumberOnly
              ref={code1}
            />
            <FormInput
              type="text"
              name="code[1]"
              maxLength={1}
              onKeyUp={(e, value) => onKeyUp(e, value, code3, code1)}
              useNumberOnly
              ref={code2}
            />
            <FormInput
              type="text"
              name="code[2]"
              maxLength={1}
              onKeyUp={(e, value) => onKeyUp(e, value, code4, code2)}
              useNumberOnly
              ref={code3}
            />
            <FormInput
              type="text"
              name="code[3]"
              maxLength={1}
              onKeyUp={(e, value) => onKeyUp(e, value, undefined, code3)}
              useNumberOnly
              ref={code4}
            />
            <div className="otp-error has-error">
              <div className="ant-form-explain">{error}</div>
            </div>
            <ResendCode>
              <Icon type="exclamation-circle" theme="filled" />
              <span>Didn’t receive the code? </span>
              <a href="#">Resend</a>
            </ResendCode>
            <Form.Item>
              <ButtonVerify
                size={'large'}
                type="primary"
                htmlType="submit"
                className="login-form-button"
                disabled={loading || !isFullFilledCode}
                loading={loading}
              >
                Submit
              </ButtonVerify>
              <ButtonVerify size={'large'} type="default" className="login-form-button">
                Cancel
              </ButtonVerify>
            </Form.Item>
          </div>
        </Col>
      </Row>
    </LoginVerifyWrap>
  );
};

export default LoginVerify;
