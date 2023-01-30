import { FormEvent, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Box, Typography } from '@material-ui/core';
import { authenticateUser } from '../redux/reducer/userReducer';
import { LoginDataType } from '../type/Authenticate';
import StoreServices from '../StoreServices';
import { useAppDispatch } from '../app/hooks';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px'
  },
  textField: {
    marginBottom: '20px'
  },
  button: {
    marginTop: '20px'
  }
});

const LoginPage = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const service = new StoreServices();
    
    //LOGIN
    const loginFormHandle = (e:FormEvent, data:LoginDataType) => {
        e.preventDefault()
        service.login(data)
            .then((res)=> {
                localStorage.setItem('access_token', res.data['access_token']);
            })
            .then(getUserLogin)
    }

    const getUserLogin = () => {
        dispatch(authenticateUser(localStorage.getItem('access_token')));
    }

  return (
    <Box className={classes.root} onSubmit={(e) => loginFormHandle(e, {email, password})}>
      <Typography variant="h5">Login</Typography>
      <TextField
        className={classes.textField}
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        className={classes.textField}
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type='submit'
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;