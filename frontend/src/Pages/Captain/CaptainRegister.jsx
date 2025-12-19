import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../../api/axios.config";

export const CaptainRegister = () => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [color , setColor] = useState("");
    const [capacity , setCapacity] = useState(1);
    const [plate , setPlate] = useState("");
    const [vehicleType , setVehicleType] = useState("");

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = {
            fullName: {
                firstname,
                lastname
            },
            email,
            password,
            vehicle:{
                color,
                plate,
                capacity:Number(capacity),
                vehicleType
            }

        }
        
        const response = async (formData) =>{
            await instance.post('/api/captain/register' , formData).then((res)=>{
                navigate('/captain/login');
            }).catch((err)=>{
                console.log(err);
            })
        }

        response(formData);

        setEmail("");
        setPassword("");
        setFirstname("");
        setLastname("");
        setColor("");
        setCapacity(1);
        setPlate("");
        setVehicleType("");
    }

    return (<>

        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img className="w-20 mb-7" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />

                <form action="" onSubmit={submitHandler}>

                    <h3 className="text-base font-medium mb-2">What's your Name</h3>
                    <div className="flex gap-2">
                        <input className="bg-[#eeeeee] mb-4 rounded px-4 py-2  w-1/2 text-lg placeholder:text-base"

                            value={firstname}
                            onChange={((e) => { setFirstname(e.target.value) })}
                            type="text" name="" required placeholder="First Name" />

                        <input className="bg-[#eeeeee] mb-4 rounded px-4 py-2  w-1/2 text-lg placeholder:text-base"
                            value={lastname}
                            onChange={((e) => { setLastname(e.target.value) })}
                            type="text" name="" required placeholder="Last Name" />
                    </div>

                    <h3 className="text-base font-medium mb-2">What's your Email</h3>
                    <input className="bg-[#eeeeee] mb-4 rounded px-4 py-2  w-full text-lg placeholder:text-base"
                        value={email}
                        onChange={((e) => { setEmail(e.target.value) })}
                        type="email" name="" required placeholder="test@gmail.com" />

                    <h3 className="text-base font-medium mb-2">Enter Password</h3>
                    <input className="bg-[#eeeeee] mb-4 rounded px-4 py-2  w-full text-lg placeholder:text-base"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        type="password" name="" required placeholder="12345" />

                    <h3 className="text-base font-medium mb-2">Vehicle Info</h3>
                    <div className="flex gap-2">
                        <input className="bg-[#eeeeee] mb-4 rounded px-4 py-2  w-1/2 text-lg placeholder:text-base"
                        value={color}
                        onChange={(e) => (setColor(e.target.value))}
                        type="text" required placeholder="Color"/>

                        <input className="bg-[#eeeeee] mb-4 rounded px-4 py-2  w-1/2 text-lg placeholder:text-base"
                        value={capacity}
                        onChange={(e) => (setCapacity(e.target.value))}
                        type="number" required placeholder="Capcity"/>
                    </div>
                    
                    <input className="bg-[#eeeeee] mb-4 rounded px-4 py-2  w-full text-lg placeholder:text-base"
                    value={plate}
                    onChange={(e) => (setPlate(e.target.value))}
                    type="text" required placeholder="Plate No."/>
                        
                    <select className="bg-[#eeeeee] mb-4 rounded px-4 py-2  w-full text-lg placeholder:text-base" 
                    value={vehicleType}
                    onChange={(e) => (setVehicleType(e.target.value))}
                    name="" id="">
                        
                        <option value="">--Vehicle Type--</option>
                        <option value="car">Car</option>
                        <option value="bike">Bike</option>
                        <option value="auto">Auto</option>
                    </select>

                    <input className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base"
                        type="submit" value="Create Account" />



                </form>
                <p className="text-center">Already have an account? <Link to='/captain/login' className="text-blue-600 font-semibold" >Login Here</Link></p>
            </div>

            {/* <p className="text-xs">By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.</p> */}
        </div>
    </>)
}