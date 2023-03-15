import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";



  let signup = document.querySelector(".signup");
  let loginSlide = document.querySelector(".login");
  let slider = document.querySelector(".slider");
  let formSection = document.querySelector(".form-section");

 if (signup) {
   signup.addEventListener("click", () => {
     slider.classList.add("moveslider");
     formSection.classList.add("form-section-move");
   });
 }
if (loginSlide) {
  loginSlide.addEventListener("click", () => {
    slider.classList.remove("moveslider");
    formSection.classList.remove("form-section-move");
  });
}
const LoginAndRegister = () => {
  const [section, setSection] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUserame] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");

  const navigate = useNavigate();
  const tok = localStorage.getItem("token");
  useEffect(() => {
    if (tok) {
      navigate("/home");
    }
  }, [navigate, tok]);
  const register = async (e) => {
    e.preventDefault();
    try {
      if (!username || !password || !confirmPassword || !email) {
        setRegisterStatus("Please fill all fields");
        return false;
      }

      if (password !== confirmPassword) {
        setRegisterStatus("Passwords do not match");
        return false;
      }
      if (password.length < 6) {
        setRegisterStatus("Password must be at least 6 characters");
        return false;
      }
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(email)) {
        setRegisterStatus("Please enter a valid email address");
        return false;
      }

      const response = await axios.post("http://localhost:3001/register", {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });
      setRegisterStatus(response.data.message);
    } catch (error) {
      setRegisterStatus(error.response.data.message);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email: email,
        password: password,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);

        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data.message);
      }
    } catch (error) {

      setLoginStatus(error.response.data.message);
    }
  };


  return (
    <div className="outer-div">
      <div>
        <h1>
          Website Monitoring<br/> and performance <br/> testing solutions
        </h1>
      </div>
      <div>
        <header>
          <h1 class='heading'>Login & Signup</h1>
        </header>
        <div class='container'>
          <div class='slider'></div>
          <div class='btn'>
            <button
              class='login'
              onClick={() => {
                setSection(true);
              }}
            >
              Login
            </button>

            <button
              class='signup'
              onClick={() => {
                setSection(false);
              }}
            >
              Signup
            </button>
          </div>
          <div class='form-section'>
           {section? (<>
              <div class='login-box'>
                <input
                  type='email'
                  class='email ele'
                  placeholder='Enter your Email'
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type='password'
                  class='password ele'
                  placeholder='Enter your Password'
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button class='clkbtn' onClick={login}>
                  Login
                </button>
                <div>
                  <LoginSocialFacebook
                    appId='603780851777579'
                    onResolve={(response) => {
                      localStorage.setItem("token", response.data.token);

                      setLoginStatus(response.data.message);
                    }}
                    onReject={(error) => {
                      setLoginStatus(error.response.data.message);
                    }}
                  >
                    <FacebookLoginButton />
                  </LoginSocialFacebook>

                  <LoginSocialGoogle
                    client_id={
                      "80272596296-pandoa9m2huov8rg67qtbad0k89jn2vp.apps.googleusercontent.com"
                    }
                    scope='openid profile email'
                    discoveryDocs='claims_supported'
                    access_type='offline'
                    onResolve={({ provider, data }) => {
                      console.log(provider, data);
                      localStorage.setItem("token", data.access_token);
                      setLoginStatus(data.message);
                    }}
                    onReject={(error) => {
                      console.log(error);
                    }}
                  >
                    <GoogleLoginButton />
                  </LoginSocialGoogle>
                </div>
                <h1
                  style={{
                    color: "red",
                    fontSize: "15px",
                    textAlign: "center",
                  }}
                >
                  {loginStatus}
                </h1>
              </div>
            </>)
:
            (<>
              <div class='signup-box'>
                <input
                  type='text'
                  class='name ele'
                  placeholder='Enter your name'
                  onChange={(e) => setUserame(e.target.value)}
                  minLength='4'
                  maxLength='20'
                  required
                />
                <input
                  type='email'
                  class='email ele'
                  placeholder='Enter your Email'
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type='password'
                  class='password ele'
                  placeholder='Enter your Password'
                  onChange={(e) => setPassword(e.target.value)}
                  minLength='6'
                  required
                />
                <input
                  type='password'
                  class='password ele'
                  placeholder='Confirm password'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength='6'
                  required
                />
                <button class='clkbtn' onClick={register}>
                  Signup
                </button>
                <h1
                  style={{
                    color: "red",
                    fontSize: "15px",
                    textAlign: "center",
                  }}
                >
                  {registerStatus}
                </h1>
              </div>
            </>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAndRegister;
