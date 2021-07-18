# IBM-Text-To-Speech-Demo

This is a small project I made to test IBM Cloud Watson Services using Vue.js and FastApi.

## Stack and Services

- [React.js](https://reactjs.org/) v17.0.2
- [FastApi](https://fastapi.tiangolo.com/) v0.65.1
- [IBM Watson Text to Speech](https://www.ibm.com/cloud/watson-text-to-speech)
- [IBM Watson Language Translator](https://www.ibm.com/watson/services/language-translator/)

## Installation and Usage

### Backend

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install all dependencies (required to run the server)

```bash
cd backend
pip install -r requirements.txt
```

Once installed you can run the server with the following command

```bash
uvicorn app.main:app --reload
```

**Note: You need to provide your IBM Cloud Resources API credentials in a .env file in order to start the server**

```env
TEXT_TO_SPEECH_API_KEY='your key'
TEXT_TO_SPEECH_URL='your url'

TRANSLATOR_API_KEY='your key'
TRANSLATOR_URL='your url'
TRANSLATOR_VERSION='resource version'
```

### Frontend

Run the following command to install all dependencies

```bash
cd client
yarn
```

Once installed you can run the server with the following command

```bash
yarn serve
```

**You also need to add the API URL in a .env file to consume the services**

```env
REACT_APP_URL='host where the backend server is running'
```
