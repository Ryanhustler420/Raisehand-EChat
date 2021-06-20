import React from 'react';
import { useForm } from 'react-hook-form';
import { withBaseLayout } from './../Hoc/BaseLayout';

function ChatCreateView() {

    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        alert(JSON.stringify(data))
    }

    return (
        <div className="centered-view">
            <div className="centered-container">
                <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
                    <div className="header">New Channel</div>
                    <div className="subheader">Let's meet inside, share vision, <b>together</b>.</div>
                    <div className="form-container">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                {...register("name")}
                                aria-describedby="nameHelp" />
                            <small id="nameHelp" className="form-text text-muted">Be as creative as you can.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                {...register("description")}
                                className="form-control"
                                id="description" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image</label>
                            <input
                                type="text"
                                className="form-control"
                                id="image"
                                {...register("image")}
                                aria-describedby="imageHelp" />
                        </div>
                        <button type="submit" className="btn btn-outline-success">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default withBaseLayout(ChatCreateView, { canGoBack: true })