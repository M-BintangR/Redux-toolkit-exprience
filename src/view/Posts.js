import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from "../features/posts/postSlice";
import AddPostForm from "./AddPostForm";
import { useEffect } from "react";
import PostExcerpt from "./PostExcerpt";


const Posts = () => {
    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);
    const dispatch = useDispatch();

    useEffect(() => {
        if (postsStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [dispatch, postsStatus]);


    let content;
    if (postsStatus === 'loading') {
        content = <p>...loading</p>;
    } else if (postsStatus === 'success') {
        const orderedPost = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
        content = orderedPost.map((post, i) => <PostExcerpt key={i} post={post} />)
    } else if (postsStatus === 'error') {
        content = <p>{error}</p>
    }


    return (
        <div className="container my-5">
            <div className="card">
                <h3 className="p-3">
                    Article
                    <Link to={'/'} className="btn btn-dark float-end">Back</Link>
                </h3>
                <div className="card-body">
                    <AddPostForm />
                    {content}
                </div>
            </div>
        </div>
    )
}

export default Posts