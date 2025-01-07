import React from 'react'
import { Navigate } from 'react-router-dom'
import Login from './login'
import DoubleNavbar from './surveymain'
import SurveyEditor from './SurveyEditor'
import SurveyAnswer from './SurveyAnswer'
const routes = [
    {
        path: '/',
        element: <Navigate to="/main" />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/surveymain',
        element: <DoubleNavbar />,
    },
    {
        path: '/SurveyEditor/:id',
        element: <SurveyEditor />,
    },
    {
        path: '/SurveyAnswer/:id',
        element: <SurveyAnswer />,
    },
    // {
    //     path: '*',
    //     element: <Navigate to="/login" />,
    // },
]

export default routes