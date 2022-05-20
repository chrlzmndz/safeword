import React, { useRef, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./../../../App.css";

import Box from "@mui/material/Box";
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { Typography } from '@mui/material';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import IconButton from '@mui/material/IconButton';
// import { styled } from '@mui/material/styles';

import axios from "../../../api/axios";

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{12,32}$/;
const REGISTER_URL = '/register';

const Register = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [phone, setPhone] = useState('');
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        userRef.current.focus();
    }, [email]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(phone));
    }, [phone]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd]);

    useEffect(() => {
        setErrMsg('');
    }, [email, phone, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PHONE_REGEX.test(phone);
        const v3 = PWD_REGEX.test(pwd); //u can space as password char???
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ email: email, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            // console.log(response.data);
            // console.log(response.accessToken);
            // console.log(JSON.stringify(response));
            setSuccess(true);
            // clear input fields
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            } else if (err.response?.status === 409) {
                setErrMsg('Email taken');
            } else {
                setErrMsg('Registration failed');
            }
            errRef.current.focus();
        }
    }

    function MyFormHelperText() {
        // const helperTextStyles = styled('MuiFormHelperText')({
        //     '& .MuiFormHelperText-root': {
        //         color: '#4caf50',
        //     }
        // });

        const helperText = () => {
            if (pwd && !validPwd) {
                return (
                    <FormHelperText component={'span'} error={true}>
                        At least 12 characters, contain A-Z, a-z, 0-9, and !@#$%^*.
                    </FormHelperText>
                )
            // } else if (pwd && pwdFocus && validPwd) {
            //     return (
            //         <FormHelperText
            //             component={'span'}
            //             sx={{
            //                 '& .MuiFormHelperText-root': {
            //                     color: '#4caf50 !important',
            //                 },
            //             }}
            //             style={{
            //                 '& .css-1d1r5q-MuiFormHelperText-root': {
            //                     color: '#4caf50 !important',
            //                 },
            //             }}
            //         >
            //             Avoid sharing your master password to anyone.
            //         </FormHelperText>
            //     )
            } else {
                return 'Avoid sharing your master password to anyone.';
            }

        };
        return <FormHelperText>{helperText()}</FormHelperText>;

    }

    return (
        <>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <Box sx={{ mr: 2 }}>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h4"
                        sx={{ textAlign: 'center' }}>
                        Sign up
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 0.5 }}>
                        <AlternateEmailIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
                        <TextField
                            required
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            placeholder="user@email.com"
                            label="Email"
                            variant="standard"
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            error={!emailFocus && email && !validEmail ? true : false}
                            helperText={!emailFocus && email && !validEmail ? "Not valid email." : ''}
                            fullWidth
                        />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 0.5 }}>
                        <PhoneIphoneIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
                        <TextField
                            required
                            id="phone"
                            autoComplete="off"
                            placeholder="0912 345 6789"
                            label="Phone"
                            variant="standard"
                            onChange={(e) => setPhone(e.target.value)}
                            onFocus={() => setPhoneFocus(true)}
                            onBlur={() => setPhoneFocus(false)}
                            error={!phoneFocus && phone && !validPhone ? true : false}
                            helperText={!phoneFocus && phone && !validPhone ? "Not valid phone number." : ''}
                            fullWidth
                        />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 4 }}>
                        <KeyRoundedIcon sx={{ color: 'action.active', mr: 2, mb: 3 }} />
                        <FormControl fullWidth variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Master password</InputLabel>
                            <Input
                                required
                                id="password"
                                autoComplete="off"
                                label="Master Password"
                                placeholder="************"
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => setPwd(e.target.value)}
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                                error={!!pwd && !validPwd ? true : false}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <MyFormHelperText />
                        </FormControl>
                    </Box>

                    <Box sx={{ textAlign: 'center', mt: 2.5 }}>
                        <Button
                            type="submit"
                            variant="outlined"
                            disabled={!validEmail || !validPhone || !validPwd ? true : false}
                        >
                            Sign Up
                        </Button>
                    </Box>

                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                        <Typography variant="overline" >
                            Have an account? <Link to="/login" style={{ textDecoration: 'none' }}>log in</Link>
                        </Typography>
                    </Box>

                </form>
            </Box>
        </>
    )
}

export default Register;