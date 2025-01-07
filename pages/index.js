import React, { useState } from 'react';

export default function HazmatTutor() {
  const [currentSection, setCurrentSection] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(null);

  const sections = [
    {
      title: "Parking Rules for Explosives (Division 1.1, 1.2, 1.3)",
      content: "Never park within five feet of the traveled part of the road. Except for brief operational needs, don't park within 300 feet of:\n• Bridges, tunnels, or buildings\n• Places where people gather\n• Open fires",
      quiz: {
        question: "How far must you park from bridges, tunnels, or buildings when carrying Division 1.1, 1.2, or 1.3 explosives?",
        options: [
          "100 feet",
          "200 feet",
          "300 feet",
          "500 feet"
        ],
        correct: 2
      }
    },
    {
      title: "Attending Parked Vehicles",
      content: "The person attending a placarded vehicle must:\n• Be in the vehicle, awake, and not in the sleeper berth, or within 100 feet with clear view\n• Know the hazards of the materials\n• Know emergency procedures\n• Be able to move the vehicle if needed",
      quiz: {
        question: "How far can an attendant be from their placarded vehicle?",
        options: [
          "50 feet with clear view",
          "100 feet with clear view",
          "150 feet with clear view",
          "200 feet with clear view"
        ],
        correct: 1
      }
    }
  ];

  const handleAnswer = (selectedOption) => {
    setAnswered(selectedOption);
    
    if (selectedOption === sections[currentSection].quiz.correct) {
      setScore(score + 1);
    }
    if (currentSection < sections.length - 1) {
      setTimeout(() => {
        setCurrentSection(currentSection + 1);
        setAnswered(null);
      }, 1000);
    }
  };

  const currentQuiz = sections[currentSection].quiz;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="bg-white rounded shadow p-6">
        <h1 className="text-xl font-bold mb-4">
          {sections[currentSection].title}
        </h1>

        <div className="bg-gray-100 p-4 rounded mb-6 whitespace-pre-line">
          {sections[currentSection].content}
        </div>

        <div className="mb-6">
          <h2 className="font-bold mb-2">Knowledge Check:</h2>
          <p className="mb-4">{currentQuiz.question}</p>
          
          <div className="space-y-2">
            {currentQuiz.options.map((option, index) => (
              <button
                key={index}
                onClick={() => answered === null && handleAnswer(index)}
                className={`w-full p-3 text-left rounded border ${
                  answered === null 
                    ? 'hover:bg-gray-100' 
                    : index === currentQuiz.correct
                    ? 'bg-green-100 border-green-500'
                    : answered === index
                    ? 'bg-red-100 border-red-500'
                    : ''
                }`}
                disabled={answered !== null}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Question {currentSection + 1} of {sections.length}</span>
          <span>Score: {score}/{sections.length}</span>
        </div>

        {currentSection === sections.length - 1 && answered !== null && (
          <div className="mt-4 p-4 bg-blue-100 rounded">
            Final Score: {score} out of {sections.length}
          </div>
        )}
      </div>
    </div>
  );
}
