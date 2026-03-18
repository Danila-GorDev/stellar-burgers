import {
  fetchUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile
} from '../actions/auth-actions';
import { initialState, userReducer } from './user-slice';

const mockUser = {
  email: 'test@test.ru',
  name: 'testt'
};

describe('Тесты пользователя', () => {
  it('register success', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: { user: mockUser }
    };

    const state = userReducer(initialState, action);

    expect(state).toEqual({
      isAuthChecked: true,
      user: mockUser,
      error: ''
    });
  });

  it('register rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'Error' }
    };

    const state = userReducer(initialState, action);

    expect(state).toEqual({
      isAuthChecked: false,
      user: {
        email: '',
        name: ''
      },
      error: 'Error'
    });
  });

  it('login success', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: { user: mockUser }
    };

    const state = userReducer(initialState, action);

    expect(state).toEqual({
      isAuthChecked: true,
      user: mockUser,
      error: ''
    });
  });

  it('login rejectes', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Error' }
    };

    const state = userReducer(initialState, action);

    expect(state).toEqual({
      isAuthChecked: false,
      user: {
        email: '',
        name: ''
      },
      error: 'Error'
    });
  });

  it('success call getUser', () => {
    const action = {
      type: fetchUserProfile.fulfilled.type,
      payload: { user: mockUser }
    };

    const state = userReducer(initialState, action);

    expect(state).toEqual({
      isAuthChecked: true,
      user: mockUser,
      error: ''
    });
  });

  it('error call getUser', () => {
    const action = {
      type: fetchUserProfile.rejected.type,
      error: { message: 'Error' }
    };

    const state = userReducer(initialState, action);

    expect(state).toEqual({
      isAuthChecked: false,
      user: {
        email: '',
        name: ''
      },
      error: 'Error'
    });
  });

  it('user upd success', () => {
    const action = {
      type: updateUserProfile.fulfilled.type,
      payload: { user: mockUser }
    };

    const state = userReducer(initialState, action);

    expect(state).toEqual({
      isAuthChecked: true,
      user: mockUser,
      error: ''
    });
  });

  it('user upd success fail', () => {
    const action = {
      type: updateUserProfile.rejected.type,
      error: { message: 'Error' }
    };

    const state = userReducer(initialState, action);

    expect(state).toEqual({
      isAuthChecked: false,
      user: {
        email: '',
        name: ''
      },
      error: 'Error'
    });
  });

  it('logout success', () => {
    const action = {
      type: logoutUser.fulfilled.type
    };

    const state = userReducer(initialState, action);

    expect(state).toEqual({
      isAuthChecked: false,
      user: {
        email: '',
        name: ''
      },
      error: ''
    });
  });
});
