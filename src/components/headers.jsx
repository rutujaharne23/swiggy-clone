import { useContext, useState } from 'react';
import logo from '../logo2.png';
import { Link } from 'react-router-dom';
import { useOnlineStatus } from '../utils/useOnlineStatus';
import { UserContext } from '../utils/userContext';
import { useSelector } from 'react-redux';

export const Header = () => {
    const [btnName, setBtnName] = useState("Login");

    const onlineStatus = useOnlineStatus();

    const { loggedInUser } = useContext(UserContext);

    const cartItems = useSelector((store) => store.cart.items);

    return (
    <div className="flex justify-between bg-pink-100 shadow-lg mb-2">
        <div className='logo-container'>
            <img alt='logo' className='w-24' src={logo} />
        </div>
        <div className='flex items-center'>
            <ul className='flex p-4 m-4 '>  
                <li className='px-4'>
                    Online Status: {onlineStatus ? "🟢" : "🔴"}
                </li>
                <li className='px-4'>
                    <Link to={"/"}>Home</Link>
                </li>
                <li className='px-4'>
                    <Link to={"/about"}>About Us</Link>
                </li>
                <li className='px-4'>
                    <Link to={"/contact-us"}>Contact Us</Link>
                </li>
                <li className='px-4'>
                    <Link to={"/grocery"}>Grocery</Link>
                </li>
                <li className='px-4 font-bold'>
                    <Link to={"/cart"}>Cart ({cartItems.length})</Link>
                </li>
                <button className="nav-button px-4" onClick={() => {
                    btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
                }}>{btnName}</button>
                <li className='px-4 font-bold'>
                    {loggedInUser}
                </li>
            </ul>
        </div>
    </div>
    );
}