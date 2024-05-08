import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import "./card-creationgoal.css";
import axios from "axios";
import CardGoalLevel from "../../components/CardGoalLevel/CardGoalLevel";
import CardGoalSwitch from "../../components/CardGoalSwitch/CardGoalSwitch";
import { cardCreationActions } from "../../reducers/cardCreationReducer";
import { newCardRouter } from "../../configs/URLs";

function CardCreationGoalPage() {
    // redux
    const dispatch = useDispatch();
    const goal = useSelector((state) => state.cardCreation.goal);
    // navigate
    const navigate = useNavigate();
    const [showDetails, setShowDetails] = useState(false)



    // analysze
    const analyzeGoal = () => {
        axios.post(newCardRouter, {
            user_id:"temp01",   // use temp id for now in our systems
            goal: goal
        })
        .then((resp) => {
            // operations
        })
        .catch((e) => {
            // when errors occurs
        })
    }

    const renderOverallGoal = () => {
        return (
            <div className=" bg-sky-500 w-[960px] h-3/6 flex flex-col gap-4 items-center justify-between px-24 py-8 rounded-lg">
                <div className="">Tell pandarrativ about your goals</div>
                <textarea 
                    className="textarea w-full flex-grow" 
                    placeholder="type in your goals" 
                    value={goal} 
                    onChange={(e) => dispatch(cardCreationActions.setGoal(e.target.value))}  // store data into redux
                ></textarea>
                <button className="btn" onClick={() => setShowDetails(true)}>Analyze</button>
            </div>
        )
    }
    //This use switch and slider
    const renderDetailedGoal = () => {
        return (
            <div className="bg-sky-500 h-full w-full flex flex-col gap-4 p-8">

                <div className="detail-goals-block flex-grow w-full flex flex-row justify-around">
                    <div className="h-full w-3/6  flex flex-col gap-2 overflow-auto">
                        <div className="flex flex-row gap-2 w-full">
                            <CardGoalLevel />
                            <div>Humorous</div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <CardGoalLevel />
                            <div>Humorous</div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <CardGoalLevel />
                            <div>Humorous</div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <CardGoalLevel />
                            <div>Humorous</div>
                        </div>
                    </div>
                    <div className="h-full w-1/6 flex flex-col gap-2 overflow-auto">
                        <CardGoalSwitch></CardGoalSwitch>
                        <CardGoalSwitch></CardGoalSwitch>
                        <CardGoalSwitch></CardGoalSwitch>
                        <CardGoalSwitch></CardGoalSwitch>
                        <CardGoalSwitch></CardGoalSwitch>

                    
                    </div>
                </div>
                
                <div className="flex flex-row items-center gap-4">
                    <input type="text" placeholder="Type here" className="input input-bordered flex-grow" />
                    <select className="select w-52">
                        <option disabled selected>Pick learning goal type</option>
                        <option>Binary</option>
                        <option>Ranged</option>
                    </select>
                </div>

                <div className="flex flex-row items-center justify-center gap-8">
                    <button className="btn" onClick={() => setShowDetails(false)}>Last Step</button>
                    <button className="btn" onClick={() => navigate("/card/creation-main")}>Start Creating!</button>
                </div>
            </div>
        )
    }






    return ( 
        <div className="card-creation-goal h-screen flex items-center justify-center p-24">
            {showDetails ? renderDetailedGoal() : renderOverallGoal()}
        </div>
     );
}

export default CardCreationGoalPage;