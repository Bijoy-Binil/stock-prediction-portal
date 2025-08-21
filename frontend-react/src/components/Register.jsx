import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleregistration = async (e) => {
    e.preventDefault();
    setLoading(true)
    const userData = { username, email, password };
    

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/register/",
        userData
      );
      console.log("Response==>", response.data);
      console.log("Registration successfull");
      setErrors({})
      setSuccess(true)

    } catch (error) {
      console.log("error1==>", error.response.data);
        setErrors(error.response.data)
        console.log("error2==>",errors)
        
    }finally{
        setLoading(false)
    }
  };
  return (
    <>
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-md-6 bg-light-dark p-5 rounded">
            <h3 className="text-light text-center mb-5">Create an Account</h3>
            <form action="" onSubmit={handleregistration}>
              <input
                type="text"
                className="form-control mt-2 mb-2"
                placeholder="UserName"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <small>{errors.username && <div className="text-danger">{errors.username}</div>}</small>
              <input
                type="email"
                className="form-control mt-2 mb-2"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                className="form-control mt-2 mb-2"
                placeholder="Set Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              /> 
              <small>{errors.password && <div className="text-danger">{errors.password}</div>}</small>
                {success && <div className="alert alert-success">Registration successfull</div> }
                {loading ? (   <button type="submit" className="btn btn-info d-block mx-auto disabled">
                 <FontAwesomeIcon icon={faSpinner} spin />  Please wait.....
              </button>):(   <button type="submit" className="btn btn-info d-block mx-auto">
                Register
              </button>)}
              
            </form>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
