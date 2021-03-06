import { ACTIONS } from "../actions/actionTypes";
import { TwsActions } from "../actions/wsActions/types";
import { TwsData } from "../types/data";

type TInitialState = {
  wsConnected: boolean;
  data: TwsData | null;
  error: any;
};

const initialState: TInitialState = {
  wsConnected: false,
  data: null,
  error: undefined,
};

const wsReducer = (state = initialState, action: TwsActions): TInitialState => {
  switch (action.type) {
    // Опишем обработку экшена с типом WS_CONNECTION_SUCCESS
    // Установим флаг wsConnected в состояние true
    case ACTIONS.WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    // Опишем обработку экшена с типом WS_CONNECTION_ERROR
    // Установим флаг wsConnected в состояние false и передадим ошибку из action.payload
    case ACTIONS.WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    // Опишем обработку экшена с типом WS_CONNECTION_CLOSED, когда соединение закрывается
    // Установим флаг wsConnected в состояние false
    case ACTIONS.WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

    // Опишем обработку экшена с типом WS_GET_MESSAGE
    // Обработка происходит, когда с сервера возвращаются данные
    // В messages передадим данные, которые пришли с сервера
    case ACTIONS.WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default wsReducer;
