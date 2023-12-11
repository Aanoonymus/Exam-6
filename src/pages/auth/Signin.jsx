import React, { useState } from "react";
import "./Login.scss";
import Logo from "../../assets/Logo.png";
import { Container } from "../../utils";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { instance } from "../../api/index";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const Signin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async (e) => {
    e.preventDefault();

    setLoading(true);

    instance
      .post("/api/auth/signup", {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      })
      .then((response) => {
        setLoading(false);
        if (response.status === 201) {
          toast.success("User created successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate("/login");
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.errors[0].msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(error);
      });
  };

  return (
    <Container>
      <div className="signin">
        <form className="signin-form" onSubmit={handleCreateUser}>
          <img className="signin-logo" src={Logo} alt="" />
          <h2 className="signin-title">Sign Up</h2>
          <input
            className="signin-input"
            required
            type="text"
            placeholder="Firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            className="signin-input"
            required
            type="text"
            placeholder="Lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <input
            className="signin-input"
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="signin-password">
            <input
              className="signin-input signin-input-password"
              required
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
          <p className="signin-link">
            Don’t you have an account?{" "}
            <Link className="signin-login" to="/login">
              Login
            </Link>
          </p>
          <button disabled={loading} className="signin-btn" type="submit">
            {loading ? "Creating..." : " Sign Up"}
          </button>
        </form>
      </div>
    </Container>
  );
};

export default Signin;
