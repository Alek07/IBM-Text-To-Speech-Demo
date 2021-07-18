# IBM-Text-To-Speech-Demo

This is a small project We made to test IBM Cloud Watson Services using React.js and FastApi.

## Stack and Services

- [React.js](https://reactjs.org/) v17.0.2
- [FastApi](https://fastapi.tiangolo.com/) v0.65.1
- [Python](https://www.python.org/downloads/) v3.7+
- [IBM Watson Text to Speech](https://www.ibm.com/cloud/watson-text-to-speech)
- [IBM Watson Language Translator](https://www.ibm.com/watson/services/language-translator/)

## Installation and Usage

### Backend

Use the package manager [pipenv](https://pipenv.pypa.io/en/latest/) to install all dependencies (required to run the server)

```bash
cd backend
python -m pipenv install
python -m pipenv shell
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

You need [yarn](https://yarnpkg.com/) to run the server. Run the following commands to install all dependencies.

```bash
cd client
yarn
```

Once installed you can run the server with the following command

```bash
yarn start
```

**You also need to add the API URL in a .env file to consume the services**

```env
REACT_APP_URL='host where the backend server is running'/api/v1/text_to_speech
```
