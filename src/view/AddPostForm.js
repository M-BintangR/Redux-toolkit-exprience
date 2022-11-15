import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, postAdded } from "../features/posts/postSlice";
import { selectAllUsers } from "../features/users/userSlice";


const AddPostForm = () => {
    const users = useSelector(selectAllUsers);
    const dispatch = useDispatch();
    const [inputData, setInputData] = useState({
        id: '',
        title: '',
        content: '',
        userId: "",
    });
    const [addRequestStatus, setAddRequestStatus] = useState('idle');



    const canSave = Boolean(inputData.content) && Boolean(inputData.title) && Boolean(inputData.userId) && addRequestStatus === 'idle'


    const handleForm = e => {
        setInputData(prev => ({ ...prev, [e.target.name]: [e.target.value] }));
    }

    const handleClick = (e) => {
        const data = {
            title: inputData.title,
            body: inputData.content,
            userId: inputData.user,
            id: inputData.id
        }

        if (canSave) {
            try {
                setAddRequestStatus('pending');
                dispatch(addNewPost(data)).unwrap();
                setInputData({ id: '', userId: '', title: '', content: '' });
            } catch (err) {
                console.log('Failed to save the post');
            } finally {
                setAddRequestStatus('idle');
            }
        }


        // e.preventDefault();
        // if (inputData.content && inputData.title && inputData.userId) {
        //     dispatch(postAdded(inputData));
        // }
        // setInputData({
        //     id: '',
        //     title: '',
        //     content: '',
        // });
    }

    const ChooseSelect = () => {
        return (
            <select
                name="userId"
                id="userId"
                onChange={handleForm}
                className='form-select'>
                {/* <option value="none" selected disabled hidden>Choose Author</option> */}
                {users.map(user => (
                    <option
                        key={user.id}
                        value={user.id} >
                        {user.name}
                    </option>
                ))
                }
            </select >
        )
    }

    return (
        <div className="mb-3">
            <form>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="form-group mb-3">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    placeholder="Title"
                                    name="title"
                                    className="form-control"
                                    onChange={handleForm}
                                    value={inputData.title || ''}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="content">Content</label>
                                <textarea
                                    name="content"
                                    id="content"
                                    cols="30"
                                    rows="3"
                                    className="form-control"
                                    onChange={handleForm}
                                    value={inputData.content || ''}
                                ></textarea>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="author">Author</label>
                                <ChooseSelect />
                            </div>
                            <div className="form-group mt-3">
                                <button
                                    className="btn btn-dark"
                                    onClick={handleClick}
                                    disabled={!canSave}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}



export default AddPostForm