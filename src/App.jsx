import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";
import Editor from "./pages/editor.pages";
import HomePage from "./pages/home.page";
import SearchPage from "./pages/search.page";
import PageNotFound from "./pages/404.page";
import ProfilePage from "./pages/profile.page";
import BlogPage from "./pages/blog.page";
import SideNav from "./components/sidenavbar.component";
import ChangePassword from "./pages/change-password.page";
import EditProfile from "./pages/edit-profile.page";
import Notifications from "./pages/notifications.page";
import ManageBlogs from "./pages/manage-blogs.page";
import Footer from "./pages/footer.page";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';
import ChatAI from "./components/chatgpt.component";
import OnlyAdminPrivateRoute from "./components/admin.component";
import MembersPage from "./components/dashuser.component";
import 'katex/dist/katex.min.css';
import OurProjek from "./pages/ourprojek.page";
import TodoList from "./pages/todolist.pages";
import AboutUsPage from "./pages/aboutus.page";
import SideNav2 from "./components/sidenavbar2.component";
import DeleteUserPage from "./components/deleteuser.component";
import ProfilePage3 from "./pages/profile2.page";
import ProfilePage4 from "./pages/profile3.page";
import ForumFrontPage from "./pages/homeforum.page";
import ForumPage from "./pages/homeforum.page";
import BookmarkPage from "./pages/bookmark.page";



export const UserContext = createContext({})

export const ThemeContext = createContext({});

const darkThemePreference = () => window.matchMedia("(prefers-color-scheme: dark)").matches;



const App = () => {

    const [userAuth, setUserAuth] = useState({});

    const [ theme, setTheme ] = useState(() => darkThemePreference() ? "dark" : "light" );

    useEffect(() => {

        let userInSession = lookInSession("user");
        let themeInSession = lookInSession("theme");

        userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null })
        
        if (themeInSession) {
            setTheme(() => {

                document.body.setAttribute('data-theme', themeInSession);

                return themeInSession;
            
            })
        } else {
            document.body.setAttribute('data-theme', theme)
        }

    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };


    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <UserContext.Provider value={{userAuth, setUserAuth}}>
                <Routes>
                    <Route path="/editor" element={<Editor />} />
                    <Route path="/editor/:blog_id" element={<Editor />} />
                    <Route path="/" element={<Navbar />}>
                        <Route index element={<HomePage />} />
                        <Route path="dashboard" element={<SideNav />} > 
                            <Route path="blogs" element={<ManageBlogs />} />
                            <Route path="notifications" element={<Notifications />} />
                            <Route path="members" element={<MembersPage />} />
                            <Route path="to-do" element={<TodoList />} />
                            <Route path="tanya-psd" element={<ChatAI />} />
                            <Route path="bookmark" element={<BookmarkPage />} />
                        </Route>
                        <Route path="settings" element={<SideNav2 />} >  
                            <Route path="edit-profile" element={<EditProfile />} />
                            <Route path="change-password" element={<ChangePassword />} />
                            <Route path="delete-user" element={<DeleteUserPage />} />
                        </Route>
                        <Route path="signin" element={<UserAuthForm type="sign-in" />} /> 
                        <Route path="signup" element={<UserAuthForm type="sign-up" />} />
                        <Route path="search/:query" element={<SearchPage />} />
                        <Route path="user/:id" element={<ProfilePage />} />
                        <Route path="blog/:blog_id" element={<BlogPage />}/>
                        <Route path="*" element={<PageNotFound />} />
                        <Route path="projek-kami" element={<OurProjek />} />
                        <Route path="tentang-kami" element={<AboutUsPage />} />
                        <Route path="forum" element={<ForumPage />} />

                        
                        
                        
                    </Route>
                </Routes>
            </UserContext.Provider>
        <Footer />
        </ThemeContext.Provider>
    );

}

export default App;