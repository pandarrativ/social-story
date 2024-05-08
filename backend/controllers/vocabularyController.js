const chatGptController = require("./chatGptController");

exports.lookupDictionary= async (req, res) => {
    try {
        const {word}=req.body;
        const prompt=`Give me the definitiobn of: ${word}`
        const chatHistory=[]
        const definition = await chatGptController.getResponseFromChatGPT(
          chatHistory,prompt
        );
      res.status(200).json({ definition:definition });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "服务器内部错误-故事删除失败" });
    }
  }