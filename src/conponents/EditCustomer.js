import React,{useEffect, useReducer, useState} from 'react';
import {Table,TableBody, TableCell, TableRow} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PopupDom from "./PopupDom";
import PopupPostCode from "./PopupPostCode";

const init = {
    loading: false,
    data: null,
    error: null
}

function reducer(state,action){
    switch(action.type){
        case "LOADING":
            return {
                loading: true,
                data : null,
                error: null
            }
        case "SUCCESS":
            return{
                loading: false,
                data : action.data,
                error : null
            }
        case "ERROR" :
            return{
                loading:false,
                data: null,
                error: action.error
            }
        default:
            return state;
    }
}

const EditCustomer = () => {
    const navi = useNavigate();
    const {no} = useParams();

    //우편번호 관리
    const onAddData = (data)=>{
        console.log(data);
        setInputData({
            ...inputData,
            c_add: data.address
        })
    }

    //팝업창 상태관리(true로 변경)
    const [isPopupOpen, setIsPopupOpen] = useState(false);
   
    //팝업창 열기
    const openPostCode = ()=>{
        setIsPopupOpen(true);
    }

    //팝업창 닫기(false로 다시 변경)
    const closePostCode = ()=>{
        setIsPopupOpen(false);
    }
   
    //수정할 데이터 불러오기~~~
    const fetchEdit = async ()=>{
        dispatch({type:"LOADING"});
        try{
            const res = await axios.get(`http://localhost:3001/customer/${no}`);
            dispatch({type:"SUCCESS", data:res.data})
        }
        catch(e){
            console.log(e);
            dispatch({type:"ERROR", error:e})
        }
    }
    useEffect(()=>{fetchEdit()},[]);

    const [state,dispatch] = useReducer(reducer,init);
    const {loading,data,error} = state;
    console.log(state);


    //불러온 데이터 상태관리하기~~~~!!! --> data를 불러온 다음 실행되야함 -> 초기값은 빈값으로 주고 데이터를 불러온 다음 setInput으로 값을 변경해준다
    const [inputData, setInputData] = useState({
        c_name: "",
        c_phone: "",
        c_birth: "",
        c_gender: "",
        c_add1 : "",
        c_add2 : ""
    })
   
    //useEffect로 묶지 않으면 무한루프에 빠진다. [data]가 변경될때만 실행되게 useEffect로 묶어준다
    //setInputData에서 e_name값을 바로 data.name으로 주니까 값을 받아오지 못함.
    //-> 삼항연산자로 data가 있으면 e_name에 data.name을 받아오고, data가 없으면 그냥 빈값을 넣어준다.
    useEffect(()=>{
        setInputData({
            c_name: data? data.name : "",
            c_phone: data? data.phone : "",
            c_birth: data? data.birth : "",
            c_gender : data? data.gender : "",
            c_add: data? data.add1 : "",
            c_adddetail : data? data.add2 : ""
           
        })
    },[data])
    console.log(inputData);

    if(loading) return <div>로딩중</div>
    if(error) return <div>에러</div>
    if(!data) return <div>데이터를 받아오지못함</div>
   
    //data가 로드되면 inputData의 값을 data객체가 가지고 있는 값으로 변경하기
   

    //input데이터 수정될때 수정하기
         const onChange=(e)=>{
            const {name,value} = e.target;
            // console.log(name,value);
            console.log(inputData);
            setInputData({
                ...inputData,
                [name]:value
            })
        }

    //전송
    const onSubmit = (e)=>{
        //form데이터가 원래 가지고있는 이벤트를 제거(초기화)
        e.preventDefault();
        putCustomer();
    }


    function putCustomer(){
        axios.put(`http://localhost:3001/editCustomer/${no}`,inputData)
        .then(result=>{
            console.log(result);
            navi('/');
        })
        .catch(e=>{
            console.log(e);
        })
    }


    return (

        <div>
            <h2>고객 정보 수정하기</h2>
            <form onSubmit={onSubmit}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>고객명</TableCell>
                            <TableCell><input type="text" name="c_name" defaultValue={data.name} onChange={onChange}/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>연락처</TableCell>
                            <TableCell><input type="text" name="c_phone" defaultValue={data.phone} onChange={onChange}/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>생년월일</TableCell>
                            <TableCell><input type="date" name="c_birth" defaultValue={data.birth} onChange={onChange}/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>성별</TableCell>
                            <TableCell>
                                여성<input type="radio" name="c_gender" defaultValue="여성" onChange={onChange} checked={inputData.e_gender ==="여성"? true : false}/>
                                남성<input type="radio" name="c_gender" defaultValue="남성" onChange={onChange} checked={inputData.e_gender ==="남성"? true : false}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>주소</TableCell>
                            <TableCell>
                                <input type="text" name="c_add" value={inputData.c_add} onChange={onChange}/>
                                <input type="text" name="c_adddetail" value={inputData.c_adddetail} onChange={onChange}/>
                                <button type="button" onClick={openPostCode}>우편번호 검색</button>
                                <div id="popupDom">
                                        { isPopupOpen && (
                                                <PopupDom>
                                                    <PopupPostCode onClose={closePostCode} onAddData={onAddData}/>
                                                </PopupDom>
                                            )}

                                    </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>
                                <button type="submit" id='button'>수정</button>
                                <button type="reset" id='button'>취소</button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </form>
        </div>
    );
};

export default EditCustomer;