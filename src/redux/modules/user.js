import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { deleteCookie, setCookie } from "../../shared/cookie";
import { actionCreators as postActions } from "./post";

import axios from "axios";


const LOG_OUT = "LOG_OUT";
const SET_USER = "SET_USER";
const P_LOADING = "P_LOADING";


// 액션 생성 함수
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));
const p_loading = createAction(P_LOADING, (p_loading) => ({ p_loading }));


const initialState = {
    user_info: {
        nickname: '',
        isAdmin: false,
        userProfile: '',
    },
    is_login: false,
    p_loading: false,
};

const user_initial = {
    nickname: '',
    userId: '',
    user_profile: '',
}


// middleware actions
const loginAction = (nickname, pwd, imageUrl = "") => {
    return function (dispatch, getState, { history }) {

        // dispatch(p_loading(true));

        axios({
            method: 'post',
            url: 'http://junehan-test.shop/api/users/login',
            data: {
                nickname: nickname,
                password: pwd,
            }

        }).then((response) => {
            sessionStorage.setItem('token', response.data.data.token);
            const user_info = {
                nickname: response.data.data.nickname,
                isAdmin: response.data.data.isAdmin,
                userProfile: imageUrl,
            }

            dispatch(setUser(user_info));
            dispatch(postActions.getPostBK());
            history.push('/');

        })
            .catch((err) => {
                window.alert("아이디 혹은 비밀번호가 틀렸습니다.")
                console.log(err.message);
            })
    }
}

const signupAction = (nickname, pwd, pwd2) => {
    return function (dispatch, getState, { history }) {

        axios({
            method: 'post',
            url: 'http://junehan-test.shop/api/users/register',
            data: {
                nickname: nickname,
                password: pwd,
                confirmPassword: pwd2,
            }

        }).then((response) => {

            console.log("회원가입 성공");
            // dispatch(loginAction(nickname, pwd))
            history.push('/');

        }).catch((err) => {
            window.alert("회원가입에 실패했습니다.")
            console.log(err.message);
        })
    }
}




const loginCheck = () => {
    return function (dispatch, getState, { history }) {

        const token = sessionStorage.getItem('token');

        axios({
            method: 'get',
            url: 'http://junehan-test.shop/api/users/auth',
            headers: {
                authorization: `Bearer ${token}`,
            }
        }).then(function (response) {
            const user_info = {
                nickname: response.data.data.nickname,
                isAdmin: response.data.data.isAdmin,
                userProfile: ""
            }
            dispatch(setUser(user_info))
        }).catch((err) => {
            console.log(err.message);
        })
    }
}



const logOutBK = () => {
    return function (dispatch, getState, { history }) {
        sessionStorage.removeItem('token');
        dispatch(logOut());
        //replace. 지금 있는 페이지와 바꿔치기하겠다는것. 뒤로가기 해도 원래페이지가 안나옴.
        dispatch(postActions.getPostBK())
        history.replace('/');

    }
}


// reducer
export default handleActions({
    [SET_USER]: (state, action) => produce(state, (draft) => {
        // setCookie("is_login", "success");
        // createAction을 사용할 경우 받아온 action에 payload를 중간에 거쳐야 인자로 넘겨준 값을 받아올 수 있다.
        draft.user_info = action.payload.user;
        console.log(action.payload.user);
        draft.is_login = true;
        // draft.p_loading = false;
    }),

    [LOG_OUT]: (state, action) => produce(state, (draft) => {
        // deleteCookie("is_login");
        draft.user_info = null;
        draft.is_login = false;

    }),

    [P_LOADING]: (state, action) => produce(state, (draft) => {
        draft.p_loading = action.payload.p_loading;
    }),

}, initialState);



//action creator export
const actionCreators = {
    logOut,
    logOutBK,
    loginAction,
    signupAction,
    loginCheck,
    setUser,
};

export { actionCreators };