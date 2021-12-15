import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import BlockedRoute from './Auth/BlockedRoute';
import PrivateRoute from './Auth/PrivateRoute';
import AddCourse from './Components/AddCourse';
import AddUser from './Components/AddUser';
import AdminDashboard from './Components/AdminDashboard';
import DeleteProfile from './Components/DeleteAccount';
import EditAccount from './Components/EditAccount';
import EditCourse from './Components/EditCourse';
import EditPassword from './Components/EditPassword';
import Header from './Components/Header';
import MentorDashboard from './Components/MentorDashboard';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import StudentDashboard from './Components/StudentDashboard';
import SearchCourses from "./Components/SearchCourses"
import AuthorizationRoute from './Auth/AuthorizationRoute';
import AdminRoutes from './Auth/AdminRoutes';
import AdminAndMentorRoutes from './Auth/AdminAndMentorRoutes';
import StudentRoutes from './Auth/StudentRoutes';
import MentorRoutes from './Auth/MentorRoutes';


const MainRouter = () => {

    return (
        <div className="mainRouterWrapper">
            <Header />
            <Routes>
                <Route path="/" element={<BlockedRoute />}>
                    <Route path="" element={<Navigate replace to="/signIn" />} />
                    <Route path="signIn" element={<SignIn />} />
                    <Route path="signUp" element={<SignUp />} />
                </Route>
                <Route path="/" element={<PrivateRoute />}>
                    <Route path="" element={<AdminRoutes />}>
                        <Route exact path="dashboard/users" element={<AdminDashboard />} />
                        <Route exact path="dashboard/courses" element={<AdminDashboard />} />
                        <Route exact path="user/:userId" element={<EditAccount />} />
                        <Route exact path="addUser" element={<AddUser />} />
                    </Route>
                    <Route path="" element={<AdminAndMentorRoutes />}>
                        <Route exact path="course/:courseId" element={<EditCourse />} />
                        <Route exact path="addCourse" element={<AddCourse />} />
                    </Route>
                    <Route path="" element={<AuthorizationRoute />}>
                        <Route exact path="editProfile/info/:userId" element={<EditAccount />} />
                        <Route exact path="editProfile/password/:userId" element={<EditPassword />} />
                        <Route exact path="editProfile/delete/:userId" element={<DeleteProfile />} />
                    </Route>
                    <Route path="" element={<StudentRoutes />}>
                        <Route exact path="studentDashboard" element={<StudentDashboard />} />
                    </Route>
                    <Route path="" element={<MentorRoutes />}>
                        <Route exact path="mentorDashboard" element={<MentorDashboard />} />
                    </Route>

                    <Route exact path="search" element={<SearchCourses />} />
                </Route>
            </Routes>
        </div>

    );
};

export default MainRouter;