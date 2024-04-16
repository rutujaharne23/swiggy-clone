import { RestaurantCards } from "./restaurantCard";
import { useContext, useEffect, useState } from "react";
import { Skeleton } from "./skeleton";
import { Link } from "react-router-dom";
import { useOnlineStatus } from "../utils/useOnlineStatus";
import { RESTAURANT_API_URL } from "../utils/constants";
import { UserContext } from "../utils/userContext";

export const Home = () => {
    const [restaurantList, setRestaurantList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");

    const { setUserName, loggedInUser } = useContext(UserContext)

    useEffect(() => {
        fetchData()
    }, []); 

    const fetchData = async () => {
        try {
          const data = await fetch(RESTAURANT_API_URL);
          const json = await data.json();

          setRestaurantList(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants); 
          setLoading(false);
        } catch (error) {
          console.error('Error fetching home page data:', error);
          setLoading(false);
        }
      };

    const onlineStatus = useOnlineStatus();

    if(onlineStatus === false) 
    return (
        <h1>Looks like you're offline!! Please check your internet connection;</h1>
    );

    return (
        <div>
            {loading ? (
                <Skeleton />
            ) : restaurantList ? (
                <div className="body">
                    <div className="flex m-4 p-4">
                        <div className="flex">
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                                    </svg>
                                </div>
                                <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500" placeholder="Search restaurants..." value={searchText} onChange={(e) => {
                                    setSearchText(e.target.value);
                                }} />
                            </div>
                            <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-black bg-cyan-500 rounded-lg border border-cyan-500 hover:bg-cyan-400 focus:ring-4 focus:outline-none focus:ring-cyan-100 dark:bg-cyan-200 dark:hover:bg-cyan-300 dark:focus:ring-cyan-400" onClick={() => {
                                const filteredRestaurant = restaurantList.filter(
                                    (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
                                );
                                setRestaurantList(filteredRestaurant)
                            }}>
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </div>
                        <div>
                            <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-black bg-cyan-500 rounded-lg border border-cyan-500 hover:bg-cyan-400 focus:ring-4 focus:outline-none focus:ring-cyan-100 dark:bg-cyan-200 dark:hover:bg-cyan-300 dark:focus:ring-cyan-400" onClick={() => {
                                const filteredList = restaurantList.filter(
                                    (res) => res.info.avgRating > 4
                                );
                                setRestaurantList(filteredList)
                            }}>Top Rated Restaurant</button>
                        </div>
                        <div className="px-2">
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={loggedInUser} onChange={(e) => {
                                setUserName(e.target.value)
                            }}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap">
                    {restaurantList.map((restaurant, index) => (
                        <Link key={restaurant.info.id} to={`/restaurants/${restaurant.info.id}`}><RestaurantCards key={restaurant.info.id} resData={restaurant}/></Link>
                    ))}
                    </div>
                </div>
            ) : (
                <p>Error fetching data</p>
            )} 
        </div>
    ); 
}