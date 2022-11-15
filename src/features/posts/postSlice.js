import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from 'date-fns';


const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts: [],
    status: 'idle',
    error: null,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const res = await axios.get(POST_URL);
        return [...res.data];
    } catch (err) {
        return err.message;
    }
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    try {
        const res = await axios.post(POST_URL, initialPost);
        return res.data;
    } catch (err) {
        return err.message;
    }
});



export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload);
            },
            prepare(inputData) {
                return {
                    payload: {
                        id: nanoid(),
                        title: inputData.title,
                        content: inputData.content,
                        userId: inputData.userId,
                        date: new Date().toISOString(),
                        reactions: {
                            wow: 0,
                            hearth: 0,
                            coffe: 0,
                        },
                    }
                }
            }
        },
        reactionsAdded: (state, action) => {
            const { postId, reaction } = action.payload;
            console.log(postId);
            const existingPost = state.posts.find(post => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'success';
                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = {
                        wow: 0,
                        hearth: 0,
                        coffe: 0,
                    }
                    return post;
                });

                state.posts = state.posts.concat(loadedPosts);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId);
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    wow: 0,
                    hearth: 0,
                    coffe: 0,
                }
                console.log(action.payload);
                state.posts.push(action.payload);
            })
    }


});

export const selectAllPosts = state => state.posts.posts;
export const getPostsStatus = state => state.posts.status;
export const getPostsError = state => state.posts.error;
export const { postAdded, reactionsAdded } = postsSlice.actions;
export default postsSlice.reducer;