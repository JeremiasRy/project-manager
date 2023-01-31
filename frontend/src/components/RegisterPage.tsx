import {FormEvent, useState} from 'react'
import {
  TextField,
  Button,
  Container,
  CssBaseline,
  Typography,
} from "@material-ui/core";
import { Store } from 'react-notifications-component'
import StoreServices from '../StoreServices'
import { RegisterDataType } from '../type/Authenticate'

const RegisterPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const service = new StoreServices()

    //REGISTRATION
    const registerFormHandle = (e:FormEvent, data:RegisterDataType) => {
        e.preventDefault();
        if(data.password.length < 5) {
            Store.addNotification({
                title: "Password must be at least 5 characters",
                type: "danger",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 1000,
                    onScreen: true
                }
            })
        }
        else {
            service.createNewUser(data)
                .then(() => Store.addNotification({
                    title: "Great!",
                    message: "User created successfully!",
                    type: "success",
                    insert: "top",
                    container: "bottom-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 2000,
                        onScreen: true
                    }
                }))
                .catch((e) => Store.addNotification({
                    title: "Oops!",
                    message: `${e.response.data.message[0]}`,
                    type: "danger",
                    insert: "top",
                    container: "bottom-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 2000,
                        onScreen: true
                    }
                }))
        }
    }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form onSubmit={(e) => registerFormHandle(e, {email,  password})}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            onChange={(e)=> {
                setEmail(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e)=>{
                setPassword(e.target.value);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default RegisterPage;
