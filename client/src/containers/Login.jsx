import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { LoginInput } from '../components';
import { LoginBg, Logo } from '../assets';
import { FaEnvelope, FaLock, FcGoogle } from '../assets/icons';
import { buttonClick } from '../animations';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../config/firebase.config';
import { validateUserIdToken } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../context/actions/userActions';

const Login = () => {
  const [ userEmail, setUserEmail ] = useState("");
  const [ isSignUp, setIsSignUp ] = useState(false);
  const [ password, setPassword ] = useState("");
  const [ confirm_password, setConfirm_password ] = useState("");

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);

  useEffect(() => {
    if(user){
      navigate("/", { replace: true})
    }
  }, [user])

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then(userCred => {
      firebaseAuth.onAuthStateChanged(cred => {
        if(cred){
          cred.getIdToken().then(token => {
           validateUserIdToken(token).then((data) => {
            dispatch(setUserDetails(data));
           });
           navigate("/", { replace: true })
          })
        }
      })
    })
  };

  const signUpWithEmailPass = async () => {
    if (userEmail === "" || password === "" || confirm_password === ""){
      
    }else {
      if (password === confirm_password){
        setUserEmail("");
        setConfirm_password("");
        setPassword("");
        await createUserWithEmailAndPassword(firebaseAuth, userEmail, password).then(usercred => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserIdToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });

                navigate("/", { replace: true })
              })
            }
          })
        })
      }else{
       // alert message
      }
    }
  };


  const signInWithEmailPass = async () => {
    if(userEmail !==  "" && password !== ""){
      await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then(userCred => {
        firebaseAuth.onAuthStateChanged((cred) => {
          if (cred) {
            cred.getIdToken().then((token) => {
              validateUserIdToken(token).then((data) => {
                dispatch(setUserDetails(data));
              });
              navigate("/", { replace: true });
            })
          }
        })
      })
    }else {
      // alert message
    }
  };



  return (
    <div className='w-screen h-screen relative overflow-hidden flex'>
        {/* background color */}
        <img 
        src={LoginBg} className='w-[50vw] h-full object-cover absolute top-0 left-0' 
        alt='' 
        />

         {/* Top logo sections */}
            <div className='flex items-center justify-start gap-4 w-23 absolute left-4 top-4'>
              <img src={Logo} className='w-8' alt='logo' />
              <p className='text-headingColor font-semibold text-2xl'>Mastayyy</p>
            </div>

        {/* content box */}
        <motion.div className={`flex flex-col items-center w-[65%] md:w-508 ${isSignUp ? "h-[80%]" : "h-[70%]"} absolute ${isSignUp? "top-[4.5rem]" : "top-[6.5rem]"} right-[6.5rem] px-2 py-8 gap-3 border-2 rounded-2xl shadow-xl`}>

            {/* Welcome text */}
            <p className='text-3xl font-semibold text-headingColor'> Welcome </p>
            <p className='text-xl text-textColor -mt-3'>{isSignUp ? "Sign Up": "Sign In"} </p>

            {/* input section */}
            <div className='w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4'>
              <LoginInput 
              placeholder={"Email Here"} 
              icon={<FaEnvelope className='text-xl text-black' />} 
              inputState={userEmail}
              inputStateFunc={setUserEmail} 
              type="email" 
              isSignUp={isSignUp} 
              />

              <LoginInput 
              placeholder={"Password Here"} 
              icon={<FaLock className='text-xl text-black' />} 
              inputState={password}
              inputStateFunc={setPassword} 
              type="password" 
              isSignUp={isSignUp} 
              />

            { isSignUp && (  <LoginInput 
              placeholder={"Confirm Password Here"} 
              icon={<FaLock className='text-xl text-black' />} 
              inputState={confirm_password}
              inputStateFunc={setConfirm_password} 
              type="password" 
              isSignUp={isSignUp} 
            />)}

            {!isSignUp ? (
            <p>
              Doesn't have an account? {" "}
              <motion.button 
              {...buttonClick} 
              className='text-blue-400 cursor-pointer bg-transparent'
              onClick={() => setIsSignUp(true)}
              >
                Create One
              </motion.button> 
            </p> 
            ): (
            <p>
              Already have an account? {" "}
              <motion.button 
              {...buttonClick} 
              className='text-blue-400 cursor-pointer bg-transparent'
              onClick={() => setIsSignUp(false)}
              >
                Sign-in here
              </motion.button> 
            </p>
            )}

            {/* Button section */}
            { isSignUp ? (
              <motion.button {...buttonClick} 
              className='w-full px-4 py-2 rounded-md bg-blue-400 cursor-pointer text-white text-xl capitalize hover:bg-blue-500 transition-all duration-150'
              onClick={signUpWithEmailPass}
              >
                Sign Up
              </motion.button>
            ): (
            <motion.button {...buttonClick} 
            className='w-full px-4 py-2 rounded-md bg-blue-400 cursor-pointer text-white text-xl capitalize hover:bg-blue-500 transition-all duration-150'
            onClick={signInWithEmailPass}
            >
              Sign In
            </motion.button>
            )}
            </div>

            <div className='flex items-center justify-between gap-16'>
              <div className='w-24 h-[1px] rounded-md bg-black'></div>
              <p className='text-black'>or</p>
              <div className='w-24 h-[1px] rounded-md bg-black'></div>
            </div>

            <motion.div 
            {...buttonClick}
            className='flex items-center justify-center px-20 py-2 cursor-pointer rounded-3xl gap-4 border-2'
            onClick={loginWithGoogle}
            >
              <FcGoogle className='text-3xl'/>
              <p className='capitalize text-base text-headingColor'>
                Sign in with Google 
              </p>
            </motion.div>
        </motion.div>
    </div>
  )
}

export default Login;