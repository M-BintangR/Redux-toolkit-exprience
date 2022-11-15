import PostAuthor from "./PostAuthor";
import ReactionsButton from "./ReactionsButton";
import TimesAgo from "./TimesAgo";

const PostExcerpt = ({ post }) => {
    return (
        <article>
            <div className="card mb-3">
                <div className="card-body">
                    <h3 className="card-title">{post.title}</h3>
                    <TimesAgo timestamp={post.date} />
                    <p>
                        <PostAuthor userId={post.userId} />
                    </p>
                    <p>{post.body}</p>
                    <ReactionsButton post={post} />
                </div>
            </div>
        </article>
    )
}

export default PostExcerpt