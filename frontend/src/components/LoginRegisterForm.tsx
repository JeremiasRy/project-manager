import { useState } from "react";
import { useAppDispatch } from "../hooks/reduxHook";
import { login } from "../redux/reducers/loginReducer";
import { SignInCredentials } from "../types/user";
import { Button } from "./Button";
import { Input } from "./Input";

export function LoginRegisterForm() {
    const dispatch = useAppDispatch();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [register, setRegister] = useState(false);

    function onSubmit() {
        if (register && password === passwordConfirm) {
            //notify a missmatch in password confirmation
            return;
        }
        let credentials:SignInCredentials = {
            username: user,
            password:password
        }
        dispatch(login(credentials));   
    }
    return (
        <div className="user-form">
            <h1>{register ? "Register" : "Log in"}</h1>
            <div className="user-form_text-fields">
                <Input name="Username" state={user} setState={setUser} isPassword={false}/>
                <Input name="Password" state={password} setState={setPassword} isPassword={true}/>
                {register && <Input name="Confirm password" state={passwordConfirm} setState={setPasswordConfirm} isPassword={true}/>}
            </div>
            <div className="user-form_buttons">
                <Button name={register ? "Register" : "Log in" } class="btn" onClick={onSubmit}/>
                <Button name={register ? "Log in?" : "Sign up?"} class="btn" onClick={() => setRegister(!register)}/>
            </div>
        </div>
    )
}