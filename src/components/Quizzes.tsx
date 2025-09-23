import { Menu, pageType } from "./Menu";
import { dataUser } from "../modules/User";

export function Quizzes() {
    let currentUserJSON = localStorage.getItem("currentUser")
    let currentUser: dataUser;

    if (currentUserJSON != null) {
        currentUser = JSON.parse(currentUserJSON)
    }
    else
        return <div></div>

    return (<div>
        <Menu page={pageType.Quizzes} user={currentUser} />
    </div>)
}