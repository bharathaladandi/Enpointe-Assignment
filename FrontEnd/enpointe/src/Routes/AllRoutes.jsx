import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Homepage } from '../Components/Homepage';
import { Login } from '../Components/Login';
import { UserTransations } from '../Components/UserTransations';
import { Signup } from '../Components/Signup';

export const AllRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/homepage' element={<Homepage />}> </Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/' element={<Signup />}></Route>
                <Route path='homepage/:user_id' element={<UserTransations />}></Route>
            </Routes>
        </div>
    )
}
