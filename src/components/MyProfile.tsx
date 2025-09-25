import { Menu, pageType } from "./Menu";
import { User, dataUser } from "../modules/User";
import '../css/myProfile.css'
import userPhoto from "../img/userPhoto.png"
import { InputChange } from "./InputChange";
import saveIMG from '../img/save.png'
import { useState } from "react";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form'
import { dataOrg } from "./SignIn";


export function MyProfile() {
    const [locked, setLocked] = useState(true);

    const schema = yup.object().shape({
        username: yup.string().required("Username is required").min(3).max(9),
        email: yup.string().email("Email is not valid").required("Email is required"),
        password: yup.string().min(5).max(15).required("Password is required"),
        repeatPassword: yup.string()
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    let currentUserJSON = localStorage.getItem("currentUser")
    let currentUser: dataUser;

    if (currentUserJSON != null) {
        currentUser = JSON.parse(currentUserJSON)
    }
    else
        return <div></div>






    function onError(errors: any) {
        const messages = Object.values(errors)
            .map((err: any) => err.message)
            .join("\n");
        alert(messages);
    }

    function userExist(email: string, username: string, id: number): boolean {
        let status: boolean = false;
        const data = localStorage.getItem("arrayUsers");

        if (data) {
            let structuredData: dataUser[] = JSON.parse(data);
            structuredData.forEach(user => {
                if ((user.email === email || user.username === username) && (user.id != id)) {

                    status = true
                }
            })

        }

        return status;
    }


    function onSubmit(data: dataOrg) {

        if (data.repeatPassword != data.password && !locked) {
            alert("Passwords must be the same")
            return
        }


        if (userExist(data.email, data.username, currentUser.id)) {
            alert("Entered username or email is already in use!")
            return
        }


        let allUsersJSON: any = localStorage.getItem("arrayUsers")
        if (allUsersJSON != null) {
            let allUsers: dataUser[] = JSON.parse(allUsersJSON)
            allUsers.forEach((user) => {
                if (user.id === currentUser.id) {
                    user.username = data.username
                    user.email = data.email
                    user.password = data.password
                    currentUser.username = data.username
                    currentUser.email = data.email
                    currentUser.password = data.password

                }

            });

            localStorage.setItem("arrayUsers", JSON.stringify(allUsers))
            localStorage.setItem("currentUser", JSON.stringify(currentUser))
            window.location.reload();
        }
        else
            return
    }

    return (<div>
        <Menu page={pageType.MyProfile} user={currentUser} />
        <div id='myProfileContent'>
            <div id="profilePhotoContainer"><img src={userPhoto} id="userPhoto" /></div>
            <div id="changeProfilePhotoBtn">CHANGE PROFILE PHOTO</div>
            <form id="profileInputContainer" onSubmit={handleSubmit(onSubmit, onError)}>
                <InputChange name="username" label="USERNAME" locked={locked} setLocked={setLocked} initialValue={currentUser.username} register={register} />
                <InputChange name="email" label="EMAIL" locked={locked} setLocked={setLocked} initialValue={currentUser.email} register={register} />
                <InputChange name="password" label="PASSWORD" locked={locked} setLocked={setLocked} initialValue={currentUser.password} register={register} />
                <InputChange name="repeatPassword" label="REPEAT PASSWORD" locked={locked} setLocked={setLocked} register={register} />
                <button id="imgSAVEbtn" type="submit"><img src={saveIMG} id="imgSave" /></button>
            </form>

        </div>
    </div>)
}