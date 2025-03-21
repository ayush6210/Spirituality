import React, { useState } from 'react';
import "./Quiz.css";
import Certificate from './Certificate'; // Import the Certificate component

const questions = [
  { 
    question: "What is the primary teaching of most spiritual traditions regarding human life?",
    options: ["To accumulate wealth", "To enjoy material pleasures", "To seek self-realization and enlightenment", "To follow worldly desires"],
    answer: "To seek self-realization and enlightenment"
  },
  { 
    question: "Which of the following is a major argument against the existence of God?",
    options: ["The presence of order in the universe", "The complexity of living beings", "The existence of suffering and evil", "The belief in divine justice"],
    answer: "The existence of suffering and evil"
  },
  { 
    question: "What is the fundamental law that explains why bad things happen to good people?",
    options: ["Law of attraction", "Law of karma", "Law of coincidence", "Law of evolution"],
    answer: "Law of karma"
  },
  {
    question: "According to spiritual philosophy, what is material nature composed of?",
    options: ["Time, energy, and emotions", "Earth, water, fire, air, and ether", "Science and technology", "Energy and thoughts"],
    answer: "Earth, water, fire, air, and ether"
  },
  {
    question: "What is the goal of the soul in spiritual teachings?",
    options: ["To achieve enlightenment and liberation", "To enjoy material comforts", "To attain a high social status", "To live a long life"],
    answer: "To achieve enlightenment and liberation"
  },
  {
    question: "Which of the following is a key characteristic of spirituality?",
    options: ["Blindly following rituals", "Seeking self-awareness and universal truths", "Focusing only on religious texts", "Rejecting modern science"],
    answer: "Seeking self-awareness and universal truths"
  },
  {
    question: "Which of these actions is considered spiritual progress?",
    options: ["Helping others selflessly", "Collecting expensive items", "Seeking revenge", "Ignoring ethical principles"],
    answer: "Helping others selflessly"
  },
  {
    question: "Who is responsible for shaping our destiny, according to spiritual beliefs?",
    options: ["Only fate", "Our past and present actions (karma)", "Random chance", "Government policies"],
    answer: "Our past and present actions (karma)"
  },
  {
    question: "What is the meaning of the phrase 'Who am I?' in spiritual inquiry?",
    options: ["A question about one's social identity", "A quest to understand one's true self beyond the body and mind", "A way to find one's family roots", "A question about physical appearance"],
    answer: "A quest to understand one's true self beyond the body and mind"
  },
  {
    question: "What is the core difference between religion and spirituality?",
    options: ["Religion follows a set doctrine, while spirituality focuses on personal experience", "Religion is always true, while spirituality is false", "Spirituality is only for monks and saints", "Religion is superior to spirituality"],
    answer: "Religion follows a set doctrine, while spirituality focuses on personal experience"
  },
  // Add the remaining questions as needed...
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false); // Track when to show the certificate

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestion]?.answer) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
      // Check if the score is 90% or higher, and show the certificate component
      if (score >= 0.9 * questions.length) {
        setShowCertificate(true);
      }
    }
  };

  return (
    <div className="quiz-container">
      {showCertificate ? (
        // Show the Certificate component if the score is 90% or higher
        <Certificate score={(score / questions.length) * 100} />
      ) : showScore ? (
        <div className="score-section">
          <h2>Your Score: {score} / {questions.length} <br>
          </br>
          <br>
         </br>
          Better Luck Next Time!
          </h2>
        </div>
      ) : (
        questions[currentQuestion] && (
          <div className="question-section">
            <h2>{questions[currentQuestion].question}</h2>
            <div className="options-container">
              {questions[currentQuestion].options.map((option, index) => (
                <button 
                  key={index} 
                  className={selectedOption === option ? "selected" : "option"}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button onClick={handleNextQuestion} disabled={!selectedOption} className="next-button">
              Next
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default Quiz;
