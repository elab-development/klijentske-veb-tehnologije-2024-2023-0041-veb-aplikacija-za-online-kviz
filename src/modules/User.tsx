export interface dataUser {
    username: string;
    email: string;
    password: string;
    id: number;
}


export class User implements dataUser {
    username: string;
    email: string;
    password: string;
    id: number;
    currentUserData: dataUser;

    constructor(username: string, email: string, password: string) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.id = this.generateID();

        this.currentUserData = {
            username: username,
            email: email,
            password: password,
            id: this.generateID()
        };

    }



    generateID(): number {
        let data = localStorage.getItem("arrayUsers");
        let arrayLength: number

        if (data != null) {
            let structuredData: dataUser[] = JSON.parse(data);
            arrayLength = structuredData.length;
            return arrayLength + 1
        }
        else
            return 1
    }

    addToArray(arrayIN: dataUser[], user: dataUser): dataUser[] {
        return [...arrayIN, user]
    }

    addUser(): boolean {


        let data = localStorage.getItem("arrayUsers");
        let structuredData: dataUser[];

        data != null ? structuredData = JSON.parse(data) : structuredData = []

        if (!this.userExist()) {
            localStorage.setItem("arrayUsers", JSON.stringify(this.addToArray(structuredData, this.currentUserData)))
            return true;
        }


        return false;
    }

    userExist(): boolean {
        let status: boolean = false;
        const data = localStorage.getItem("arrayUsers");

        if (data != null) {
            let structuredData: dataUser[] = JSON.parse(data);
            structuredData.forEach(user => {
                if (user.email === this.email || user.username === this.username) {

                    status = true
                }
            })

        }

        return status;
    }


    getAllUsers(): dataUser[] {
        const data = localStorage.getItem("arrayUsers");
        if (data != null) {
            let structuredData: dataUser[] = JSON.parse(data);
            return structuredData
        }
        else {
            return [];
        }
    }

    checkCredentials(username: string, password: string): dataUser {
        let structuredData: dataUser[] = this.getAllUsers();
        let returnObj: dataUser = {
            username: "",
            email: "",
            password: "",
            id: 0,
        };

        if (structuredData.length === 0)
            return returnObj

        structuredData.forEach(user => {
            if (user.username === username && user.password === password) {
                returnObj = user;
            }

        })

        return returnObj;
    }

}