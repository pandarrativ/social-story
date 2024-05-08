import React,{ useState } from "react";


const useUserInputPackage=()=>{
    const [presentingProblem,setPresentingProblem]=useState("");
    const [goal,setGoal]=useState('');
    const [objectives,setObjectives]=useState([]);
    const [where,setWhere]=useState('');
    const [when,setWhen]=useState('');
    const [who,setWho]=useState('');
    const [what,setWhat]=useState('');
    const [how,setHow]=useState('');
    const [why,setWhy]=useState('');
    const [storyScenario,setStoryScenario]=useState('');
    const [specialLangNeed,setSpecialLangNeed]=useState('');
    const [words,setWords]=useState([]);

    const handlePresentingProblemChange = (event) => {
      setPresentingProblem(event.target.value);
    };

  // Function to handle change in goal
    const handleGoalChange = (event) => {
      setGoal(event.target.value);
    };

    const handleObjectiveChange=(event,index)=>{
      const objectivesTemp=[...objectives];
      objectivesTemp[index]=event.target.value;
      setObjectives(objectivesTemp);
    }

    const deleteObjective=(index)=>{
      const objectivesTemp = [...objectives]; 
      objectivesTemp.splice(index, 1); 
      setObjectives(objectivesTemp); 
    }

    const insertObjective=(index)=>{
      const objectivesTemp=[...objectives];
      objectivesTemp.splice(index+1,0,"");
      setObjectives(objectivesTemp);
    }

    const handleWhenChange = (event) => {
      setWhen(event.target.value);
    };

    const handleWhereChange = (event) => {
      setWhere(event.target.value);
    };

    const handleWhoChange = (event) => {
      setWho(event.target.value);
    };
    
    const handleWhatChange = (event) => {
      setWhat(event.target.value);
    };

    const handleHowChange = (event) => {
      setHow(event.target.value);
    };

    const handleWhyChange = (event) => {
      setWhy(event.target.value);
    };

    const handleStoryScenarioChange = (editorState) => {
      setStoryScenario(editorState._nodeMap.get('root').__cachedText);
      console.log(storyScenario)
    }


    const handleSpecialLangNeed = (event) => {
      setSpecialLangNeed(event.target.value);
    };

    const handleWordChange=(event,index)=>{
      const wordsTemp=[...words];
      wordsTemp[index]=event.target.value;
      setWords(wordsTemp);
    }

    const deleteWord=(index)=>{
      const wordsTemp = [...words]; 
      wordsTemp.splice(index, 1); 
      setWords(wordsTemp); 
    }

    const insertWord=(index)=>{
      const wordsTemp=[...words];
      wordsTemp.splice(index+1,0,"");
      setWords(wordsTemp);
    }

    return{
      presentingProblem,
      handlePresentingProblemChange,
      goal,
      handleGoalChange,
      objectives,
      handleObjectiveChange,
      deleteObjective,
      insertObjective,
      when,
      handleWhenChange,
      where,
      handleWhereChange,
      who,
      handleWhoChange,
      what,
      handleWhatChange,
      how,
      handleHowChange,
      why,
      handleWhyChange,
      storyScenario,
      handleStoryScenarioChange,
      specialLangNeed,
      handleSpecialLangNeed,
      words,
      handleWordChange,
      deleteWord,
      insertWord
    }
}

export default useUserInputPackage;