import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  logoutApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  TRegisterData,
  TLoginData
} from '../../utils/burger-api';
import { deleteCookie, setCookie } from '../../utils/cookie';

// Регистрация
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: TRegisterData) => {
    const data = await registerUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

// Вход
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData: TLoginData) => {
    const data = await loginUserApi(loginData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

// Выход
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

// Восстановление пароля
export const forgotPassword = createAsyncThunk<void, { email: string }>(
  'auth/forgotPassword',
  async (emailData) => {
    try {
      await forgotPasswordApi(emailData);
    } catch (error) {
      throw error;
    }
  }
);

// Сброс пароля
export const resetPassword = createAsyncThunk<
  void,
  { password: string; token: string }
>('auth/resetPassword', async (passwordData) => {
  try {
    await resetPasswordApi(passwordData);
  } catch (error) {
    throw error;
  }
});

// Получение профиля пользователя
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  getUserApi
);

// Обновление профиля
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  updateUserApi
);
