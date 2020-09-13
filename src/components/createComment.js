import React,{useState, useRef} from 'react';
import { useMutation} from '@apollo/client'
import { Grid, Card, Button,TransitionGroup, Form, List } from 'semantic-ui-react';



import {CREATE_COMMENT} from "../graphql/comment"
import { useStore } from '../store';
import DeleteButton from './DeleteButton';
import {GET_POST} from "../graphql/post"



function SinglePost({comments, match}){
  const postId = match.params.postId
  const [{auth}] = useStore()
  const user = auth.user
  const commentInputRef = useRef(null)
 console.log(comments)
  const [comment, setComment]= useState('');
  const variables = {
      postId,
      comment,
      author: user.id
  };


  const [submitCommnet, { loading}] = useMutation(CREATE_COMMENT,{
    update(proxy){
     const data = proxy.readQuery({
      query: GET_POST,
      variables:{id: postId}
     })


   proxy.writeQuery({query: GET_POST, data})
    setComment('');
    commentInputRef.current.blur();
    },
    variables
  })


return (
    <>
  <Grid>

    <Grid.Column mobile={16} tablet={10} computer={7} className=  "Card" >
       {user && (  <>
                  <Card fluid >
                    <Card.Content>
                        <h4 > Post a commnet </h4>
                    <Form>
                      <div className='ui action input fluid'>
                        <input type="text"
                                placeholder="comment.."
                                name="comment"
                                value={comment}
                                onChange={ e => setComment(e.target.value)}
                                ref={commentInputRef}/>
                          <Button type="submit"
                                  className="CommentBtn"
                                  loading={loading}
                                  disabled={comment.trim() === ''}
                                  onClick={submitCommnet}>
                            Send
                          </Button>
                      </div>
                    </Form>
                    </Card.Content>
                  </Card>
                  <TransitionGroup>
                      <List divided relaxed>
                      {comments && comments.map(comment => (
                          <List.Item key={comment.id}>
                        <List.Content>
                          <List.Header className="PostComment">{comment.comment}</List.Header>
                          <List.Description >
                                {user && user.username === comment.author.username &&
                                <DeleteButton  commentId={comment.id}/> }
                         </List.Description>
                        </List.Content>
                      </List.Item>
                      ))}
                      </List>
                  </TransitionGroup>


                  </>
                  )}
    </Grid.Column>
  </Grid>
    </>
      )
}



export default SinglePost;


















