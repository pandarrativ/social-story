import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// card system
import CardHomePage from './pages/CardHomePage/CardHomePage';
import CardHistoryPage from './pages/CardHistoryPage/CardHistoryPage';
import CardCreationGoalPage from './pages/CardCreationGoalPage/CardCreationGoalPage';
import CardCreationMainPage from './pages/CardCreationMainPage/CardCreationMainPage';
import CardCreationReviewPage from './pages/CardCreationReviewPage/CardCreationReviewPage';
import Testing from './pages/Testing';

// mindmap system


//reframing system




export default function Routers(){  
    return (
        <BrowserRouter>
            <Routes>
                {/* Redirect from "/" to "/card/home". For easy development */}
                <Route path="/" element={<Navigate replace to="/card/home" />} />



                {/* card system */}
                <Route path="/card/home" element={<CardHomePage/>} />
                <Route path="/card/history" element={<CardHistoryPage/>} />
                <Route path="/card/creation-goal" element={<CardCreationGoalPage/>} />
                <Route path='/card/creation-main' element={<CardCreationMainPage/>} />
                <Route path='/card/creation-review' element={<CardCreationReviewPage/>} />
                <Route path='/testing' element={<Testing></Testing>} />
                



                {/* mindmap system */}



                {/* reframing system */}

            </Routes>
        </BrowserRouter>
    )
};