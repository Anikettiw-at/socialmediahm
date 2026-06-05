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
          {/* Main Frame Shell Structure */}
          <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased">
            
            {/* Dynamic Content Core Grid Body Layout */}
            <div className="flex-1 w-full max-w-7xl mx-auto pb-20 md:pb-6 transition-all">
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
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>

            {/* Global Fixed Navigation Bar Frame Layer */}
            {isAuth && (
              <div className="fixed bottom-0 left-0 w-full md:sticky md:top-0 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.02)] border-t md:border-b md:border-t-0 border-slate-100">
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