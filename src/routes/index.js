import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login";
import AppLayout from "../pages/appLayout";
import HomePage from "../pages/home";
import FolderPage from "../pages/folder";

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/app" element={<AppLayout />}>
      <Route index element={<Navigate to="home" replace />} />
      <Route path="home" element={<HomePage />} />
      <Route path="home/:folderId" element={<FolderPage />} />
      {/* <Route path="search" element={<SearchPage />} /> */}
    </Route>
    <Route path="/" element={<Navigate to="/login" />} />
  </Routes>
);

export default AppRoutes;
