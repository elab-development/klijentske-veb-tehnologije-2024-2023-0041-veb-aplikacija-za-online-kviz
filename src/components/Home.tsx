import { Menu } from "./Menu";
import '../css/home.css'
import { pageType } from '../components/Menu'
import { dataUser } from '../modules/User';

export function Home() {
    let currentUserJSON = localStorage.getItem("currentUser")
    let currentUser: dataUser;

    if (currentUserJSON != null) {
        currentUser = JSON.parse(currentUserJSON)
    }
    else
        return <div></div>

    return (
        <div>
            <Menu page={pageType.Home} user={currentUser}></Menu>
        </div>

    );
}