import { useDispatch } from "react-redux";
import { reactionsAdded } from "../features/posts/postSlice";

const reactionEmoji = {
    wow: '😲',
    hearth: '💖',
    coffe: '☕',
}
const ReactionsButton = ({ post }) => {
    const dispatch = useDispatch();

    const reactionButton = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                onClick={() =>
                    dispatch(reactionsAdded({ postId: post.id, reaction: name }))
                }
                style={{ border: 'none', background: '#ffff' }}>
                {emoji} {post.reactions[name]}
            </button>
        )
    })

    return <div>{reactionButton}</div>
}

export default ReactionsButton