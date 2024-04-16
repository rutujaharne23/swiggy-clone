import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const User = () => {
    const [ userData, setUserData ] = useState([]);

    useEffect(() => {
        fetchUserData();
    });

    const fetchUserData = async () => {
        const data = await fetch("https://api.github.com/users/rutujaharne231");
        const json = await data.json();
        setUserData(json)
        console.log(json)
    }
    const { name, location, html_url, avatar_url } = userData;
    return (
        <div className="user-card">
            <img alt="github-img" className="github-img" src={avatar_url} />
            <h2>{name}</h2>
            <h3>{location}</h3>
            <h4>Contact: <Link to={html_url} target="_blank">GitHub Link</Link></h4>
        </div>
    );
}