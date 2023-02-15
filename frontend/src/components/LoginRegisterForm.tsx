import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { login, register } from "../redux/reducers/loginReducer";
import { SignInCredentials } from "../types/user";
import { Button } from "./Button";
import { Input } from "./Input";

export function LoginRegisterForm() {
    const dispatch = useAppDispatch();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [registerForm, setRegisterForm] = useState(false);

    function onSubmit() {
        let credentials:SignInCredentials = {
            username: user,
            password: password
        }
        if (registerForm && password === passwordConfirm) {
            dispatch(register(credentials));
            setRegisterForm(false);
            setPassword("");
            setPasswordConfirm("");
            return;
        } else {
            //inform missmatch in passwords
        }
        dispatch(login(credentials));   
    }

    return (
        <div className="user-form">
            <h1>{registerForm ? "Register" : "Log in"}</h1>
            <div className="user-form_text-fields">
                <Input name="Username" state={user} setState={setUser} isPassword={false}/>
                <Input name="Password" state={password} setState={setPassword} isPassword={true}/>
                {registerForm && <Input name="Confirm password" state={passwordConfirm} setState={setPasswordConfirm} isPassword={true}/>}
            </div>
            <div className="user-form_buttons">
                <Button name={registerForm ? "Register" : "Log in" } class="btn" onClick={onSubmit}/>
                <Button name={registerForm ? "Log in?" : "Sign up?"} class="btn" onClick={() => setRegisterForm(!registerForm)}/>
            </div>
        </div>
    )
}