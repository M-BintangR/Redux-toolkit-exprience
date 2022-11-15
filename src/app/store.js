import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/sliceCounter';
import postsReducer from '../features/posts/postSlice';
import usersReducer from '../features/users/userSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        posts: postsReducer,
        users: usersReducer,
    }
});