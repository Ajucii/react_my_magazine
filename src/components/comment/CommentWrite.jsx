import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Input, Button } from "../../elements";
import { actionCreators as commentActions } from "../../redux/modules/comment";



const CommentWrite = (props) => {

    const [comment_text, setCommentText] = useState();
    const dispatch = useDispatch();

    const { post_id } = props;

    const onChange = (e) => {
        setCommentText(e.target.value);
    }

    const write = () => {
        dispatch(commentActions.addCommentBK(post_id, comment_text));
        setCommentText("");
    }

    return (
        <React.Fragment>
            <Grid padding="16px" is_flex>
                <Input
                    placeholder="댓글 내용을 입력해주세요"
                    _onChange={onChange}
                    value={comment_text}
                    onSubmit={write}
                    is_submit="is_submit" />
                <Button width="70px" margin="0px 2px 0px 2px"
                    _onClick={write}
                >
                    작성</Button>

            </Grid>
        </React.Fragment>
    )
}

export default CommentWrite;