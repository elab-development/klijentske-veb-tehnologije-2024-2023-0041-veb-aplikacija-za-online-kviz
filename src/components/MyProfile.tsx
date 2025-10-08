import { Menu, pageType } from "./Menu";
import { User, dataUser } from "../modules/User";
import '../css/myProfile.css'
import userPhoto from "../img/userPhoto.png"
import { InputChange } from "./InputChange";
import saveIMG from '../img/save.png'
import { useEffect, useState } from "react";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form'
import { dataOrg } from "./SignIn";
import { ComboBox } from "./ComboBox";
import { Quiz } from "../modules/Quiz";
import { QuizObject } from "./QuizCard";
import { useRef } from "react";
import { quizQuestion, quizTry } from "./SingleQuestion";
import { option } from "./AnswerOption";
import defaultQuizIMG from '../img/default.jpg'

export function MyProfile() {
    const [locked, setLocked] = useState(true);

    const [restart, setRestart] = useState<string>("")


    const [inputFieldName, setInputFieldName] = useState<string>("")
    const [inputFieldGroup, setInputFieldGroup] = useState<string>("")
    const [inputFieldDescription, setInputFieldDescription] = useState<string>("")
    const [inputFieldMinutes, setInputFieldMinutes] = useState<number>(0)
    const [inputFieldSeconds, setInputFieldSeconds] = useState<number>(0)
    const [inputFieldQuestion, setInputFieldQuestion] = useState<string>("")
    const [inputFieldA, setInputFieldA] = useState<string>("")
    const [inputFieldB, setInputFieldB] = useState<string>("")
    const [inputFieldC, setInputFieldC] = useState<string>("")
    const [inputFieldD, setInputFieldD] = useState<string>("")
    const [selectedRadio, setSelectedRadio] = useState<string>("")
    const [comboBoxName, setComboBoxName] = useState<string[]>([])
    const [comboBoxQuestion, setComboBoxQuestion] = useState<string[]>([])
    const [selectedQuiz, setSelectedQuiz] = useState<string>("")
    const [img, setImg] = useState<string>("")


    let firstRenderRef = useRef<boolean>(false)
    let currentQuestionRef = useRef<number>(0)
    let currentQuizRef = useRef<QuizObject>({
        title: "asdas",
        description: "",
        difficulty: 0,
        group: "",
        id: -5,
        image: "",
        questionsID: [],
        time: 0
    })

    let currentQuestionDataRef = useRef<quizQuestion>({
        quizID: -100,
        questionID: -100,
        questionText: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: option.A
    })

    let currentQuestionIDRef = useRef<number>(-100)
    let currentQuizRefQuestions = useRef<quizQuestion[]>([])
    let selectedFirstQuestion = useRef<boolean>(false)
    let newQuestion = useRef<boolean>(false)
    let newQuiz = useRef<boolean>(false)









    const schema = yup.object().shape({
        username: yup.string().required("Username is required").min(3).max(9),
        email: yup.string().email("Email is not valid").required("Email is required"),
        password: yup.string().min(5).max(15).required("Password is required"),
        repeatPassword: yup.string()
    })

    const { register, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    })

    let currentUserJSON = localStorage.getItem("currentUser")
    let currentUser: dataUser;






    if (currentUserJSON != null) {
        currentUser = JSON.parse(currentUserJSON)
    }
    else
        return <div></div>



    function saveChanges() {
        let quiz: Quiz = new Quiz("", "", 0, "", 0, "", [], 0)

        let correctAnswer: option = option.A

        if (selectedRadio === "A")
            correctAnswer = option.A

        if (selectedRadio === "B")
            correctAnswer = option.B

        if (selectedRadio === "C")
            correctAnswer = option.C

        if (selectedRadio === "D")
            correctAnswer = option.D

        if (newQuestion.current) {
            if (inputFieldQuestion != "" && inputFieldA != "" && inputFieldB != "" && inputFieldC != "" && inputFieldD != "" && selectedRadio != "none") {
                let newQuestionData: quizQuestion = {
                    quizID: currentQuizRef.current.id,
                    questionID: quiz.getNextQuestionID(),
                    questionText: inputFieldQuestion,
                    optionA: inputFieldA,
                    optionB: inputFieldB,
                    optionC: inputFieldC,
                    optionD: inputFieldD,
                    correctAnswer: correctAnswer
                }

                let allQuestion: quizQuestion[] = quiz.getAllQuizQuestions()
                allQuestion.push(newQuestionData)
                localStorage.setItem("arrayQuestions", JSON.stringify(allQuestion))


                currentQuizRef.current.questionsID.push(newQuestionData.questionID)
                let allQuizzes: QuizObject[] = quiz.getAllQuizzes()
                allQuizzes.forEach((quiz: QuizObject, index: number) => {
                    if (quiz.id === currentQuizRef.current.id) {
                        allQuizzes[index].questionsID = currentQuizRef.current.questionsID
                    }
                })

                localStorage.setItem("quizObjects", JSON.stringify(allQuizzes))
            }
            else {
                alert("Please fill all the fields!")
                return
            }

            window.location.reload()
            return

        }

        if (newQuiz.current) {

            if (selectedRadio != "none" && inputFieldName != "" && inputFieldGroup != "" && inputFieldDescription != "" && (inputFieldMinutes != 0 || inputFieldSeconds != 0) && inputFieldQuestion != "" && inputFieldA != "" && inputFieldB != "" && inputFieldC != "" && inputFieldD != "") {

                let newQuizData: QuizObject = {
                    title: inputFieldName,
                    difficulty: 2,
                    description: inputFieldDescription,
                    group: inputFieldGroup,
                    id: quiz.getNextQuizID(),
                    image: "default.jpg",
                    time: inputFieldMinutes * 60 + inputFieldSeconds,
                    questionsID: [quiz.getNextQuestionID()]
                }

                let allQuizzes: QuizObject[] = quiz.getAllQuizzes()
                let nameExists: boolean = false;
                allQuizzes.forEach((quiz: QuizObject) => {
                    if (quiz.title === newQuizData.title)
                        nameExists = true;
                })

                if (nameExists) {
                    alert("This quiz name already exists")
                    return
                }

                allQuizzes.push(newQuizData)
                localStorage.setItem("quizObjects", JSON.stringify(allQuizzes))

                let newQuestionData: quizQuestion = {
                    quizID: currentQuizRef.current.id,
                    questionID: quiz.getNextQuestionID(),
                    questionText: inputFieldQuestion,
                    optionA: inputFieldA,
                    optionB: inputFieldB,
                    optionC: inputFieldC,
                    optionD: inputFieldD,
                    correctAnswer: correctAnswer
                }

                let allQuestion: quizQuestion[] = quiz.getAllQuizQuestions()
                allQuestion.push(newQuestionData)
                localStorage.setItem("arrayQuestions", JSON.stringify(allQuestion))

                window.location.reload()
                return

            }
            else {
                alert("Please fill all the fields!")
                return
            }
        }

        let dataQuizChanged: QuizObject = {
            title: inputFieldName,
            difficulty: currentQuizRef.current.difficulty,
            description: inputFieldDescription,
            group: inputFieldGroup,
            id: currentQuizRef.current.id,
            image: currentQuizRef.current.image,
            time: inputFieldMinutes * 60 + inputFieldSeconds,
            questionsID: currentQuizRef.current.questionsID
        }

        let quiz1: Quiz = new Quiz("", "", 0, "", 0, "", [], 0)
        let allQuizzesData: QuizObject[] = quiz1.getAllQuizzes()

        allQuizzesData.forEach((quiz: QuizObject, index: number) => {
            if (quiz.id === dataQuizChanged.id) {
                allQuizzesData[index] = dataQuizChanged

            }
        })

        let correctChanged: option = currentQuestionDataRef.current.correctAnswer
        switch (selectedRadio) {
            case "A": correctChanged = option.A; break;
            case "B": correctChanged = option.B; break;
            case "C": correctChanged = option.C; break;
            case "D": correctChanged = option.D; break;
        }

        let questionChanged: quizQuestion = {
            quizID: currentQuestionDataRef.current.quizID,
            questionID: currentQuestionDataRef.current.questionID,
            questionText: inputFieldQuestion,
            optionA: inputFieldA,
            optionB: inputFieldB,
            optionC: inputFieldC,
            optionD: inputFieldD,
            correctAnswer: correctChanged
        }

        let allQuizQuestion: quizQuestion[] = quiz1.getAllQuizQuestions()
        allQuizQuestion.forEach((question: quizQuestion, index: number) => {
            if (question.questionID === currentQuestionDataRef.current.questionID) {
                allQuizQuestion[index] = questionChanged
            }
        })

        localStorage.setItem("arrayQuestions", JSON.stringify(allQuizQuestion))
        localStorage.setItem("quizObjects", JSON.stringify(allQuizzesData))
        window.location.reload()
    }

    function handleChangeQuestion(question: string) {
        if (question === "+ADD QUESTION" && !newQuestion.current) {
            newQuestion.current = true
            setInputFieldQuestion("")
            setInputFieldA("")
            setInputFieldB("")
            setInputFieldC("")
            setInputFieldD("")
            setSelectedRadio("none")
            return
        }

        let questionNumber: number = parseInt(question.replace("Question ", ""))
        currentQuestionRef.current = questionNumber - 1
        setInputFieldQuestion(currentQuizRefQuestions.current[currentQuestionRef.current].questionText)
        setInputFieldA(currentQuizRefQuestions.current[currentQuestionRef.current].optionA)
        setInputFieldB(currentQuizRefQuestions.current[currentQuestionRef.current].optionB)
        setInputFieldC(currentQuizRefQuestions.current[currentQuestionRef.current].optionC)
        setInputFieldD(currentQuizRefQuestions.current[currentQuestionRef.current].optionD)
        currentQuestionIDRef.current = currentQuizRefQuestions.current[currentQuestionRef.current].questionID
        currentQuestionDataRef.current = currentQuizRefQuestions.current[currentQuestionRef.current]
        setSelectedRadio(currentQuestionDataRef.current.correctAnswer)
    }

    function handleChangeQuiz(name: string) {
        if (name === "+ADD QUIZ" && !newQuiz.current) {
            {
                newQuiz.current = true
                setInputFieldName("")
                setImg("default.jpg")
                setInputFieldGroup("")
                setInputFieldDescription("")
                setInputFieldMinutes(0)
                setInputFieldSeconds(0)
                setInputFieldQuestion("")
                setInputFieldA("")
                setInputFieldB("")
                setInputFieldC("")
                setInputFieldD("")
                setSelectedRadio("none")
                return
            }

        }


        let quiz1: Quiz = new Quiz("", "", 0, "", 0, "", [], 0)
        let selectedQuiz: QuizObject = quiz1.getQuizByName(name)
        setInputFieldName(selectedQuiz.title)
        setInputFieldGroup(selectedQuiz.group)
        setInputFieldDescription(selectedQuiz.description)
        setInputFieldMinutes(Math.floor(selectedQuiz.time / 60))
        setInputFieldSeconds(selectedQuiz.time % 60)
        setImg(selectedQuiz.image)

        let questionsSelectedQuiz: quizQuestion[] = quiz1.getQuizQuestionsCurrent(selectedQuiz.questionsID)
        let questionComboName: string[] = []
        for (let i = 1; i <= questionsSelectedQuiz.length; i++) {
            questionComboName.push("Question " + i)
        }
        questionComboName.push("+ADD QUESTION")
        currentQuestionRef.current = 0

        setInputFieldQuestion(questionsSelectedQuiz[0].questionText)

        setInputFieldA(questionsSelectedQuiz[0].optionA)
        setInputFieldB(questionsSelectedQuiz[0].optionB)
        setInputFieldC(questionsSelectedQuiz[0].optionC)
        setInputFieldD(questionsSelectedQuiz[0].optionD)


        setComboBoxQuestion(questionComboName)

        currentQuizRef.current = selectedQuiz
        currentQuizRefQuestions.current = questionsSelectedQuiz
        currentQuestionIDRef.current = questionsSelectedQuiz[0].questionID
        selectedFirstQuestion.current = true
        setRestart("")
        currentQuestionDataRef.current = questionsSelectedQuiz[0]
        setSelectedRadio(questionsSelectedQuiz[0].correctAnswer)
    }


    if (currentUser.username === "admin") {

        let quiz: Quiz = new Quiz("", "", 0, "", 0, "", [], 0)
        let quizData: QuizObject[] = quiz.getAllQuizzes()


        if (!firstRenderRef.current) {
            let questionsData: quizQuestion[] = quiz.getQuizQuestionsCurrent(quizData[0].questionsID)
            setInputFieldName(quizData[0].title)
            setInputFieldGroup(quizData[0].group)
            setInputFieldDescription(quizData[0].description)
            setInputFieldMinutes(Math.floor((quizData[0].time) / 60))
            setInputFieldSeconds((quizData[0].time) % 60)
            setInputFieldQuestion(questionsData[0].questionText)
            setInputFieldA(questionsData[0].optionA)
            setInputFieldB(questionsData[0].optionB)
            setInputFieldC(questionsData[0].optionC)
            setInputFieldD(questionsData[0].optionD)
            setImg(quizData[0].image);

            let comboBoxValue: string[] = quiz.getQuizNames()
            comboBoxValue.push("+ADD QUIZ")
            setComboBoxName(comboBoxValue)


            let questionComboName: string[] = []
            for (let i = 1; i <= questionsData.length; i++) {
                questionComboName.push("Question " + i)
            }
            questionComboName.push("+ADD QUESTION")
            setComboBoxQuestion(questionComboName)

            setSelectedQuiz(quizData[0].title)
            firstRenderRef.current = true
            currentQuizRef.current = quizData[0]
            currentQuizRefQuestions.current = questionsData
            currentQuestionIDRef.current = questionsData[0].questionID
            currentQuestionDataRef.current = questionsData[0]
            setSelectedRadio(questionsData[0].correctAnswer)
        }


        return (<div>
            <Menu page={pageType.MyProfile} user={currentUser} />
            <div id="adminEditContainer">
                <div id="editLeft">
                    <div id="editInnerLeft">
                        <ComboBox change={handleChangeQuiz} name={comboBoxName[0]} listOptions={comboBoxName.slice(1, comboBoxName.length)} state={setSelectedQuiz} />
                        <input type="text" className="editInput" value={inputFieldName} onChange={e => { setInputFieldName(e.target.value) }} />
                        <img src={"/img/" + img} id="quizImage" />
                        <button id="buttonLeft">CHANGE PHOTO</button>
                    </div>
                </div>
                <div id="editCenter">
                    <div id="quizGroupContainer">
                        Quiz group:
                        <input type="text" id="quizEdit" className="editInput" value={inputFieldGroup} onChange={e => { setInputFieldGroup(e.target.value) }} />
                    </div>
                    <textarea id="descriptionInput" value={inputFieldDescription} onChange={e => { setInputFieldDescription(e.target.value) }} />
                    <div id="timerEditContainer">
                        Quiz time length:
                        <div id="timerContainer">
                            <input type="number" min={0} className="timerTime" value={inputFieldMinutes} onChange={e => { setInputFieldMinutes(parseInt(e.target.value)) }} />m
                            <input type="number" min={0} className="timerTime" value={inputFieldSeconds} onChange={e => { setInputFieldSeconds(parseInt(e.target.value)) }} />s
                        </div>

                    </div>
                </div>
                <div id="editRight">
                    <ComboBox name={comboBoxQuestion[0]} listOptions={comboBoxQuestion.slice(1, comboBoxQuestion.length)} state={setRestart} change={handleChangeQuestion} selectedFirst={selectedFirstQuestion.current} key={selectedQuiz} />
                    <input type="text" id="quizEdit" className="editInput" value={inputFieldQuestion} onChange={e => { setInputFieldQuestion(e.target.value) }} style={{ width: "400px", fontSize: "15px" }} />
                    <div id="optionsConteiner">
                        <div className="singleOptionEdit">
                            <input className="radioInput" type="radio" name="option" onClick={() => setSelectedRadio("A")} checked={selectedRadio === "A" ? true : false} /> <div className="optionName">A.</div> <input type="text" value={inputFieldA} onChange={e => { setInputFieldA(e.target.value) }} id="quizEdit" className="editInput" style={{ width: "400px" }} />
                        </div>

                        <div className="singleOptionEdit">
                            <input className="radioInput" type="radio" name="option" onClick={() => setSelectedRadio("B")} checked={selectedRadio === "B" ? true : false} /> <div className="optionName">B.</div> <input type="text" value={inputFieldB} onChange={e => { setInputFieldB(e.target.value) }} id="quizEdit" className="editInput" style={{ width: "400px" }} />
                        </div>

                        <div className="singleOptionEdit">
                            <input className="radioInput" type="radio" name="option" onClick={() => setSelectedRadio("C")} checked={selectedRadio === "C" ? true : false} /> <div className="optionName">C.</div> <input type="text" value={inputFieldC} onChange={e => { setInputFieldC(e.target.value) }} id="quizEdit" className="editInput" style={{ width: "400px" }} />
                        </div>

                        <div className="singleOptionEdit">
                            <input className="radioInput" type="radio" name="option" onClick={() => setSelectedRadio("D")} checked={selectedRadio === "D" ? true : false} /> <div className="optionName">D.</div> <input type="text" value={inputFieldD} onChange={e => { setInputFieldD(e.target.value) }} id="quizEdit" className="editInput" style={{ width: "400px" }} />
                        </div>
                    </div>

                    <button id="buttonRight" onClick={saveChanges}>SAVE</button>
                </div>
            </div>
        </div>)
    }




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