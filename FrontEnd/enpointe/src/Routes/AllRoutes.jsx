import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Homepage } from '../Components/Homepage';
import { Login } from '../Components/Login';
import { UserTransations } from '../Components/UserTransations';

export const AllRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/homepage' element={<Homepage />}> </Route>
                <Route path='/' element={<Login />}></Route>
                <Route path='homepage/:user_id' element={<UserTransations />}></Route>
            </Routes>
        </div>
    )
}
