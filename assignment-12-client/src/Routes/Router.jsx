import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layouts/Main';
import Home from '../pages/Home/Home';
import Instructors from '../pages/Instructors/Instructors';
import Classes from '../pages/Classes/Classes';
import DashboardLayout from '../Layouts/DashboardLayout';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import PrivateRoute from './PrivateRoute';
import ManageClasses from '../pages/Dashboard/Admin/ManageClasses/ManageClasses';
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers/ManageUsers';
import MyClasses from '../pages/Dashboard/Instructor/MyClasses/MyClasses';
import AddClass from '../pages/Dashboard/Instructor/AddClass/AddClass';
import SelectedClasses from '../pages/Dashboard/Student/SelectedClasses/SelectedClasses';
import EnrolledClasses from '../pages/Dashboard/Student/EnrolledClasses/EnrolledClasses';
import AdminRoute from './AdminRoute';
import InstructorRoute from './InstructorRoute';
import StudentRoute from './StudentRoute';
import UpdateClass from '../pages/Dashboard/Instructor/UpdateClass/UpdateClass';
import Payment from '../pages/Dashboard/Student/Payment/Payment';
import PaymentHistory from '../pages/Dashboard/Student/PaymentHistory/PaymentHistory';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/instructors',
                element: <Instructors></Instructors>
            },
            {
                path: '/classes',
                element: <Classes></Classes>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: 'admin/manageClasses',
                element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
            },
            {
                path: 'admin/manageUsers',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: 'instructor/myClasses',
                element: <InstructorRoute><MyClasses></MyClasses></InstructorRoute>
            },
            {
                path: 'instructor/addClass',
                element: <InstructorRoute><AddClass></AddClass></InstructorRoute>
            },
            {
                path: 'instructor/updateClass/:id',
                element: <InstructorRoute><UpdateClass></UpdateClass></InstructorRoute>
            },
            {
                path: 'student/enrolledClasses',
                element: <StudentRoute><EnrolledClasses></EnrolledClasses></StudentRoute>
            },
            {
                path: 'student/selectedClasses',
                element: <StudentRoute><SelectedClasses></SelectedClasses></StudentRoute>
            },
            {
                path: 'student/payment/:id',
                element: <StudentRoute><Payment></Payment></StudentRoute>
            },
            {
                path: 'student/paymentsHistory',
                element: <StudentRoute><PaymentHistory></PaymentHistory></StudentRoute>
            }
        ]
    },
    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    }
])

export default Router;