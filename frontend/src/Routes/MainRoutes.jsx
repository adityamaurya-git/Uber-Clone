import { Route, Routes } from "react-router-dom"
import { Home } from "../Pages/Home"
import { UserLogin } from "../Pages/User/UserLogin"
import { UserRegister } from "../Pages/User/UserRegister"
import { CaptainLogin } from "../Pages/Captain/CaptainLogin"
import { CaptainRegister } from "../Pages/Captain/CaptainRegister"
import { CaptainHome } from "../Pages/Captain/CaptainHome"
import { UserHome } from "../Pages/User/UserHome"

export const MainToutes = () =>{

    return(<>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/login" element={<UserLogin/>} />
            <Route path="/user/register" element={<UserRegister/>} />
            <Route path="/captain/login" element={<CaptainLogin/>}/>
            <Route path="/captain/register" element={<CaptainRegister/>}/>
            <Route path="/captain/home" element={<CaptainHome/>}/>
            <Route path="/user/home" element={<UserHome/>}/>
        </Routes>
    </>)
}