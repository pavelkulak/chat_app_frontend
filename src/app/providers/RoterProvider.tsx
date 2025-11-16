import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RegisterPage, LoginPage, ChatPage, InvitePage } from "@/pages";
import { AppLayout } from "@/app/layout";
import { useUserStore } from "@/entities/user";

const RouterProvider = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={isAuthenticated ? "/chat" : "/login"} />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/chat"
            element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />}
          />
          <Route path="/invite/:token" element={<InvitePage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default RouterProvider;
