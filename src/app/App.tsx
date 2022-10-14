import React, {useEffect} from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializeAppTC, InitialStateType, RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Login} from "../features/Login/Login";
import {CircularProgress} from "@mui/material";
import {logoutTC} from "../features/Login/authReducer";


type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const dispatch = useDispatch()
    const {status,isInitialized} = useSelector<AppRootStateType, InitialStateType>((state) => state.app)
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
    const LogOutHandler  = () => {
        dispatch(logoutTC())
    }
    useEffect( () => {
    dispatch(initializeAppTC())
    }, [])
    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={LogOutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<TodolistsList/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="*" element={<h1> 404: Element not found</h1>} />

                    </Routes>
                </BrowserRouter>
            </Container>
        </div>
    );
}

export default App
