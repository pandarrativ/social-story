// 导入相关模块和配置
const axios = require("axios");
const dotenv = require("dotenv");
const path = require("path");
//const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const OpenAI = require("openai");

// 加载环境变量
dotenv.config({ path: path.resolve(__dirname, "../config.env") });

exports.getResponseFromChatGPT = async (chatHistory, prompt) => {
  try {
    const messages=chatHistory.map(([role,content])=>({
      role,
      content
    }));
    messages.push({role:'user',content:prompt});
    const messageStr=JSON.stringify(messages)
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3',
        prompt: messageStr,
        stream: false
      })
    });
    const data = await response.json();
    chatHistory.push(['user',prompt]);
    chatHistory.push(['AI Model',data.response])
    return data.response;
  } catch (error) {
    console.error('Error:', error);
    return null; // or handle the error as needed
  }
};

// exports.getResponseFromChatGPT = async (chatHistory, prompt) => {
//   try {
//     const chatGPT=new OpenAI({
//       key,
//       baseURL: `https://${resource}.openai.azure.com/openai/deployments/${model}`,
//       defaultQuery: { "api-version": apiVersion },
//       defaultHeaders: { "api-key": key },
//     });
//     const messages=chatHistory.map(([role,content])=>({
//       role,
//       content
//     }));
//     messages.push({role:'user',content:prompt});
//     const response = await chatGPT.chat.completions.create({
//       model,
//       messages: messages,
//     });
//     const responseText=response.choices[0].message.content;
//     chatHistory.push(['user',prompt]);
//     chatHistory.push(['assistant',responseText])
//     return responseText;
//   } catch (error) {
//     console.error("OpenAI API 请求失败:", error.message);
//     // 抛出自定义错误信息
//     throw new Error("ChatGPT 連接失敗");
//   }
// };
