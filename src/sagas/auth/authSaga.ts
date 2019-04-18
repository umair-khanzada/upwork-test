import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { get, isFunction } from 'lodash';

import { AuthActionTypes, LoginPayload, CheckEmailPayload, OTPPayload, AuthActions } from '../../reducers/auth';
import AuthService from './authService';
import { RootState } from '../../reducers/reducerTypes';

interface APIResponse {
  data: string;
  error: string;
  message: string;
  success: boolean;
}

function getAPIErrorMessage(error?: any, defaultMessage: string = 'Internal server error') {
  return get(error, 'response.data.error', defaultMessage);
}

export default class AuthSaga {
  public static *verifyEmail({ payload }: { payload: CheckEmailPayload }) {
    try {
      const { email } = payload;
      const response: AxiosResponse<APIResponse> = yield call(AuthService.verifyEmail, email);
      if (response.status === 200 && response.data.success) {
        yield put({
          type: AuthActionTypes.VERIFY_EMAIL_SUCCESS,
        });
      }
    } catch (error) {
      yield put({
        type: AuthActionTypes.VERIFY_EMAIL_FAILURE,
        error: getAPIErrorMessage(error),
      });
    }
  }

  public static *verifyPassword({ payload }: { payload: LoginPayload }) {
    try {
      const { email, password } = payload;
      const response: AxiosResponse<APIResponse> = yield call(AuthService.verifyPassword, password);
      if (response.status === 200 && response.data.success) {
        yield put({
          type: AuthActionTypes.VERIFY_PASSWORD_SUCCESS,
          payload: {
            message: response.data.message,
          },
        });
      }
    } catch (error) {
      yield put({
        type: AuthActionTypes.VERIFY_PASSWORD_FAILURE,
        error: getAPIErrorMessage(error),
      });
    }
  }

  public static *verifyOTP({ payload }: { payload: OTPPayload }) {
    const { otp, callback } = payload;
    try {
      const response: AxiosResponse<
        APIResponse & {
          data: {
            access_token: string;
            access_token_expires: number;
            refresh_token: string;
          };
        }
      > = yield call(AuthService.verifyOTP, otp);
      if (response.status === 200 && response.data.success) {
        const token = response.data.data.access_token;
        const expired = response.data.data.access_token_expires;
        const refreshToken = response.data.data.refresh_token;
        yield put(
          AuthActions.verifyOTPCompleted({
            token,
            expired,
            refreshToken,
          }),
        );
      }
      if (callback && isFunction(callback)) {
        callback();
      }
    } catch (error) {
      const errorMsg = getAPIErrorMessage(error);
      yield put({
        type: AuthActionTypes.VERIFY_OTP_FAILURE,
        error: errorMsg,
      });
      if (callback && isFunction(callback)) {
        callback(errorMsg);
      }
    }
  }

  public static *refreshToken() {
    const refreshToken = yield select((state: RootState) => state.auth.get('refreshToken'));
    if (refreshToken) {
      try {
        const response: AxiosResponse<
          APIResponse & {
            data: {
              access_token: string;
              access_token_expires: number;
            };
          }
        > = yield call(AuthService.refreshToken, refreshToken);
        if (response.status === 200 && response.data.success) {
          const token = response.data.data.access_token;
          const expired = response.data.data.access_token_expires;
          yield put(
            AuthActions.refreshTokenCompleted({
              token,
              expired,
            }),
          );
        }
      } catch (error) {
        const errorMsg = getAPIErrorMessage(error);
        yield put({
          type: AuthActionTypes.REFRESH_TOKEN_FAILURE,
          error: errorMsg,
        });
      }
    } else {
      yield put({
        type: AuthActionTypes.REFRESH_TOKEN_FAILURE,
        // error: getAPIErrorMessage(),
      });
    }
  }

  public static *watchVerifyEmail() {
    // @ts-ignore
    yield takeLatest(AuthActionTypes.VERIFY_EMAIL_REQUEST, AuthSaga.verifyEmail);
  }

  public static *watchVerifyPassword() {
    // @ts-ignore
    yield takeLatest(AuthActionTypes.VERIFY_PASSWORD_REQUEST, AuthSaga.verifyPassword);
  }

  public static *watchVerifyOTP() {
    // @ts-ignore
    yield takeLatest(AuthActionTypes.VERIFY_OTP_REQUEST, AuthSaga.verifyOTP);
  }

  public static *watchRefreshToken() {
    // @ts-ignore
    yield takeLatest(AuthActionTypes.REFRESH_TOKEN_REQUEST, AuthSaga.refreshToken);
  }

  public static *authFlow() {
    yield all([
      AuthSaga.watchVerifyEmail(),
      AuthSaga.watchVerifyPassword(),
      AuthSaga.watchVerifyOTP(),
      AuthSaga.watchRefreshToken(),
    ]);
  }
}
