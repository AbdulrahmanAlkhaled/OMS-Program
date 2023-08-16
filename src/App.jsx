import Quiz from "./Components/Quiz/Quiz.jsx";
import { useEffect, useState } from "react";

function App() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try{
         const response = await fetch(
          "https://64dd076ee64a8525a0f7853f.mockapi.io/questions"
          );
         const questionsResponse = await response.json();
         console.log(questionsResponse);
         setQuestions(questionsResponse);
    }catch (error) {
      console.log(error);
    }
  };

  return questions.length && <Quiz questions={questions} />;
}
export default App;
