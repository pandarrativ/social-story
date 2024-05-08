import { useState } from "react";


function CardGoalSwitch({props}) {
    const [isChecked, setIsChecked] = useState(true)
    const toggleCheckbox = () => {
      setIsChecked(!isChecked);
    };

    return ( 
        <div className="form-control w-52 w-full">
            <label className="cursor-pointer label">            
                <input type="checkbox" className="toggle toggle-accent" checked={isChecked} onChange={toggleCheckbox} />
                <span className="label-text">Kind</span> 
            </label>
        </div>
     );
}

export default CardGoalSwitch;