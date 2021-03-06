import { ACTIONS } from "../actions/actionTypes";
import { TResetPasswordFormActions } from "../actions/resetPasswordActions/types";

type TInitialState = {
  form: {
    token: string;
    password: string;
  };
  resetPasswordRequest: boolean;
  resetPasswordFailed: boolean;
};

const initialState: TInitialState = {
  form: {
    token: "",
    password: "",
  },
  resetPasswordRequest: false,
  resetPasswordFailed: false,
};

const resetPasswordReducer = (
  state = initialState,
  action: TResetPasswordFormActions
): TInitialState => {
  switch (action.type) {
    case ACTIONS.RESET_PASSWORD_FORM_SET_VALUE: {
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };
    }
    case ACTIONS.RESET_PASSWORD_FORM_SUBMIT: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordFailed: false,
      };
    }
    case ACTIONS.RESET_PASSWORD_FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        form: {
          // При успешной регистрацией сбрасываем форму до исходного состояния
          token: "",
          password: "",
        },
        resetPasswordRequest: false,
      };
    }
    case ACTIONS.RESET_PASSWORD_FORM_SUBMIT_FAILED: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: true,
      };
    }

    default:
      return state;
  }
};

export default resetPasswordReducer;
