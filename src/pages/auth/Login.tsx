import { useEffect, useState } from 'react';
import { Grid, Stack, Typography, TextField, Button } from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import imgGoogle from '../../assets/images/auth/google.svg';
import imgLogo from '../../assets/images/auth/img_logo.png';
import imgLogin from '../../assets/images/auth/img_login.png';
import { GoogleButton } from '../../styles/CssStyled';
import { fetchData } from '../../components/FetchData';
import { AuthUrl, LoginUrl, RegisterUrl, CheckUserCountUrl } from '../../services/ApiUrls';
import '../../styles/style.css';

declare global {
    interface Window {
        google: any;
        gapi: any;
    }
}

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState(false);
    const [userExists, setUserExists] = useState(true);
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [signUpError, setSignUpError] = useState('');

    useEffect(() => {
        if (localStorage.getItem('Token')) {
            navigate('/app');
        }

        // Check if users exist in the database
        fetch(CheckUserCountUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            setUserExists(data.user_count > 0);
        })
        .catch(error => {
            console.error('Error fetching user count:', error);
        });
    }, [token, navigate]);

    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            const apiToken = { token: tokenResponse.access_token };
            const head = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
            fetchData(`${AuthUrl}/`, 'POST', JSON.stringify(apiToken), head)
                .then((res) => {
                    localStorage.setItem('Token', `Bearer ${res.access_token}`);
                    setToken(true);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        },
    });

    const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const loginData = { email, password };
        const head = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        fetchData(LoginUrl, 'POST', JSON.stringify(loginData), head)
            .then((res) => {
                if (res.access_token) {
                    localStorage.setItem('Token', `Bearer ${res.access_token}`);
                    navigate('/app');
                } else {
                    setError('Invalid email or password');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setError('Something went wrong. Please try again.');
            });
    };

    const handleSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const signUpData = { email: signUpEmail, password: signUpPassword };
        const head = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        fetchData(RegisterUrl, 'POST', JSON.stringify(signUpData), head)
            .then((res) => {
                if (res.email && res.user_id) {
                    const loginData = { email: signUpEmail, password: signUpPassword };
                    fetchData(LoginUrl, 'POST', JSON.stringify(loginData), head)
                        .then((loginRes) => {
                            if (loginRes.access_token) {
                                localStorage.setItem('Token', `Bearer ${loginRes.access_token}`);
                                navigate('/app');
                            } else {
                                setSignUpError('Sign-up successful, but auto-login failed. Please try to log in manually.');
                            }
                        })
                        .catch((error) => {
                            setSignUpError('Sign-up successful, but auto-login failed. Please try to log in manually.');
                        });
                } else {
                    setSignUpError('Error during sign-up. Please try again.');
                }
            })
            .catch((error) => {
                setSignUpError('Something went wrong. Please try again.');
            });
    };
    

    return (
        <div>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent='center'
                alignItems='center'
                sx={{ height: '100%', width: '100%', position: 'fixed' }}
            >
                <Grid
                    container
                    item
                    xs={8}
                    direction='column'
                    justifyContent='center'
                    alignItems='center'
                    className='rightBg'
                    sx={{ height: '100%', overflow: 'hidden', justifyItems: 'center' }}
                >
                    <Grid item>
                        <Stack sx={{ alignItems: 'center' }}>
                            <h3>Welcome to BottleCRM</h3>
                            <p> Free and OpenSource CRM for small and medium businesses.</p>
                            <img
                                src={imgLogin}
                                alt='register_ad_image'
                                className='register-ad-image'
                            />
                            <footer className='register-footer'>
                                bottlecrm.com
                            </footer>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid
                    container
                    item
                    xs={8}
                    direction='column'
                    justifyContent='space-evenly'
                    alignItems='center'
                    sx={{ height: '100%', overflow: 'hidden' }}
                >
                    <Grid item>
                        <Grid sx={{ mt: 2 }}>
                            <img src={imgLogo} alt='register_logo' className='register-logo' />
                        </Grid>
                        <Typography variant='h5' style={{ fontWeight: 'bolder' }}>
                            {/* Choosing the header depend on condition */}
                            {userExists ? 'Sign In' : 'Sign Up'}
                        </Typography>
                        <Grid item sx={{ mt: 4 }}>
                            {/* Rendering one form and choosing handler on submit depend on condition */}
                            <form onSubmit={userExists ? handleLoginSubmit : handleSignUpSubmit}>
                                <TextField
                                    label='Email'
                                    type='email'
                                    value={userExists ? email : signUpEmail}
                                    onChange={(e) => userExists ? setEmail(e.target.value) : setSignUpEmail(e.target.value)}
                                    required
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label='Password'
                                    type='password'
                                    value={userExists ? password : signUpPassword}
                                    onChange={(e) => userExists ? setPassword(e.target.value) : setSignUpPassword(e.target.value)}
                                    required
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                                {(userExists ? error : signUpError) && (
                                    <Typography color='error' sx={{ mb: 2 }}>
                                        {userExists ? error : signUpError}
                                    </Typography>
                                )}
                                <Button type='submit' variant='contained' color='primary' fullWidth>
                                    {userExists ? 'Sign In' : 'Sign Up'}
                                </Button>
                            </form>
                        </Grid>
                        {/* Here it should be another condition for google aut is disabled or not */}
                        {userExists && (
                            <Grid item sx={{ mt: 4 }}>
                                <GoogleButton variant='outlined' onClick={() => login()} sx={{ fontSize: '12px', fontWeight: 500 }}>
                                    Sign in with Google
                                    <img src={imgGoogle} alt='google' style={{ width: '17px', marginLeft: '5px' }} />
                                </GoogleButton>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Stack>
        </div>
    );
}