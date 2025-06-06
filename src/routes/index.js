import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login";
import AppLayout from "../pages/appLayout";
import HomePage from "../pages/home";
import FolderPage from "../pages/folder";
import SearchPage from "../pages/search";
import PrivateRoute from "../components/privateRoute";

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route
      path="/app"
      element={
        <PrivateRoute>
          <AppLayout />
        </PrivateRoute>
      }
    >
      <Route index element={<Navigate to="home" replace />} />
      <Route path="home" element={<HomePage />} />
      <Route path=":folderId" element={<FolderPage />} />
      <Route path="search" element={<SearchPage />} />
    </Route>
    <Route path="/" element={<Navigate to="/login" />} />
  </Routes>
);

export default AppRoutes;
