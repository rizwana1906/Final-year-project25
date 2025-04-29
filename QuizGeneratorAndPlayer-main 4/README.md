# QuizGeneratorAndPlayer

## Introduction
This Application uses Ml models (Roberta and T5) to take a PDF as input and generate a QuizBank.
User may chose to just get the list of Questions based on required Difficulty or Play the Quiz and get a Report.

## Usecases
Students - This is quite useful to those students who are learning from PDF's , as they can use this App to generate random MCQ Quiz
and play it to test their knowledge in the content they have studied

## Installation Manual

* Go to CMD and type in
  ``` git clone https://github.com/VSubhankar/QuizGeneratorAndPlayer.git ```
  ``` cd QuizGeneratorAndPlayer ```
  
* Install python (3.12 preferred) and npm for nodejs
* Configure the path for pip installer. ( following command should return the version )
  ``` pip -V ```
* Run the following commands one after another 
  ```
  pip install -r requirements.txt
  npm install
  npm audit fix --force
  git lfs install
  git clone https://huggingface.co/valhalla/t5-base-qg-hl src/components/model
  git clone https://huggingface.co/deepset/roberta-base-squad2 src/components/model
  ```

## How to Run
* Type in ``npm start``
* Open new terminal in src/components folder and type ``python backend.py``
  


## Attributes
This is made as part of final year project submission for Graduation.
This is made by Subhankar, Siddiq , Sai Teja and Sameer.
We have used HuggingFace Ml Models for Data Processing and Generation
