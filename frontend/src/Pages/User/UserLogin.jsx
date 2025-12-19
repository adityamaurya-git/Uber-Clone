import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { instance } from "../../api/axios.config";

export const UserLogin = () => {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const navigate = useNavigate();

    const submitHandler = (e) =>{
        e.preventDefault();

        const formData = {
            email,
            password
        }
        
        const response = async (formData) =>{
            await instance.post('api/user/login' , formData).then((res)=>{
                navigate('/user/home');
            }).catch((err)=>{
                console.log(err);
            })
        }

        response(formData);

        setEmail("");
        setPassword(""); 
    }

    return (<>
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img className="w-20 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />

                <form action="" onSubmit={submitHandler}>

                    <h3 className="text-lg font-medium mb-2">What's your email</h3>
                    <input className="bg-[#eeeeee] mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
                    value={email}
                    onChange={((e)=>{setEmail(e.target.value)})}
                    type="email" name="" required placeholder="test@gmail.com" />

                    <h3 className="text-lg font-medium mb-2">Enter Password</h3>
                    <input className="bg-[#eeeeee] mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    type="password" name="" required placeholder="12345" />

                    <input className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base"
                    type="submit" value="Login" />

                </form>
                <p className="text-center">New here? <Link to='/user/register' className="text-blue-600 font-semibold" >Create New Account</Link></p>
            </div>

            <div>
                <Link to='/captain/login' className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">Sign in as Captain</Link>
            </div>
        </div>
    </>)
}