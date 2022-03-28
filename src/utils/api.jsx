import axios from "axios";
import {
  API_URL,
  URL_KEY_INGREDIENTS,
  URL_KEY_ORDERS,
  URL_KEY_PASSWORD_FORGOT,
  URL_KEY_PASSWORD_RESET,
  URL_KEY_REGISTER,
  URL_KEY_LOGIN,
  URL_KEY_USER,
} from "../constants/api-url";

import {
  getOrder,
  getOrderSuccess,
  getOrderFailed,
} from "../services/actions/constructorActions";
import {
  getIngredients,
  getIngredientsSuccess,
  getIngredientsFailed,
} from "../services/actions/ingredientsActions";
import {
  forgotPasswordFormSubmit,
  forgotPasswordFormSubmitSuccess,
  forgotPasswordFormSubmitFailed,
} from "../services/actions/forgotPasswordActions";
import {
  resetPasswordFormSubmit,
  resetPasswordFormSubmitSuccess,
  resetPasswordFormSubmitFailed,
} from "../services/actions/resetPasswordActions";
import {
  registerFormSubmit,
  registerFormSubmitSuccess,
  registerFormSubmitFailed,
} from "../services/actions/registerActions";
import {
  loginFormSubmit,
  loginFormSubmitSuccess,
  loginFormSubmitFailed,
} from "../services/actions/loginActions";
import { getProfileValue } from "../services/actions/profileActions";

import { getCookie, setCookie } from "./cookie";

export const getData = () => {
  return (dispatch) => {
    dispatch(getIngredients());
    (async () => {
      try {
        const res = await axios.get(`${API_URL}${URL_KEY_INGREDIENTS}`);
        dispatch(getIngredientsSuccess(res.data.data));
      } catch (err) {
        let error = await err;
        console.log(error.response);
        dispatch(getIngredientsFailed());
      }
    })();
  };
};

export const postOrder = (ingredientsIDs) => {
  return (dispatch) => {
    dispatch(getOrder());
    (async () => {
      try {
        const res = await axios.post(`${API_URL}${URL_KEY_ORDERS}`, {
          ingredients: ingredientsIDs,
        });
        dispatch(getOrderSuccess(res.data.data));
      } catch (err) {
        let error = await err;
        console.log(error.response);
        dispatch(getOrderFailed());
      }
    })();
  };
};

export const postForgotPasswordRequest = (email, history) => {
  return (dispatch) => {
    dispatch(forgotPasswordFormSubmit());
    (async () => {
      try {
        await axios.post(`${API_URL}${URL_KEY_PASSWORD_FORGOT}`, {
          email: email,
        });
        await dispatch(forgotPasswordFormSubmitSuccess());
        history.replace({ pathname: "/reset-password" });
      } catch (err) {
        let error = await err;
        console.log(error.response);
        dispatch(forgotPasswordFormSubmitFailed());
      }
    })();
  };
};

export const postResetPasswordRequest = (password, token) => {
  return (dispatch) => {
    dispatch(resetPasswordFormSubmit());
    (async () => {
      try {
        await axios.post(`${API_URL}${URL_KEY_PASSWORD_RESET}`, {
          password: password,
          token: token,
        });
        dispatch(resetPasswordFormSubmitSuccess());
      } catch (err) {
        let error = await err;
        console.log(error.response);
        dispatch(resetPasswordFormSubmitFailed());
      }
    })();
  };
};

export const postRegisterRequest = (email, password, name, history) => {
  return (dispatch) => {
    dispatch(registerFormSubmit());
    (async () => {
      try {
        await axios.post(`${API_URL}${URL_KEY_REGISTER}`, {
          email: email,
          password: password,
          name: name,
        });
        await dispatch(registerFormSubmitSuccess());
        history.replace({ pathname: "/login" });
      } catch (err) {
        let error = await err;
        console.log(error.response);
        dispatch(registerFormSubmitFailed());
      }
    })();
  };
};

export const postLoginRequest = (email, password, history) => {
  return (dispatch) => {
    dispatch(loginFormSubmit());
    (async () => {
      try {
        const res = await axios.post(`${API_URL}${URL_KEY_LOGIN}`, {
          email: email,
          password: password,
        });
        setCookie("token", res.data.accessToken);
        await dispatch(getProfileInfo());
        await dispatch(loginFormSubmitSuccess());
        history.replace({ pathname: "/" });
      } catch (err) {
        let error = await err;
        console.log(error.response);
        dispatch(loginFormSubmitFailed());
      }
    })();
  };
};

export const getProfileInfo = () => {
  return (dispatch) => {
    (async () => {
      try {
        const res = await axios.get(`${API_URL}${URL_KEY_USER}`, {
          headers: {
            Authorization: getCookie("token"),
          },
        });
        dispatch(getProfileValue(res.data.user.name, res.data.user.email));
      } catch (err) {
        let error = await err;
        console.log(error.response);
      }
    })();
  };
};
