import React, { useState } from 'react';
import Header from '../../components/header';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import history from '../../history';
import './login.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '35ch',
    },

  },
  card: {
    maxWidth: 345,
    margin:'auto',
    marginTop:"50px"
  },
}));


function LoginForm() {
  const classes = useStyles();
  const [details, setDetails] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [error1, setError1] = useState('');

  const Login = async (details) => {
    if( details.email=== "sanjaykumar@gmail.com" && details.password === "12345"){
        history.push('/home');

    }
    
  };

//   const ValidateEmail = (e) => {
//     e.preventDefault();
//     var email = e.target.value;
//     if (!validator.isEmail(email)) {
//       setError1('Enter valid Email!');
//     }
//   };
  const submitHandler = (e) => {
    e.preventDefault();
    Login(details);
  };

  return (
    <div>
      <div>
        <Header/>
      </div>
      <Card className={classes.card}>
        <div>
          <form className={classes.root} onSubmit={submitHandler}>
            <div>
              <div className="logo">
              <img
                src="https://media-exp1.licdn.com/dms/image/C4D0BAQHNwdJlZmUh8g/company-logo_200_200/0/1593941980738?e=1632960000&amp;v=beta&amp;t=a7LpkSX_fT5QrIsDb9DxbXWzFvyhPxAhc4oHl-rBLOQ"
                loading="lazy"
                alt="CodeUnity logo"
                id="ember499"
                style={{
                  marginLeft: '31%',
                  marginTop: '-1%',
                  height: '0%',
                  width: '40%',
                }}
              ></img>
              </div>
              <h2 style={{marginLeft:'50px',marginTop:'-45px'}}>Log In to Your Account</h2>
              <form className={classes.root} noValidate autoComplete="off">
                <div style={{marginLeft:"20px"}}>
                  <TextField
                    required
                    id="outlined-full-width"
                    label="Email"
                    type="email"
                    variant="outlined"
                    inputProps={{
                      className:classes.textField
                    }}
                    onChange={(e) => {
                      setDetails({ ...details, email: e.target.value });
                    }}
                  />
                  {error1 !== '' ? (
                  <div className="error"> &nbsp; &nbsp; &nbsp; {error1}</div>
                  ) : (
                  ''
                  )}
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    fullWidth
                    onChange={(e) =>
                      setDetails({ ...details, password: e.target.value })
                    }
                  />
                  {error !== '' ? (
                  <div className="error"> &nbsp; &nbsp; &nbsp; {error}</div>
                    ) : (
                      ''
                    )}
                    
                </div>
                <div style={{marginLeft:"30px",marginBottom:"30px"}}>
                    <Button variant="contained" color="primary" onClick={submitHandler}>
                      Log In
                    </Button>
                </div>
              </form>         
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default LoginForm;