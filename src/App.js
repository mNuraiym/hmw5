

import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./store/postsReducer.js";
import { fetchComments } from "./store/commentsReducer.js";
import { useEffect, useState } from "react";

function App()
{
  const comments = useSelector((state) => state.comments.comments)
  const dispatch = useDispatch();
  const [comm, setComm] = useState(comments)
  const posts = useSelector((state) => state.posts.posts);
  const [clickedButton, setClickedButton] = useState(0)

  const showPosts = () =>
  {
    dispatch(fetchPosts());
  };

  const showComments = (postId) =>
  {
    if (clickedButton === postId) setClickedButton(0)
    else {
      dispatch(fetchComments(postId));
      setClickedButton(postId);
    }

  };
  useEffect(() =>
  {
    if (comments !== undefined) setComm(comments)
  }, [comments])
  return (
    <>
      <button onClick={showPosts}>Показать посты</button>

      {posts && (
        <>
          <h3>Посты</h3>
          <ul>
            {posts.posts && posts.posts.map((post) => (
              <li key={post.id}>
                {post.title}
                <button onClick={() => showComments(post.id)}>
                  {clickedButton === post.id ? "Скрыть комментарий" : "Показать комментарий"}
                </button>

                {clickedButton === post.id && (
                  <div>
                    {
                      comm[clickedButton] && comm[clickedButton].comments.map(c => <p key={c.id}>{c.body}</p>)
                    }
                  </div>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default App;





