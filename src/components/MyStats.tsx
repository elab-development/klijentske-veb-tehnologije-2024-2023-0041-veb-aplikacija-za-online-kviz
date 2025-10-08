import { Menu, pageType } from "./Menu";
import { dataUser } from "../modules/User";
import { Table } from "./Table";
import '../css/mystats.css'



export function MyStats() {
    let currentUserJSON = localStorage.getItem("currentUser")
    let currentUser: dataUser;

    if (currentUserJSON != null) {
        currentUser = JSON.parse(currentUserJSON)
    }
    else
        return <div></div>

    let admin: boolean = false;
    if (currentUser.username === "admin")
        admin = true;

    return (
        <div id="myStatsPage">
            <Menu page={pageType.MyStats} user={currentUser} />
            <div id="tableContainer">
                <Table admin={admin} />
            </div>

        </div>
    )
}