import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./card-creationmain.css";
import MessageBlock from "../../components/MessageBlock/MessageBlock";
import MessageBlockSingle from "../../components/MessageBlockSingle/MessageBlockSingle";
import SimpleEditor from "../../components/WordEditor/SimpleEditor";
import WoodPanel from "../../components/WoodPanel/WoodPanel";
import bgStoryMain from "../../assets/imgs/bg-card-main.png";
import bgEditorBoard from "../../assets/imgs/card-text-board.png";
import CardSegmentWoodPanel from "../../components/CardSegmentWoodPanel/CardSegmentWoodPanel";
import SlidingCarousel from "../../components/SlidingCarousel/SlidingCarousel";
import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";
import useUserInputPackage from "./UseUserInputPackage/UseUserInputPackage";
import { $getRoot ,$createParagraphNode,$createTextNode} from "lexical";
import {$generateHtmlFromNodes} from '@lexical/html';
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf'


function CardCreationMainPage() {
  const navigate = useNavigate();
  const [workingTask, setWorkingTask] = useState("STORY"); // STORY -> STORY_SEGMENTATION -> IMAGE_GENERATION
  const [shift, setShift] = useState(0);
  const [showPanel, setShowPanel] = useState(true);
  const [showSegmentModal, setShowSegmentModal] = useState(false);
  const [showmModalBGCover, setShowModalBGCover] = useState(false);
  const [showSegmentCarousel, setShowSegmentCarousel] = useState(false);
  const {
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
  }=useUserInputPackage()
  // scroll to bottom
  const conversationBottomRef = useRef();
  const storySegmentBottomRef = useRef();
  // useEffect(() => {
  //     conversationBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [msgs]);
  // useEffect(() => {
  //     conversationBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [msgs]);

  const goNextStep = () => {
    switch (workingTask) {
      case "STORY":
        setWorkingTask("STORY_SEGMENTATION");
        break;
      case "STORY_SEGMENTATION":
        setWorkingTask("STORY_REVIEW"); // 第三页
        break;
      case "STORY_REVIEW":
        setWorkingTask("STORY_EDITING"); // 第四页
        break;
      case "STORY_EDITING":
        setWorkingTask("IMAGE_GENERATION"); // 第五页
        break;
      default:
        navigate("/card/creation-review"); // 或其他适当的导航
    }
    setShift((prevShift) => prevShift + 1); // 统一更新页面偏移
  };

  const goLastStep = () => {
    switch (workingTask) {
      case "STORY_SEGMENTATION":
        setWorkingTask("STORY");
        break;
      case "STORY_REVIEW": // 第三页
        setWorkingTask("STORY_SEGMENTATION");
        break;
      case "STORY_EDITING": // 第四页
        setWorkingTask("STORY_REVIEW");
        break;
      case "IMAGE_GENERATION": // 第五页
        setWorkingTask("STORY_EDITING");
        break;
      default:
        navigate("/card/creation-goal"); // 或返回到初始页面
    }
    setShift((prevShift) => prevShift - 1); // 统一更新页面偏移
  };



  // page1 . Conversation
  const newStoryConversationComponent = () => {
    return (
      <div className="card-conversation py-4 px-8 h-full flex flex-col gap-2">
        <div className="flex flex-row w-full mx-auto justify-end"></div>
        <div className="flex flex-col flex-grow gap-4 px-8 py-4 rounded-lg shadow-card w-full mx-auto overflow-auto story-message-block-gradient">
          <MessageBlock title={"Presenting Problem"} onContentChange={handlePresentingProblemChange}/>
          <div ref={conversationBottomRef}></div>
        </div>
      </div>
    );
  };

  const NewRenderStorySegmentComponent = () => {
    const maxBlocks = 10; // 设置MessageBlock的最大数量
    // 使用状态来跟踪MessageBlocks数组
    const [messageBlocks, setMessageBlocks] = useState([
      { id: Math.random(), openPrompt: true },
    ]);

    // 添加MessageBlock的函数
    const addMessageBlock = (index) => {
      if (messageBlocks.length < maxBlocks) {
        const newBlock = { id: Math.random(), openPrompt: true };
        setMessageBlocks([
          ...messageBlocks.slice(0, index + 1),
          newBlock,
          ...messageBlocks.slice(index + 1),
        ]);
      }
    };

    // 删除MessageBlock的函数
    const deleteMessageBlock = (index) => {
      // 确保至少有一个MessageBlock存在
      if (messageBlocks.length > 1) {
        setMessageBlocks(messageBlocks.filter((block,idx) => idx !== index))
        
      }

    };

    return showSegmentCarousel ? (
      <div className={`card-segment py-4 px-8 h-full flex flex-col gap-2 `}>
        <div className="h-full w-full flex flex-col gap-2 px-4 py-4 story-segment-gradient shadow-card rounded-lg">
          <div className="w-full h-3/6">
            <SlidingCarousel></SlidingCarousel>
          </div>
          <div className="newstory-board-color font-monofett text-h4">
            Segment Story
          </div>
          <textarea
            className="w-full h-3/6 resize-none rounded-lg outline-none p-4 shadow-card"
            placeholder="Pick a card to show the story..."
          />
        </div>
      </div>
    ) : (
      <div className={`card-segment py-4 px-8 h-full flex flex-col gap-2`}>
        <div className="flex flex-col gap-2 h-full sm:w-[40vw] md:w-[60vw] lg:w-[70vw] mx-auto overflow-x-auto">
          <div className="h-full w-full flex flex-col gap-2 story-segment-gradient shadow-card rounded-lg px-4 py-4">
            <div className="flex flex-row justify-between w-full items-center">
              <div className="story-board-color font-monofett text-h2 w-5/6 text-left">
                GOAL and OBJECTIVE
              </div>
            </div>
            <div className="card-segments-block flex flex-row flex-grow gap-4 w-full mx-auto overflow-auto pb-4 pt-1 px-1">
              <MessageBlock title={"Goal"} onContentChange={handleGoalChange} />

              {messageBlocks.map((block, index) => (
                <MessageBlock
                  key={block.id}
                  openPrompt={block.openPrompt}
                  title={"Objective"}
                  onAdd={() => {
                    console.log("add pressed")
                    addMessageBlock(index);
                    insertObjective(index);}
                  }
                  onDelete={() => {
                    deleteMessageBlock(index);
                    deleteObjective(index)}}    
                  onContentChange={(event)=>
                    handleObjectiveChange(event,index)}        
                />
              ))}
              <div ref={storySegmentBottomRef}></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderWoodPanel = () => {
    return (
      <div
        id="wood-panel-block-conversation"
        className={shift === 0 ? "wood-slide-up" : "wood-slide-down"}
      >
        <WoodPanel></WoodPanel>
      </div>
    );
  };

  const handleSubmit=async (e)=>{
    const userInputs={      presentingProblem,
      goal,
      objectives,
      when,
      where,
      who,
      what,
      how,
      why,
      storyScenario,
      specialLangNeed,
      words
      }
    const response= await fetch('/api/stories/createByChatGPT',{
    method: 'POST',
        body: JSON.stringify(userInputs),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(response=>response.json())
    .then(data=>{
      pdfEditor.update(() => {
        const root = $getRoot();
        root.clear();
        root.append($createParagraphNode().append($createTextNode (data.content)));
      });
    })
  }

  // Page2.Segments

  const renderStorySegmentComponent = () => {
    // 定义标题数组
    const titles = ["where", "when", "who", "what", "how", "why"];
    const handleChanges=[handleWhereChange,handleWhenChange,handleWhoChange,handleWhatChange,handleHowChange,handleWhyChange];
    return showSegmentCarousel ? (
      <div
        className={`card-segment py-4 px-8 h-full flex flex-col gap-2 ${shift === 2 ? "fade-enter-active fade-exit" : "fade-exit-activate fade-enter"}`}
      >
        <div className="h-full w-full flex flex-col gap-2 px-4 py-4 story-segment-gradient shadow-card rounded-lg">
          <div className="w-full h-3/6">
            <SlidingCarousel></SlidingCarousel>
          </div>
          <div className="story-board-color font-monofett text-h4">
            Segment Story
          </div>
          <textarea
            className="w-full h-3/6 resize-none rounded-lg outline-none p-4 shadow-card"
            placeholder="Pick a card to show the story..."
          />
        </div>
      </div>
    ) : (
      <div className={`card-segment py-4 px-8 h-full flex flex-col gap-2 `}>
        <div className="h-full w-full flex flex-col gap-2 story-segment-gradient shadow-card rounded-lg px-4 py-4">
          <div className="flex flex-row justify-between w-full items-center"></div>
          <div
            className="newcard-segments-block flex flex-col gap-4 w-full mx-auto overflow-auto pb-4 pt-1 px-1"
            style={{ height: "100%" }}
          >
            {Array.from({ length: 3 }).map((_, rowIndex) => (
              <div
                className="flex flex-row justify-between w-full"
                key={`row-${rowIndex}`}
              >
                {Array.from({ length: 2 }).map((_, colIndex) => (
                  <div
                    className="flex flex-col"
                    key={`card-${rowIndex}-${colIndex}`}
                  >
                    {/* 分别设置不同的title属性 */}
                    <MessageBlockSingle
                      title={titles[rowIndex * 2 + colIndex]}
                      onContentChange={handleChanges[rowIndex*2+colIndex]}
                      openPrompt={true}
                    />
                  </div>
                ))}
              </div>
            ))}
            <div ref={storySegmentBottomRef}></div>
            <button
              className="inline-block btn-white-2 font-monofett text-h4 shadow-card"
              onClick={()=>{
                goNextStep();
                handleSubmit()
                }}
            >
              GENERATE
            </button>
          </div>
        </div>
      </div>
    );
  };

  const [storyScenarioEditor,setStoryScenarioEditor]=useState();

  const renderStoryComponent = () => {
    return (
      <div className="card-story py-4 px-8 h-full w-full">
        <div className="flex flex-col gap-2 py-4 items-center justify-between w-full h-full relative">
          <img
            src={bgEditorBoard}
            alt="a wood board"
            className="absolute h-full top-0 w-full z-[-10] shadow-thik rounded-md"
          ></img>
          <div className="story-board-color font-monofett text-h2 w-5/6 text-left">
            STORY SCENARIO
          </div>
          <div className="w-5/6 flex-grow shadow-card rounded-lg">
            <SimpleEditor setEditor={setStoryScenarioEditor}
            handleContentChange={handleStoryScenarioChange}></SimpleEditor>
          </div>
        </div>
      </div>
    );
  };
  const renderSegmentModal = () => {
    return (
      shift === 1 && (
        <div
          id="wood-panel-block-segment"
          className={`card-segment-wood ${showSegmentModal && "card-segment-wood-up"}`}
        >
          <CardSegmentWoodPanel
            onClose={() => {
              setShowSegmentModal(false);
              setTimeout(() => {
                setShowModalBGCover(false);
              }, 1000);
            }}
          ></CardSegmentWoodPanel>
        </div>
      )
    );
  };
  const newrenderWoodPanel = () => {
    return (
      <div
        id="wood-panel-block-conversation"
        className={shift === 0 ? "wood-slide-up" : "wood-slide-down"}
      >
        <WoodPanel></WoodPanel>
      </div>
    );
  };
  // page3. Conversation
  const secondStoryConversationComponent = () => {
    return (
      <div className="card-conversation py-4 px-8 h-full flex flex-col gap-2">
        <div className="flex flex-row w-full mx-auto justify-end"></div>
        <div className="flex flex-col flex-grow gap-4 px-8 py-4 rounded-lg shadow-card w-full mx-auto overflow-auto story-message-block-gradient">
          <MessageBlock 
          title={"Special Language Needs"}
          onContentChange={handleSpecialLangNeed} />
          <div ref={conversationBottomRef}></div>
        </div>
      </div>
    );
  };

  const SecondRenderStorySegmentComponent = () => {
    const maxBlocks = 10; // 设置MessageBlock的最大数量
    // 使用状态来跟踪MessageBlocks数组
    const [messageBlocks, setMessageBlocks] = useState([
      { id: Math.random(), openPrompt: true },
    ]);

    // 添加MessageBlock的函数
    const addMessageBlock = (index) => {
      if (messageBlocks.length < maxBlocks) {
        const newBlock = { id: Math.random(), openPrompt: true };
        setMessageBlocks([
          ...messageBlocks.slice(0, index + 1),
          newBlock,
          ...messageBlocks.slice(index + 1),
        ]);
      }
    };

    // 删除MessageBlock的函数
    const deleteMessageBlock = (index) => {
      // 确保至少有一个MessageBlock存在
      if (messageBlocks.length > 1) {
        setMessageBlocks(messageBlocks.filter((block,id) => index !== id));
      }
    };

    return showSegmentCarousel ? (
      <div
        className={`card-segment py-4 px-8 h-full flex flex-col gap-2 ${shift === 2 ? "fade-enter-active fade-exit" : "fade-exit-activate fade-enter"}`}
      >
        <div className="h-full w-full flex flex-col gap-2 px-4 py-4 story-segment-gradient shadow-card rounded-lg">
          <div className="w-full h-3/6">
            <SlidingCarousel></SlidingCarousel>
          </div>
          <div className="newstory-board-color font-monofett text-h4">
            Segment Story
          </div>
          <textarea
            className="w-full h-3/6 resize-none rounded-lg outline-none p-4 shadow-card"
            placeholder="Pick a card to show the story..."
          />
        </div>
      </div>
    ) : (
      <div
        className={`card-segment py-4 px-8 h-full flex flex-col gap-2 ${shift === 2 ? "fade-exit-activate fade-enter" : "fade-exit fade-enter-active"}`}
      >
        <div className="h-full w-full flex flex-col gap-2 story-segment-gradient shadow-card rounded-lg px-4 py-4">
          <div className="flex flex-row justify-between w-full items-center">
            <div className="story-board-color font-monofett text-h2 w-5/6 text-left">
              Vocabulary
            </div>
          </div>
          <div className="card-segments-block flex flex-row flex-grow gap-4 w-[70vw] mx-auto overflow-x-auto pb-4 pt-1 px-1">
            {messageBlocks.map((block, index) => (
              <MessageBlock
                key={block.id}
                openPrompt={block.openPrompt}
                title={"Word"}
                onAdd={() => {
                  addMessageBlock(index)
                  insertWord(index)
                }}
                onDelete={() => {
                  deleteMessageBlock(index)
                  deleteWord(index)
                }}
                onContentChange={(event)=>
                  handleWordChange(event,index)} 
              />
            ))}

            <div ref={storySegmentBottomRef}></div>
          </div>
        </div>
      </div>
    );
  };

  // Page4
  /*
   const StorySegmentComponent = () => {
    return showSegmentCarousel ? (
      <div
        className={`card-segment py-4 px-8 h-full flex flex-col gap-2 ${shift === 2 ? "fade-enter-active fade-exit" : "fade-exit-activate fade-enter"}`}
      >
        <div className="h-full w-full flex flex-col gap-2 px-4 py-4 story-segment-gradient shadow-card rounded-lg">
          <div className="w-full h-3/6">
            <SlidingCarousel></SlidingCarousel>
          </div>
          <div className="story-board-color font-monofett text-h4">
            Segment Story
          </div>
          <textarea
            className="w-full h-3/6 resize-none rounded-lg outline-none p-4 shadow-card"
            placeholder="Pick a card to show the story..."
          />
        </div>
      </div>
    ) : (
      <div className={`card-segment py-4 px-8 h-full flex flex-col gap-2 `}>
        <div className="h-full w-full flex flex-col gap-2 story-segment-gradient shadow-card rounded-lg px-4 py-4">
          <div className="flex flex-row justify-between w-full items-center"></div>
          <div
            className="newcard-segments-block flex flex-col gap-4 w-full mx-auto overflow-auto pb-4 pt-1 px-1"
            style={{ height: "100%" }}
          >
            {Array.from({ length: 3 }).map((_, rowIndex) => (
              <div
                className="flex flex-row justify-between w-full"
                key={`row-${rowIndex}`}
              >
                {Array.from({ length: 2 }).map((_, colIndex) => (
                  <div
                    className="flex flex-col"
                    key={`card-${rowIndex}-${colIndex}`}
                  >
                    <MessageBlockSingle openPrompt={true} />
                  </div>
                ))}
              </div>
            ))}
            <div ref={storySegmentBottomRef}></div>
          </div>
        </div>
      </div>
    );
  };

  const StoryComponent = () => {
    return (
      <div className="card-story py-4 px-8 h-full w-full">
        <div className="flex flex-col gap-2 py-4 items-center justify-between w-full h-full relative">
          <img
            src={bgEditorBoard}
            alt="a wood board"
            className="absolute h-full top-0 w-full z-[-10] shadow-thik rounded-md"
          ></img>
          <div className="story-board-color font-monofett text-h2 w-5/6 text-left">
            STORY EDITOR
          </div>
          <div className="w-5/6 flex-grow shadow-card rounded-lg">
            <SimpleEditor></SimpleEditor>
          </div>
        </div>
      </div>
    );
  };
  const SegmentModal = () => {
    return (
      shift === 1 && (
        <div
          id="wood-panel-block-segment"
          className={`card-segment-wood ${SegmentModal && "card-segment-wood-up"}`}
        >
          <CardSegmentWoodPanel
            onClose={() => {
              setShowSegmentModal(false);
              setTimeout(() => {
                setShowModalBGCover(false);
              }, 1000);
            }}
          ></CardSegmentWoodPanel>
        </div>
      )
    );
  };
  const secondrenderWoodPanel = () => {
    return (
      <div
        id="wood-panel-block-conversation"
        className={shift === 0 ? "wood-slide-up" : "wood-slide-down"}
      >
        <WoodPanel></WoodPanel>
      </div>
    );
  };
  */

  // page5
  const ConversationComponent = () => {
    return (
      <div className="card-conversation py-4 px-8 h-full flex flex-col gap-2">
        <div className="flex flex-row w-full mx-auto justify-end"></div>
        <div className="flex flex-col flex-grow gap-4 px-8 py-4 rounded-lg shadow-card w-full mx-auto overflow-auto story-message-block-gradient">
          <MessageBlock />
          <MessageBlock />
          <MessageBlock />
          <MessageBlock />
          <div ref={conversationBottomRef}></div>
        </div>
      </div>
    );
  };


  const [pdfEditor,setPdfEditor]=useState()

  function PDFDownloadButton()  {
    const downloadPDF =  ()=> {
      pdfEditor.update( async () => {
        const html= $generateHtmlFromNodes(pdfEditor,  null);
        await fetch('/api/storyCvtPDF', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ html ,storyScenario,objectives}),
      })
      .then(response => response.blob())
      .then(blob => {
          // Open PDF file in new tab
          const fileURL = URL.createObjectURL(blob);
          window.open(fileURL, '_blank');
      })
      .catch(error => console.error('Error:', error));
    })
  };
    return (
      <button onClick={downloadPDF}>Download PDF</button>
    );
  };

  const NewStoryComponent = () => {
    return (
      <div className="card-story py-4 px-8 h-full w-full">
        <div className="flex flex-col gap-2 py-4 items-center justify-between w-full h-full relative">
          <img
            src={bgEditorBoard}
            alt="a wood board"
            className="absolute h-full top-0 w-full z-[-10] shadow-thik rounded-md"
          ></img>
          <div className="story-board-color font-monofett text-h2 w-5/6 text-left">
            PDF VIEW
          </div>
          <div className="w-5/6 flex-grow shadow-card rounded-lg">
            <SimpleEditor handleContentChange={()=>{}} setEditor={setPdfEditor}/>
            <PDFDownloadButton/>
          </div>
        </div>
      </div>
    );
  };

  const renderImageGenerationComponent = () => {
    return (
      <div className="card-image-generation py-4 px-8 h-full w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2 p-4 items-center justify-between w-full h-full relative">
          <img
            src={bgEditorBoard}
            alt="a wood board"
            className="absolute h-full top-0 w-full z-[-10] shadow-thik rounded-md"
          ></img>
          <div className="w-full flex flex-row justify-between">
            <div className="story-board-color w-full font-monofett text-h2 text-left">
              STORY EDITOR
            </div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="font-title font-semibold">
                  Pick the story segment:
                </span>
              </div>
              <select className="select select-bordered">
                <option>Card 1</option>
                <option>Card 2</option>
                <option>Card 3</option>
                <option>Card 4</option>
                <option>Card 5</option>
              </select>
            </label>
          </div>
          <div className="w-full flex-grow rounded-lg shadow-card">
            <Excalidraw
            // initialData={{appState: {viewBackgroundColor: "#fcf7e6" }}}
            >
              <MainMenu>
                <MainMenu.Group title="File Operations">
                  <MainMenu.DefaultItems.LoadScene />
                  <MainMenu.DefaultItems.SaveAsImage />
                  <MainMenu.DefaultItems.Export />
                </MainMenu.Group>
                <MainMenu.Group title="Canvas Operations">
                  <MainMenu.DefaultItems.ToggleTheme />
                  <MainMenu.DefaultItems.ClearCanvas />
                  <MainMenu.DefaultItems.ChangeCanvasBackground />
                </MainMenu.Group>
              </MainMenu>
            </Excalidraw>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="card-creation-main h-screen flex flex-col pt-16 pb-8 gap-4 relative">
      <div className="absolute h-screen w-screen left-0 top-0 z-[-100] center-full-height-img-box">
        <img
          src={bgStoryMain}
          alt="a desktop background"
          className="center-full-height-box-img"
        ></img>
      </div>

      <div
        className="creation-main-body flex flex-row"
        style={{ transform: `translateX(-${shift * 25}%)` }}
      >
        <div
          className={`creation-body-part h-full flex ${shift === 0 ? "card-left-part" : ""}`}
        >
          <div className="flex flex-5">{newStoryConversationComponent()}</div>
          <div
            className="flex flex-5 overflow-auto"
            style={{ maxHeight: "90vh" }}
          >
            {NewRenderStorySegmentComponent()}
          </div>
        </div>

        <div
          className={`creation-body-part h-full flex${shift === 0 ? "card-right-part" : ""} ${shift === 1 ? "card-left-part" : ""}`}
        >
          / <div className="flex flex-5">{renderStorySegmentComponent()}</div>
          <div
            className="flex flex-5 overflow-auto"
            style={{ maxHeight: "90vh" }}
          >
            {renderStoryComponent()}
          </div>
        </div>

        <div
          className={`creation-body-part h-full flex${shift === 0 ? "card-right-part" : ""} ${shift === 1 ? "card-left-part" : ""}`}
        >
          <div className="flex flex-5 overflow-auto">
            {secondStoryConversationComponent()}
          </div>
          <div
            className="flex flex-5 overflow-auto"
            style={{ maxHeight: "90vh" }}
          >
            {SecondRenderStorySegmentComponent()}
          </div>
        </div>

        {/* 
 <div
          className={`creation-body-part h-full flex${shift === 0 ? "card-right-part" : ""} ${shift === 1 ? "card-left-part" : ""}`}
        >
          <div className="flex flex-5">{StorySegmentComponent()}</div>
          <div
            className="flex flex-5 overflow-auto"
            style={{ maxHeight: "90vh" }}
          >
            {StoryComponent()}
          </div>
        </div>
*/}

        <div
          className={`creation-body-part h-full flex${shift === 0 ? "card-right-part" : ""} ${shift === 1 ? "card-left-part" : ""}`}
        >
          <div className="flex flex-6">{ConversationComponent()}</div>
          <div
            className="flex flex-6 overflow-auto"
            style={{ maxHeight: "90vh" }}
          >
            {NewStoryComponent()}
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between h-12 px-4">
        <button
          className="btn-white-2 font-monofett text-h3 shadow-card"
          onClick={goLastStep}
        >
          PREV
        </button>
        <button
          className="btn-white-2 font-monofett text-h3 shadow-card"
          onClick={goNextStep}
        >
          NEXT
        </button>
      </div>

      {renderWoodPanel()}
      {renderSegmentModal()}
      {showmModalBGCover && <div className="bg-modal-cover"></div>}
    </div>
  );
}

export default CardCreationMainPage;
