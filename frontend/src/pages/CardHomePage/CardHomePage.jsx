import { useNavigate } from "react-router-dom";
import "./card-homepage.css"

function CardHomePage() {
    const navigate = useNavigate();


    return ( 
        <div className="card-homepage h-screen">
            <div className="flex flex-row justify-around items-center h-full">


                <div className="bg-sky-500 h-96 w-48" onClick={() => navigate("/card/creation-goal")}>
                    New Card
                </div>

                <div className="bg-sky-500 h-96 w-48" onClick={() => navigate("/card/history")}>
                    History
                </div>
            </div>


        </div>
     );
}

export default CardHomePage;