import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const InputProfilePic = () => {
    const { store, actions } = useContext(Context);
    const [files, setFiles] = useState(null);

    const uploadImage = evt => {
        evt.preventDefault();
        console.log("These are the files", files);

        let body = new FormData();
        body.append("profile_image", files[0]);
        const options = {
            body,
            method: "POST",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token")
            },
        };

        fetch(`${process.env.BACKEND_URL}api/user/image`, options)
            .then(resp => resp.json())
            .then(data => { actions.validate_user(); console.log("Success!!!! Profile picture uploaded.", data) })
            .catch(error => console.error("ERRORRRRRR!!! Something went wrong with trying to upload profile picture.", error));
    };


    return (
        <div>
            <form onSubmit={uploadImage}>
                <input
                    type="file"
                    id="profile-pic-upload"
                    onChange={e => setFiles(e.target.files)} />
                {
                    !store.user.profile_picture
                        ?
                        <img
                            src="https://placehold.co/600x400.png"
                            className="card-img-top"
                            alt="Profile Picture" />
                        :
                        files == null ?
                            <img src={store.user.profile_picture} className="card-img-top" alt="saved profile picture" />
                            :
                            <img src={URL.createObjectURL(files[0])} className="card-img-top" alt="new profile picture" />
                }

                <div className="mt-2 d-flex justify-content-end">
                    <div className="me-2">
                        <button className="btn custom-button">Upload image</button>
                    </div>
                </div>

            </form>
        </div>
    )
}

