import React, { useContext, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {isLoggedIn,setIsLoggedIn}=useContext(AuthContext)
  const navigate=useNavigate()


  
  console.log("isLoggedIn==> ",isLoggedIn)


  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    const userData = { username, password };
    console.log("userData==>", userData);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/token/",
        userData
      );
      localStorage.setItem("accessToken",response.data.access)
      localStorage.setItem("refreshToken",response.data.refresh)
      console.log("Log in successfull");
      setIsLoggedIn(true)
      navigate("/")
    } catch (error) {
      setError("Invalid Credentials")
      
    } finally {
      setLoading(false);
    }
  };

return (
  <>
    <div className="container ">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-light-dark p-5 rounded">
          <h3 className="text-light text-center mb-5">Login to our Portal</h3>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              className="form-control mt-2 mb-2"
              placeholder="UserName"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />

            <input
              type="password"
              className="form-control mt-2 mb-2"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
                  {error && <div className="text-danger">{error}</div> }
            {loading ? (
              <button
                type="submit"
                className="btn btn-info d-block mx-auto disabled"
              >
                <FontAwesomeIcon icon={faSpinner} spin /> Logging In
              </button>
            ) : (
              <button type="submit" className="btn btn-info d-block mt-2 mx-auto">
                Login
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  </>
);
} 
export default Login;
