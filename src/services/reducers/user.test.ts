import { user, initialState } from './user';
import { TUserActions } from '../actions/user';
import * as TActionTypes from '../constants/user';

const testName = 'Test Name';
const testEmail = 'Test Email';
const testRollbackName = 'Test Rollback Name';
const testRollbackEmail = 'Test Rollback Email';

describe('user reducer', () => {
 
  it('should return initial state', () => {
    expect(
      user(undefined, {} as TUserActions)
    ).toEqual(initialState);
  });

  it('should perform USER_REG', () => {
    const action = {
      type: TActionTypes.USER_REG
    }
    expect(
      user(initialState, action)
    ).toEqual({
      ...initialState,
      userIsLogged: false,
      userPending: true,
      userHasError: false
    });
  });

  it('should perform USER_REG_SUCCESS', () => {
    const action = {
      type: TActionTypes.USER_REG_SUCCESS
    }
    expect(
      user(initialState, action)
    ).toEqual({
      ...initialState,
      userIsLogged: true,
      userPending: false,
      userHasError: false,
    });
  });

  it('should perform USER_REG_FAILED', () => {
    const action = {
      type: TActionTypes.USER_REG_FAILED
    }
    expect(
      user(initialState, action)
    ).toEqual({
      ...initialState,
      userIsLogged: false,
      userPending: false,
      userHasError: true
    });
  });

  it('should perform USER_LOGIN', () => {
    const action = {
      type: TActionTypes.USER_LOGIN
    }
    expect(
      user(initialState, action)
    ).toEqual({
      ...initialState,
      userPending: true,
      userHasError: false
    });
  });

  it('should perform USER_LOGIN_SUCCESS', () => {
    const action = {
      type: TActionTypes.USER_LOGIN_SUCCESS
    }
    expect(
      user(initialState, action)
    ).toEqual({
      ...initialState,
      userIsLogged: true,
      userPending: false,
      userHasError: false,
    });
  });

  it('should perform USER_LOGIN_FAILED', () => {
    const action = {
      type: TActionTypes.USER_LOGIN_FAILED
    }
    expect(
      user(initialState, action)
    ).toEqual({
      ...initialState,
      userIsLogged: false,
      userPending: false,
      userHasError: true
    });
  });

  it('should perform USER_LOGOUT', () => {
    const action = {
      type: TActionTypes.USER_LOGOUT
    }
    expect(
      user(initialState, action)
    ).toEqual({
      ...initialState,
      userPending: true,
      userHasError: false
    });
  });

  it('should perform USER_LOGOUT_SUCCESS', () => {
    const action = {
      type: TActionTypes.USER_LOGOUT_SUCCESS
    }
    expect(
      user(initialState, action)
    ).toEqual({
      ...initialState,
    });
  });

  it('should perform USER_LOGOUT_FAILED', () => {
    const action = {
      type: TActionTypes.USER_LOGOUT_FAILED
    }
    expect(
      user(initialState, action)
    ).toEqual({
      ...initialState,
      userPending: false,
      userHasError: true
    });
  });

  it('should perform USER_PASSWORD_REQUEST', () => {
    const action = {
      type: TActionTypes.USER_PASSWORD_REQUEST
    }
    expect(
      user(initialState, action)
    ).toEqual({
      ...initialState,
      userPending: true,
      userHasError: false,
      userPasswordResetting: false
    });
  });

  it('should perform USER_PASSWORD_REQUEST_SUCCESS', () => {
    const action = {
      type: TActionTypes.USER_PASSWORD_REQUEST_SUCCESS
    }
    expect(
      user(initialState, action)
    ).toEqual({
      ...initialState,
      userHasError: false,
      userPasswordResetting: true
    });
  });

  it('should perform USER_PASSWORD_REQUEST_FAILED', () => {
    const action = {
      type: TActionTypes.USER_PASSWORD_REQUEST_FAILED
    }
    expect(
      user(initialState, action)
    ).toEqual({
      ...initialState,
      userHasError: true,
      userPasswordResetting: false
    });
  });

  it('should perform USER_PASSWORD_RESET', () => {
    const action = {
      type: TActionTypes.USER_PASSWORD_RESET
    }
    expect(
      user(initialState, action)
    ).toEqual({
      ...initialState,
      userPending: true,
      userHasError: false,
      userPasswordResetting: false
    });
  });

  it('should perform USER_PASSWORD_RESET_SUCCESS', () => {
    const action = {
      type: TActionTypes.USER_PASSWORD_RESET_SUCCESS
    }
    expect(
      user(initialState, action)
    ).toEqual({
      ...initialState,
      userHasError: false,
      userPasswordResetting: false
    });
  });

  it('should perform USER_PASSWORD_RESET_FAILED', () => {
    const action = {
      type: TActionTypes.USER_PASSWORD_RESET_FAILED
    }
    expect(
      user(initialState, action)
    ).toEqual({
      ...initialState,
      userHasError: true,
      userPasswordResetting: false
    });
  });

  it('should perform USER_GET_USER_DATA', () => {
    const action = {
      type: TActionTypes.USER_GET_USER_DATA
    }
    expect(
      user(initialState, action)
    ).toEqual({
      ...initialState,
      userPending: true,
      userHasError: false
    });
  });

  it('should perform USER_GET_USER_DATA_SUCCESS', () => {
    const action = {
      type: TActionTypes.USER_GET_USER_DATA_SUCCESS,
      userName: testName,
      userEmail: testEmail
    }
    expect(
      user(initialState, action)
    ).toEqual({
      ...initialState,
      userPending: false,
      userHasError: false,
      userIsLogged: true,
      userName: testName,
      userEmail: testEmail
    });
  });

  it('should perform USER_GET_USER_DATA_FAILED', () => {
    const action = {
      type: TActionTypes.USER_GET_USER_DATA_FAILED
    }
    expect(
      user(initialState, action)
    ).toEqual({
      ...initialState,
      userPending: false,
      userHasError: true
    });
  });

  it('should perform USER_ROLLBACK', () => {
    const initialState = {
      userIsLogged: false,
      userPending:  false,
      userHasError: false,
      userPasswordResetting: false,
    
      userName: '',
      userEmail: '',
      userRollbackName: testRollbackName,
      userRollbackEmail: testRollbackEmail
    }
    const action = {
      type: TActionTypes.USER_ROLLBACK
    }
    expect(
      user(initialState, action)
    ).toEqual({
      ...initialState,
      userName: testRollbackName,
      userEmail: testRollbackEmail
    });
  });

  it('should perform USER_ROLLBACK_UPDATE', () => {
    const action = {
      type: TActionTypes.USER_ROLLBACK_UPDATE,
      userRollbackName: testRollbackName,
      userRollbackEmail: testRollbackEmail
    }
    expect(
      user(initialState, action)
    ).toEqual({
      ...initialState,
      userRollbackName: testRollbackName,
      userRollbackEmail: testRollbackEmail
    });
  });

  it('should perform USER_UPDATE_USER_DATA', () => {
    const action = {
      type: TActionTypes.USER_UPDATE_USER_DATA
    }
    expect(
      user(initialState, action)
    ).toEqual({
      ...initialState,
      userPending: true,
      userHasError: false
    });
  });

  it('should perform USER_UPDATE_USER_DATA_SUCCESS', () => {
    const action = {
      type: TActionTypes.USER_UPDATE_USER_DATA_SUCCESS,
      userName: testName,
      userEmail: testEmail
    }
    expect(
      user(initialState, action)
    ).toEqual({
      ...initialState,
      userPending: false,
      userHasError: false,
      userName: testName,
      userEmail: testEmail
    });
  });

  it('should perform USER_UPDATE_USER_DATA_FAILED', () => {
    const initialState = {
      userIsLogged: false,
      userPending:  false,
      userHasError: false,
      userPasswordResetting: false,
    
      userName: '',
      userEmail: '',
      userRollbackName: testRollbackName,
      userRollbackEmail: testRollbackEmail
    }
    const action = {
      type: TActionTypes.USER_UPDATE_USER_DATA_FAILED
    }
    expect(
      user(initialState, action)
    ).toEqual({
      ...initialState,
      userPending: false,
      userHasError: true,
      userName: testRollbackName,
      userEmail: testRollbackEmail
    });
  });
});