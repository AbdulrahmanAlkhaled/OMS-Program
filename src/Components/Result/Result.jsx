import './Result.scss';
import { useState, useEffect } from "react";

const Result = ({totalQuestions, result, onTryAgain}) => {

      const [name, setName] = useState('');
      const [HighScores, setHighScores] = useState([]);
      const [showScores, setShowScores] = useState(false);
      const [ID, setID] = useState('');
      
  
      useEffect(() => {
        setHighScores(JSON.parse(localStorage.getItem('HighScores')) || []);
      }, [])
     
      const handleSave = () => {
  
          const score = {
            name,
            ID,
            score: result.score
          };

          const newHighScores = [...HighScores, score].sort((a, b) => b.score - a.score);
          setHighScores(newHighScores);
          setShowScores(true);
          localStorage.setItem('HighScores', JSON.stringify(newHighScores));
      };

      const handleTryAgain = () => {
          setShowScores(false);
          setHighScores([]);
          onTryAgain();
      }

    return(
        <div className="result">
          <h3>Result</h3>
          <p>
            Total Questions: <span>{totalQuestions}</span>
          </p>
          <p>
            Total Score: <span>{result.score}</span>
          </p>
          <p>
            Correct Answers: <span>{result.correctAnswers}</span>
          </p>
          <p>
           Wrong Answers: <span>{result.wrongAnswers}</span>
          </p>
          <button onClick={handleTryAgain}>Try again</button>
          {!showScores ? <>
          <h3>Enter your Full name & ID <br/> to save your score!
          </h3>
         
           <input  required  
          placeholder='Full name'
           value={name} onChange={(evt) => setName(evt.target.value)} />
           <input  required   
          placeholder='ID'
           value={ID} onChange={(evt) => setID(evt.target.value)} />
           <button  disabled={ name === "" || ID === "" }  onClick={handleSave}>Save</button>
          </>: <>
          <table border={1}>
            <thead>
                <tr bgcolor="lightgrey" align="center">
                <th>Ranking</th>
                <th>Name</th>
                <th>ID</th>
                <th>Score</th>
                </tr>
                </thead>
                <tbody>
                    {HighScores.map((highScore, i) => {
                    return(
                    <tr key={`${highScore.score}${highScore.name}${highScore.ID}${i}`} align="center">
                      <td>{i + 1}</td>
                        <td>{highScore.name}</td>
                        <td>{highScore.ID}</td>
                        <td>{highScore.score}</td>
                    </tr>
                    )
                    })
                }
                </tbody>
          </table>
          </>
          } 
         </div>
         );
    
}
export default Result;