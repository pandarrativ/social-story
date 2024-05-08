import { useState } from "react";

function CardGoalLevel({props}) {
    // it has five steps: lowest, low, medium, high, highest
    const [value, setValue] = useState(50)
    const handleOnChange = (event) => {
        setValue(event.target.value);
    };

    return ( 
        <div className="card-goal-level flex-grow">
            <input type="range" min={0} max="100" value={value} className="gradient-range" step="25" onChange={handleOnChange}/>
            <div className="w-full flex justify-between text-xs px-2">
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            </div>
        </div>

     );
}

export default CardGoalLevel;