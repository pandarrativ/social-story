import { useNavigate } from "react-router-dom";

function CardCreationReviewPage() {
    const navigate = useNavigate();

    return ( 
        <div className="card-creation-review h-screen flex flex-col gap-8 px-16 py-8">
            <div className="flex-grow flex flex-row gap-4">
                <div className="bg-sky-500 w-36 h-full">
                    Instruction
                </div>

                <div className="bg-sky-500 flex-grow flex flex-row gap-4 overflow-y-auto">
                    <div className="bg-red-400 h-full aspect-[9/16]"></div>
                    <div className="bg-red-400 h-full aspect-[9/16]"></div>
                    <div className="bg-red-400 h-full aspect-[9/16]"></div>
                    <div className="bg-red-400 h-full aspect-[9/16]"></div>
                    <div className="bg-red-400 h-full aspect-[9/16]"></div>
                    <div className="bg-red-400 h-full aspect-[9/16]"></div>
                    <div className="bg-red-400 h-full aspect-[9/16]"></div>
                    <div className="bg-red-400 h-full aspect-[9/16]"></div>
                </div>
            </div>   


            <div className="w-full flex flex-row justify-between gap-4">
                <button className="btn" onClick={() => navigate("/card/creation-main")}>Last Step</button>
                <div className="flex-grow"></div>   {/* empty space */}
                <button className="btn" onClick={() => navigate("/card/creation-goal")}>Creation Another Collection</button>
                <button className="btn" onClick={() => navigate("/card/home")}>Home</button>
            </div>         
        </div>
     );
}

export default CardCreationReviewPage;