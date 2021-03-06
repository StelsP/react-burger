import { ACTIONS } from "../actions/actionTypes";
import { TLoginActions } from "../actions/loginActions/types";

type TInitialState = {
  form: {
    email: string;
    password: string;
  };
  loginRequest: boolean;
  loginFailed: boolean;
};

const initialState: TInitialState = {
  form: {
    email: "",
    password: "",
  },
  loginRequest: false,
  loginFailed: false,
};

const loginReducer = (
  state = initialState,
  action: TLoginActions
): TInitialState => {
  switch (action.type) {
    case ACTIONS.LOGIN_FORM_SET_VALUE: {
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };
    }
    case ACTIONS.LOGIN_FORM_SUBMIT: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
      };
    }
    case ACTIONS.LOGIN_FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        form: {
          // При успешной регистрацией сбрасываем форму до исходного состояния
          email: "",
          password: "",
        },
        loginRequest: false,
      };
    }
    case ACTIONS.LOGIN_FORM_SUBMIT_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true,
      };
    }

    default:
      return state;
  }
};

export default loginReducer;
