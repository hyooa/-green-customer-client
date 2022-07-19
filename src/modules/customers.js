import axios from "axios";
import { Navigate } from "react-router-dom";

// 💛 리덕스 모듈
// 초기값, 액션 타입 지정, 액션 생성 함수, 리듀서(reducer)
const GET_CUSTOMERS = "GET_CUSTOMERS"; // 요청
const GET_CUSTOMERS_ERROR = "GET_CUSTOMERS_ERROR"; // 요청 실패
const GET_CUSTOMERS_SUCCESS = "GET_CUSTOMERS_SUCCESS"; // 요청 성공
const SET_INPUT = "SET_INPUT"; // input값 입력
const SET_RESET = "SET_RESET"; // 초기화

// 초기값 설정
const initialState = {
    customers : {
        loading : false,
        data : null,
        error : null
    },
    addCustomer : {
        c_name : "",
        c_phone : "",
        c_birth : "",
        c_gender : "",
        c_add : "",
        c_adddetail : ""
    }
}

// 액션 생성 함수
export const setInput = (e) => {
    const { name, value } = e.target;
    return {
        type : SET_INPUT,
        name,
        value
    }
}

// 홈으로 이동
export const goToHome = (navigate) => () => {
    navigate('/');
}

// thunk함수를 사용해서 action객체 dispatch 하기
// >> (thunk함수) ⭐ 함수 먼저 실행 후 dispatch (비동기 전송 때문에 사용)
export const getCustomers = () => async dispatch => {
    dispatch({ type : GET_CUSTOMERS }); // 요청 시작
    try{
        const response = await axios.get(`http://localhost:3001/customers`);
        const customers = response.data;
        dispatch({ type : GET_CUSTOMERS_SUCCESS, customers });
    }
    catch(e){
        dispatch({ type : GET_CUSTOMERS_ERROR, error : e });
    }
}

// (비동기 전송)
export const setSubmit = () => async (dispatch, getState) => {
    const formdata = getState().customers.addCustomer;
    try {
        const response = await axios.post(`http://localhost:3001/addCustomer`, formdata);
        dispatch({ type : SET_RESET })
    }
    catch (e) {
        dispatch({ type : SET_RESET })
    }
}

// 리듀서 만들기
export default function customers(state = initialState, action) {
    switch(action.type) {
        case GET_CUSTOMERS :
            return {
                ...state,
                customers : {
                    loading : true,
                    data : null,
                    error : null,
                }
            }
        case GET_CUSTOMERS_ERROR :
            return {
                ...state,
                customers : {
                    loading : false,
                    data : null,
                    error : action.error,
                }
            }
        case GET_CUSTOMERS_SUCCESS :
            return {
                ...state,
                customers : {
                    loading : false,
                    data : action.customers,
                    error : null
                }
            }
        case SET_INPUT :
            return {
                ...state,
                addCustomer : {
                    ...state.addCustomer,
                    [action.name] :action.value,
                }
            }
        case SET_RESET :
            return {
                ...state,
                addCustomer : {
                    ...state.addCustomer,
                    c_name : "",
                    c_phone : "",
                    c_gender : "",
                    c_add : "",
                    c_adddetail : ""
                }
            }
        default :
            return state;
    }
}