import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserData } from "./context/UserContext";
import Account from "./pages/Account";
import NavigationBar from "./components/NavigationBar";
import NotFound from "./components/NotFound";
import Reels from "./pages/Reels";
import { Loading } from "./components/Loading";
import UserAccount from "./pages/UserAccount";
import Search from "./pages/Search";
import ChatPage from "./pages/ChatPage";

const App = () => {
  const { loading, isAuth, user } = UserData();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          {/* Main Layout Wrapper: NavigationBar ko global fixed screen layer dene ke liye */}
          <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between">
            
            {/* Top/Side spacing adjustments for main application grid */}
            <div className="flex-1 w-full">
              <Routes>
                <Route path="/" element={isAuth ? <Home /> : <Login />} />
                <Route path="/reels" element={isAuth ? <Reels /> : <Login />} />
                <Route
                  path="/account"
                  element={isAuth ? <Account user={user} /> : <Login />}
                />
                <Route
                  path="/user/:id"
                  element={isAuth ? <UserAccount user={user} /> : <Login />}
                />
                <Route path="/login" element={!isAuth ? <Login /> : <Home />} />
                <Route
                  path="/register"
                  element={!isAuth ? <Register /> : <Home />}
                />
                <Route path="/search" element={isAuth ? <Search /> : <Login />} />
                <Route
                  path="/chat"
                  element={isAuth ? <ChatPage user={user} /> : <Login />}
                />
                {/* Fallback Catch-all Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>

            {/* Render navigation bar gracefully if user is authenticated */}
            {isAuth && (
              <div className="w-full z-50">
                <NavigationBar />
              </div>
            )}
          </div>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;