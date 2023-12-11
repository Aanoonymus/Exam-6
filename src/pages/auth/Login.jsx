import React, { useState } from "react";
import "./Signin.scss";
import { Container } from "../../utils";
import Logo from "../../assets/Logo.png";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../../api";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginUser = (e) => {
    e.preventDefault();

    setLoading(true);
    instance
      .post("/api/auth/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          toast.success("Logged in succesfully!");
          localStorage.setItem("token", response.data.token);
          navigate("/");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        toast.error(error.response.data.message[0]);
      });
  };

  return (
    <Container>
      <div className="signin">
        <form className="signin-form" onSubmit={handleLoginUser}>
          <img className="signin-logo" src={Logo} alt="" />
          <h2 className="signin-title">Login</h2>
          <input
            required
            className="signin-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="signin-password">
            <input
              required
              className="signin-input signin-input-password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {showPassword ? (
              <FiEyeOff onClick={() => setShowPassword(false)} />
            ) : (
              <FiEye onClick={() => setShowPassword(true)} />
            )}
          </div>
          <p className="login-link">
            Don’t you have an account?{" "}
            <Link className="signin-login" to="/signin">
              Sign Up
            </Link>
          </p>
          <button disabled={loading} className="signin-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
