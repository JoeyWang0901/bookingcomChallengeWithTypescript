import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import "./register.scss"
import axios from 'axios'
const Register = () => {
    const navigate = useNavigate()
    const [error, setError] = useState("");
    const [registerData, setRegisterData] = useState({
        userName: undefined,
        email: undefined,
        password: undefined
    })
    const [checkPassword, setPassword] = useState({
        checkpassword: undefined,
    })
    useEffect(() => {
        if (checkPassword.checkpassword !== registerData.password){
            setError("密碼輸入不一樣")
        }else{
            setError("")
        }
    }, [checkPassword, registerData])

    const handleCheckPassword=(e)=>{
        setPassword(prev=>({...prev,[e.target.id]: e.target.value}))
      }

    const handleChange = (e) => {
        setRegisterData(prev => ({...prev, [e.target.id]: e.target.value}))
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post("/auth/register", registerData)
            navigate("/login", res)
        }catch(error) {
            console.log(error.response)
            setError(error.response.data.Message)
        }
    }
    console.log(error)

  return (
    <div className='register'>
      <Navbar type="auth" />
      <div className="container">
        <div className="wrapper">
          <h2 className="title">
            註冊帳戶
          </h2>
          <div className="form">
            <input type="text" id="username" placeholder='新帳號' onChange={ handleChange } style={error==="錯誤，此帳號或信箱已被註冊" ? {border:"2px solid red"}:{border:"1px solid grey"}} />
            <input type="text" id="email" placeholder='帳號信箱' onChange={ handleChange } style={error === "錯誤，此帳號或信箱已被註冊" ? {border: "2px solid red"} : {border: "1px solid grey"}} />
            <input type="password" id="password" placeholder='新密碼' onChange={ handleChange } style={error==="密碼輸入不一樣" ? {border:"2px solid red"}:{border:"1px solid grey"}}/>
            <input type="password" id="checkpassword" placeholder='確認密碼' onChange={ handleCheckPassword }  style={error==="密碼輸入不一樣" ? {border:"2px solid red"}:{border:"1px solid grey"}}/>
            <button className="submit" onClick={handleClick} >註冊</button>
            <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
              <span>已有帳號？按這裡登入</span>
            </Link>

            {error && <span style={{color: "red"}}>{error}</span>}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Register