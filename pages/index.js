import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

export default function HazmatTutor() {
  const [currentSection, setCurrentSection] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);

  const sections = [
    {
      title: "Parking Rules for Explosives (Division 1.1, 1.2, 1.3)",
      content: `Never park within five feet of the traveled part of the road. Except for brief operational needs, don't park within 300 feet of:
      • Bridges, tunnels, or buildings
      • Places where people gather
      • Open fires`,
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
      content: `The person attending a placarded vehicle must:
      • Be in the vehicle, awake, and not in the sleeper berth, or within 100 feet with clear view
      • Know the hazards of the materials
      • Know emergency procedures
      • Be able to move the vehicle if needed`,
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

  const handleAnswer = (selectedOption: number) => {
    setAnswered(selectedOption);
    
    setTimeout(() => {
      if (selectedOption === sections[currentSection].quiz.correct) {
        setScore(score + 1);
      }
      if (currentSection < sections.length - 1) {
        setCurrentSection(currentSection + 1);
        setAnswered(null);
      }
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <BookOpen className="h-6 w-6" />
            {sections[currentSection].title}
          </h1>
        </div>

        <div className="p-4 space-y-6">
          {/* Content Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="whitespace-pre-wrap font-sans">
              {sections[currentSection].content}
            </pre>
          </div>

          {/* Quiz Section */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-4">Knowledge Check</h3>
            <p className="mb-4">{sections[currentSection].quiz.question}</p>
            <div className="space-y-2">
              {sections[currentSection].quiz.options.map((option, index) => {
                const isCorrect = index === sections[currentSection].quiz.correct;
                const isSelected = answered === index;
                let buttonClasses = "w-full text-left px-4 py-2 rounded border ";
                
                if (answered !== null) {
                  if (isCorrect) {
                    buttonClasses += "bg-green-100 border-green-500 text-green-700 ";
                  } else if (isSelected) {
                    buttonClasses += "bg-red-100 border-red-500 text-red-700 ";
                  } else {
                    buttonClasses += "bg-white border-gray-200 ";
                  }
                } else {
                  buttonClasses += "bg-white hover:bg-gray-100 border-gray-200 ";
                }

                return (
                  <button
                    key={index}
                    onClick={() => answered === null && handleAnswer(index)}
                    className={buttonClasses}
                    disabled={answered !== null}
                  >
                    <div className="flex justify-between items-center">
                      <span>{option}</span>
                      {answered !== null && isCorrect && (
                        <span className="text-green-600">✓</span>
                      )}
                      {answered !== null && isSelected && !isCorrect && (
                        <span className="text-red-600">✗</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Progress and Score */}
          <div className="flex justify-between items-center border-t pt-4">
            <div className="text-gray-600">
              Section {currentSection + 1} of {sections.length}
            </div>
            <div className="text-gray-600">
              Score: {score}/{sections.length}
            </div>
          </div>

          {/* Completion Message */}
          {currentSection === sections.length - 1 && answered !== null && (
            <div className={`p-4 rounded-lg ${score === sections.length ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
              {score === sections.length 
                ? "Congratulations! You've completed the training with a perfect score!" 
                : `Training complete! You scored ${score} out of ${sections.length}. Consider reviewing the material and trying again for a better score.`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
