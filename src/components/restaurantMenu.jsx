import { Skeleton } from "./skeleton";
import { useParams } from "react-router-dom";
import { useRestaurantMenu } from "../utils/useRestaurantMenu";
import { RestaurantCategory } from "./restaurantCategory";
import { useState } from "react";

export const RestaurantMenu = () => {
    const { resId } = useParams();  
    const [showIndex, setShowIndex] = useState(true);

    const restaurantInfo = useRestaurantMenu(resId);
    
    if(restaurantInfo.length === 0) return <Skeleton />;

    const { name, avgRatingString, totalRatingsString, costForTwoMessage } = restaurantInfo?.cards?.[2]?.card?.card?.info || {};

    const categories = restaurantInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        item => item.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
    
    return (
        <div>
            <div className="text-center">
                <div className="font-bold my-5 text-2xl">{name}</div>
                <div className="flex justify-center items-center my-3">
                    <div>{"⭐"} {avgRatingString}</div>
                    <div className="px-2">{"(" + totalRatingsString + ")"}</div>
                    <div className="px-1 text-xs text-gray-400">&#9679;</div>
                    <div className="px-1" >{costForTwoMessage}</div>
                </div>
                {/* <div className="my-3">{cuisines && cuisines.length > 0 ? cuisines.join(", ") : null}</div> */}
                <div>
                    {categories.map((category, index) => (
                        <RestaurantCategory 
                            key={index} 
                            data={category?.card?.card} 
                            showItems={index === showIndex ? true : false} 
                            setShowIndex={() => setShowIndex(index)}
                        />
                    ))}
                </div>
                
            </div>
        </div>
        
    );
}