// 导入相关模块和模型
const Story = require("../models/StoryModel");
const mongoose=require('mongoose')
const chatGptController = require("./chatGptController");

// 生成故事
exports.createStoryByChatGPT = async (req, res) => {
  try {
    // 从请求中获取用户指令
    const {
      presentingProblem,
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
    } = req.body;
    

    // 拼接用户指令和预存指令
    const preprompt = `Generate a social story to assist children in skill learning or adapting to scenarios based on user instructions. Regarding social stories, here's what you need to know:
    1. Social stories/articles consist of a clear thematic title and introduction, a body adding details, and a conclusion emphasizing and summarizing information. First, identify the social context to address and its impact on the individual. This may involve confusion, anxiety, or challenges in specific scenarios.
    2. Social stories answer relevant "wh" questions, describing context, including location (WHERE), time-related information (WHEN), relevant individuals (WHO), important clues (WHAT), basic activities, behaviors, or statements (HOW), and reasons behind them (WHY).
    3. Social stories consist of descriptive sentences and optional guiding sentences. Alternate between descriptive and guiding sentences in the story. Descriptive sentences are used to state facts, express thoughts, and feelings, while guiding sentences are used to guide behavior and provide solutions. Maintain a ratio of at least 2 descriptive sentences to each guiding sentence. The story should be more descriptive to help individuals understand the scenario and resonate.
    4. Social story objectives: Authors share accurate information through a clearly defined process, using descriptive, meaningful content, format, and tone that is safe for the audience physically, socially, and emotionally.
    5. At least 50% of social stories should be used to praise achievements, encouraging children with positive language to acquire a new skill or adapt to an environment. The text should be written from the individual's perspective in the first person, using simple, positive language.
    6. Please generate story content without any explanatory text or story titles.\n`;
    const presentingProblemPrompt=`The story primarily needs to present this situation:${presentingProblem},\n`
    const goalPrompt=`The learning goal of the story is${goal},\n`
    let objectivesPrompt=`The story must achieve the following goals: `
    for (let i=0;i<objectives.length;i++){
      objectivesPrompt+= `${i+1}: ${objectives[i]}`
    }
    objectivesPrompt+='\n'
    const prompt5W1H= `The story needs to address the following points:\nWhere:${where}\nWhen：${when}\nWho:${who}\nWhat:${what}\nHow:${how}\nWhy:${why}\n`
    const storyScenarioPromopt= `The story should mention the following incidents:${storyScenario}\n`
    let wordsPrompt=`The story must include the following words: `
    for (let i=0;i<words.length;i++){
      wordsPrompt+= `${i+1}: ${words[i]}`
    }
    wordsPrompt+=`\n`
    const specialNeedsOnLanguagePrompt=`Also, it needs to meet the following language-specific needs:${specialLangNeed}`
    // 拼接用户指令和预存指令
    const fullPrompt = preprompt+presentingProblemPrompt+goalPrompt+objectivesPrompt+prompt5W1H+storyScenarioPromopt+wordsPrompt+specialLangNeed;
    const content=fullPrompt;
    // // 生成故事
    // const chatHistory=[]
    // const content = await chatGptController.getResponseFromChatGPT(
    //   chatHistory,fullPrompt
    // );
    // const titlePrompt =`這篇故事的標題要叫什麼:\n`
    // const title = await chatGptController.getResponseFromChatGPT(
    //   chatHistory,titlePrompt
    // );
    // const story = new Story({
    //   title,
    //   content,
    // });
    // await story.save()
    // // 返回生成的故事
    // res.json(story);
    const title="no title123";
    const story = new Story({
      title,
      content,
    });
    res.json(story);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "服务器内部错误-故事返回失败" });
  }
};

// 保存故事到数据库
exports.createStoryByUser = async (req, res) => {
  try {
    // 从请求中获取要保存的故事内容
    const { title, content } = req.body;

    // 创建新的故事对象
    const story = new Story({
      title,
      content,
    });

    // 保存故事到数据库
    await story.save();
    console.log(story)
    // 返回成功消息
    res.json(story);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "服务器内部错误-故事保存失败" });
  }
};

// 获取所有故事
exports.getAllStories = async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "服务器内部错误-获取故事失败" });
  }
};

// 根据ID获取某个故事
exports.getStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: "找不到该故事" });
    }
    res.json(story);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "服务器内部错误-获取故事失败" });
  }
};

// 根据ID删除故事
exports.deleteStory = async (req, res) => {
  try {
    const storyId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(storyId)){
      return res.status(404).json({error:"No such story"})
    }
    const deletedStory = await Story.findByIdAndDelete(storyId);
    if (!deletedStory) {
      return res.status(404).json({ message: "找不到要删除的故事" });
    }
    res.status(200).json(deletedStory);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "服务器内部错误-故事删除失败" });
  }
};

exports.updateStory= async (req, res) => {
  try {
    const storyId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(storyId)){
      return res.status(404).json({error:"No such story"})
    }
    const story = await Story.findOneAndUpdate({_id:storyId},{
      ...req.body
    });
    if (!story) {
      return res.status(404).json({ error: "找不到要更新的故事" });
    }
    res.status(200).json({ story });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "服务器内部错误-故事删除失败" });
  }
};
