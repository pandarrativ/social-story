## Clone Repository

First, clone this repository to your local machine using the following command, then enter the folder:

```
git clone https://github.com/pandarrativ/social-story.git
cd social-story
```

## Frontend Setup

Open a terminal and Navigate to the frontend directory:

```
cd frontend
```

Install dependencies:

```
npm install
```

Start the frontend server:

```
npm start
```

## Backend Setup

Open a new terminal in social story folder and navigate to the backend directory:

```
cd backend
```

Install dependencies:

```
npm install
```

Start the backend server:

```
npm run dev
```

## Connecting with LLM Model

To activate the connection with the LLM (Large Language Model) model, follow these steps:

1. Install Ollama from https://ollama.com/.
2. Open a terminal and run the following command to download the llama3 model:
```
ollama run llama3
```
3. After the model has been downloaded, close the terminal, open a new terminal and run
 ```
ollama run serve
```

