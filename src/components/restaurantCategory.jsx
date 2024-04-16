import { ItemList } from "./itemList";
import { useState } from "react";

export const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const handleClick = () => {
        setIsExpanded(!isExpanded);
        setShowIndex();
    }
    return (
        <div>
            <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4">
                <div className="flex justify-between cursor-pointer" onClick={handleClick}>
                    <span className="font-bold text-lg">{data.title} ({data.itemCards.length})</span>
                    <span>🔽</span>
                </div>
                {isExpanded && showItems && data.itemCards.map((item, index) => (
                    <ItemList key={index} items={item} />
                ))}
            </div>
            
        </div>
    );
 }