import { Link } from "react-router-dom"

export const Home = () =>{
    
    return (<>
        <div>
            <div className=" bg-[url(https://plus.unsplash.com/premium_photo-1731842686156-74895c29a87b?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center pt-7 h-screen w-full flex flex-col justify-between">
                <img className="w-20 ml-8" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
                <div className="bg-white py-4 px-4 pb-7">
                    <h2 className="text-3xl font-bold">Get Started with Uber</h2>
                    <Link to='/user/login' className="flex justify-center items-center w-full bg-black text-white py-3 rounded mt-4">Continue</Link>
                </div>
            </div>
        </div>
    </>)
}