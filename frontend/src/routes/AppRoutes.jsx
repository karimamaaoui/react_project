import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from '../pages/Authentication/Signin';
import Signup from '../pages/Authentication/Signup';
import DefaultLayout from '../layout/DefaultLayout';
import Profile from '../pages/dashboard/profile';
import Dashboard from '../pages/dashbordAdmin/dashboard';
import Tables from '../pages/dashbordAdmin/Tables';
import PostForm from '../pages/dashbordAdmin/postForm';
import Posts from '../pages/dashbordAdmin/posts';
import ProfileView from '../pages/dashboard/profileView';
import ProfileEdit from '../pages/dashboard/ProfileEdit';
import PublicRoute from './PublicRoute';
import RequireAuth from './RequireAuth'; 
function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Signin />
            </PublicRoute>
          }
        />{' '}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Signup />{' '}
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Signin />
            </PublicRoute>
          }
        />
        <Route
          path="/h"
          element={
            <DefaultLayout>
              <Dashboard />
            </DefaultLayout>
          }
        />
        <Route
          path="/post"
          element={
            <RequireAuth>
            <DefaultLayout>
              <Posts />
            </DefaultLayout>
          </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>

            <DefaultLayout>
              <ProfileView />
            </DefaultLayout>
            </RequireAuth>

          }
        />
        <Route
          path="/profile/edit"
          element={
            <RequireAuth>

            <DefaultLayout>
              <ProfileEdit />
            </DefaultLayout>
            </RequireAuth>

          }
        />
        <Route
          path="/tables"
          element={
            <RequireAuth>

            <DefaultLayout>
         
              <Tables />
            </DefaultLayout>
            </RequireAuth>

          }
        />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
