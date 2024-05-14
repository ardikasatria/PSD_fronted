import React, { useContext, useRef } from "react";
import AnimationWrapper from "../common/page-animation";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import { Link, Navigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { storeInSession } from "../common/session";
import { UserContext } from "../App";
import { authWithGoogle } from "../common/firebase";
import logoo from "../imgs/logo-dark.png";

const UserAuthForm = ({ type }) => {
    let { userAuth: { access_token }, setUserAuth } = useContext(UserContext);
    const formRef = useRef(null);

    const userAuthThroughServer = (serverRoute, formData) => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
            .then(({ data }) => {
                storeInSession("user", JSON.stringify(data));
                setUserAuth(data);
            })
            .catch(({ response }) => {
                toast.error(response.data.error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let serverRoute = type === "sign-in" ? "/signin" : "/signup";

        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        let formData = new FormData(formRef.current);

        let { fullname, email, password } = Object.fromEntries(formData);

        if (fullname && fullname.length < 3) {
            return toast.error("Fullname must be at least 3 letters long");
        }
        if (!email.length) {
            return toast.error("Enter Email");
        }
        if (!emailRegex.test(email)) {
            return toast.error("Email is invalid");
        }
        if (!passwordRegex.test(password)) {
            return toast.error("Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters");
        }

        userAuthThroughServer(serverRoute, Object.fromEntries(formData));
    };

    const handleGoogleAuth = (e) => {
        e.preventDefault();

        authWithGoogle().then(user => {
            let serverRoute = "/google-auth";

            let formData = {
                access_token: user.accessToken
            };

            userAuthThroughServer(serverRoute, formData);
        }).catch(err => {
            toast.error('Trouble logging in through Google.');
            console.error(err);
        });
    };

    return (
        access_token ?
            <Navigate to="/" />
            :
            <AnimationWrapper keyValue={type}>
                <section className="h-cover flex flex-col md:flex-row items-center justify-center">
                    <Toaster />
                    <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-4 md:px-0">
                        <img src={logoo} className="w-32 h-32 md:w-48 md:h-48 object-cover" alt="Logo" />
                        <h1 className="text-2xl font-Monaco capitalize mb-6 mt-2">
                            {type === "sign-in" ? "Wujudkan Proyek Data Masa Depan" : "Gabung di Projek Sains Data"}
                        </h1>
                        <p className="text-xl text-center mb-6 mt-2">
                            {type === "sign-in" ? 
                                "Bergabung bersama kami untuk membuat lebih banyak inovasi yang berkelanjutan." : 
                                "Mulai perjalanan proyek sains data mu di mana pun."}
                        </p>
                    </div>
                    <form ref={formRef} className="w-[80%] max-w-[400px] md:w-1/2 px-4 md:px-0" onSubmit={handleSubmit}>
                        {type !== "sign-in" &&
                            <InputBox
                                name="fullname"
                                type="text"
                                placeholder="Full Name"
                                icon="fi-rr-user"
                            />
                        }
    
                        <InputBox
                            name="email"
                            type="email"
                            placeholder="Email"
                            icon="fi-rr-envelope"
                        />
    
                        <InputBox
                            name="password"
                            type="password"
                            placeholder="Password"
                            icon="fi-rr-key"
                        />
    
                        <button className="btn-dark center mt-14" type="submit">
                            {type.replace("-", " ")}
                        </button>
    
                        <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
                            <hr className="w-1/2 border-black" />
                            <p>or</p>
                            <hr className="w-1/2 border-black" />
                        </div>
    
                        <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center"
                            onClick={handleGoogleAuth}
                        >
                            <img src={googleIcon} className="w-5" alt="Google Icon" />
                            Lanjutkan dengan Google
                        </button>
    
                        {type === "sign-in" ?
                            <p className="mt-6 text-dark-grey text-xl text-center">
                                Belum memiliki Akun?
                                <Link to="/signup" className="underline text-black text-xl ml-1">
                                    Gabung disini
                                </Link>
                            </p>
                            :
                            <p className="mt-6 text-dark-grey text-xl text-center">
                                Sudah memiliki Akun?
                                <Link to="/signin" className="underline text-black text-xl ml-1">
                                    Masuk disini.
                                </Link>
                            </p>
                        }
                    </form>
                </section>
            </AnimationWrapper>
    );    
};

export default UserAuthForm;