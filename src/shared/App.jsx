import styled from "styled-components";

import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configStore";

import Header from "../components/Header"
import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetail";
import Notification from "../pages/Notification";
import { Grid } from "../elements/index";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { useEffect } from "react";
import PageSpinner from "../elements/PageSpinner";


function App() {

  const dispatch = useDispatch();
  const is_login = useSelector(state => state.user.is_login);
  const is_session = sessionStorage.getItem('token') ? true : false;
  const p_loading = useSelector(state => state.post.p_loading);

  // 로그인 체크
  useEffect(() => {

    console.log("로그인 체크");

    if (is_session) {
      dispatch(userActions.loginCheck());
    }
  }, []);


  return (
    <>
      {!p_loading || <PageSpinner />}

      <Wrapper>
        <Grid width="100%" maxWidth="500px" margin="auto" bg="white" minHeight="100vh">
          <Header></Header>
          <ConnectedRouter history={history}>
            <Route path="/" exact component={PostList} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/write" exact component={PostWrite} />
            <Route path="/write/:id" exact component={PostWrite} />
            <Route path="/post/:id" exact component={PostDetail} />
            <Route path="/noti" exact component={Notification} />
          </ConnectedRouter>
        </Grid>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  background: linear-gradient( 45deg, #D7843E, tomato );
  display:flex;
  min-height: 100vh;
`;


export default App;
