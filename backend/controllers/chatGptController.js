// 导入相关模块和配置
const axios = require("axios");
const dotenv = require("dotenv");
const path = require("path");
//const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const OpenAI = require("openai");

// 加载环境变量
dotenv.config({ path: path.resolve(__dirname, "../config.env") });

const endpoint = process.env.OPENAI_API_ENDPOINT;
const key = process.env.OPENAI_API_KEY;
//const client = new OpenAIClient(endpoint, new AzureKeyCredential(key));
const model = process.env.MODEL;
const resource = process.env.RESOURCE;
const apiVersion = process.env.OPENAI_API_VERSION;

if (!key) {
  throw new Error(
    "The AZURE_OPENAI_API_KEY environment variable is missing or empty."
  );
}

exports.getNewChatGPT= async ()=>{
  return 
}

exports.getResponseFromChatGPT = async (chatHistory, prompt) => {
  try {
    const chatGPT=new OpenAI({
      key,
      baseURL: `https://${resource}.openai.azure.com/openai/deployments/${model}`,
      defaultQuery: { "api-version": apiVersion },
      defaultHeaders: { "api-key": key },
    });
    const messages=chatHistory.map(([role,content])=>({
      role,
      content
    }));
    messages.push({role:'user',content:prompt});
    const response = await chatGPT.chat.completions.create({
      model,
      messages: messages,
    });
    const responseText=response.choices[0].message.content;
    chatHistory.push(['user',prompt]);
    chatHistory.push(['assistant',responseText])
    return responseText;
  } catch (error) {
    console.error("OpenAI API 请求失败:", error.message);
    // 抛出自定义错误信息
    throw new Error("ChatGPT 連接失敗");
  }
};
