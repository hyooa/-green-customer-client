import { useReducer, useEffect } from "react";

// 상태관리, 초기값
const initialState = {
    loading : false,
    data : null,
    error : null
}

function reducer (state, action) { // 3개의 상태관리, 반환해주는 값
    switch (action.type) {
        case "LOADING" :
        return {
            loading : true,
            data : null,
            error : null
        }
        case "SUCCESS" :
        return {
            loading : false,
            data : action.data,
            error : null
        }
        case "ERROR" :
        return {
            loading : false,
            data : null,
            error : action.error
        }
        default :
        return state;
    }
}

function useAsync(callback, deps = []) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const fetchDate = async () => {
        dispatch({
            type : "LOADING"
        });
        try {
            const data = await callback();
            dispatch ({
                type : "SUCCESS",
                data : data
            })
        }
        catch (e) {
            dispatch({
                type : "ERROR",
                error : e
            })
        }
    }
    useEffect(() => {
        fetchDate(); // 실행
    // eslint-disable-next-line
    }, deps)
    // 실행되면 결과값 리턴
    return [state, fetchDate];
}
export default useAsync;