import React,{useEffect,useState} from "react";
import { Form, Input, message , Button} from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";


const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Invalid user or Password");
    }
  };

  // prevent for login user  
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (

    <div className="login-page">
      
      <div className='log-div'>
          <h1>SpendSensibly</h1>
          <span>
            One place to track all your business records
          </span>
      </div>
      <div className="log-div1">
        
          <h1 >LOGIN TO YOUR ACCOUNT</h1>
          
          <Form layout="vertical" onFinish={submitHandler}>
            <Form.Item  label="Email" name="email" >
              <Input />
            </Form.Item>

            <Form.Item label="Password" name="password" >
              <Input type="password" />
            </Form.Item>

            <Button type="primary" htmlType="submit" block >
            {loading && (<Spinner />)}
              <span>Login</span>
            </Button>
              <span>
                Don't have an account? <Link to="/register">Register</Link>
              </span>
          </Form>
        
      </div>
    </div>

  )
}

export default Login