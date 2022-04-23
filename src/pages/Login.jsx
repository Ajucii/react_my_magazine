import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Input, Text } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from "styled-components";
import { getCookie } from "../shared/cookie";
import { useForm } from "react-hook-form";

const Login = (props) => {

    const dispatch = useDispatch();

    const { register, formState: { errors, isValid, isDirty }, handleSubmit } = useForm({ mode: "onChange" });

    const onSubmit = ({ nickname, password }) => {
        console.log(nickname, password);
        dispatch(userActions.loginAction(nickname, password));
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid padding="16px">
                <Text size="32px" bold="bold">로그인</Text>

                <Grid padding="16px 0px">
                    <InputBox>
                        <p>닉네임</p><br></br>
                        {errors && <span>{errors?.nickname?.message}</span>}
                        <input
                            type="text"
                            placeholder="닉네임을 입력해주세요"
                            {...register("nickname",
                                {
                                    required: "닉네임을 입력해주세요.",
                                }
                            )}></input>
                    </InputBox>

                    <InputBox>
                        <p>비밀번호</p><br></br>
                        {errors && <span>{errors?.password?.message}</span>}
                        <input
                            type="password"
                            placeholder="비밀번호를 입력해주세요"
                            {...register("password",
                                {
                                    required: "비밀번호를 입력해주세요",
                                })}></input>
                    </InputBox>
                </Grid>
                <Button
                    disabled={!isDirty || !isValid}
                    text="로그인하기"
                ></Button>

            </Grid>
        </form>
    )
}


const InputBox = styled.div`
  background : white;
  margin-bottom: 30px;

  & p{
    display: inline-block;
    font-size: 15px;

    margin: 0px;
    padding-bottom : 0px;
  }

  & span{
    color:tomato;
    font-size: 12px;
    margin-top: 0px;
  }

  & input {


    border:1px solid #212121;
    width : 100%;
    padding : 12px 4px;
    box-sizing : border-box;
  }

  & input:focus {
    outline: none !important;
    border: 2px tomato solid ;
  }
`;

export default Login;
