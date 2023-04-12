import { useReducer, useCallback } from "react";

enum RequestStatus {
  PENDING = "pending",
  COMPLETED = "completed",
}

enum RequestType {
  SEND_REQUEST = "send_request",
  SUCCESS = "success",
  ERROR = "error",
}

interface InitialState {
  data: any;
  error: string | null;
  status: RequestStatus | any;
}

function httpReducer(
  httpState: InitialState,
  action: { type: string; data: any; errorMessage: string }
) {
  switch (action.type) {
    case RequestType.SEND_REQUEST: {
      return {
        data: null,
        error: null,
        status: RequestStatus.PENDING,
      };
    }
    case RequestType.SUCCESS: {
      return {
        data: action.data,
        error: null,
        status: RequestStatus.COMPLETED,
      };
    }
    case RequestType.ERROR: {
      return {
        data: null,
        error: action.errorMessage,
        status: RequestStatus.COMPLETED,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

function useHttp(sendRequest: Promise<any> | any, isRequestSending = false) {
  const initialHttpState: InitialState = {
    data: null,
    error: null,
    status: isRequestSending ? RequestStatus.PENDING : null,
  };
  const [httpState, dispatch] = useReducer(httpReducer, initialHttpState);

  const sendHttpRequest = useCallback(
    async function (requestData?: any) {
      dispatch({
        type: RequestType.SEND_REQUEST,
        data: undefined,
        errorMessage: "",
      });
      try {
        const responseData = await sendRequest(requestData);
        dispatch({
          type: RequestType.SUCCESS,
          data: responseData,
          errorMessage: "",
        });
      } catch (error) {
        dispatch({
          type: RequestType.ERROR,
          errorMessage: "Something went wrong!",
          data: undefined,
        });
      }
    },
    [sendRequest]
  );

  return {
    sendHttpRequest,
    ...httpState,
  };
}

export default useHttp;
