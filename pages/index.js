import React, { useState } from 'react';
import { BookOpen, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

interface Section {
  title: string;
  content: string;
  quiz: QuizQuestion;
}

export default function HazmatTutor() {
  const [currentSection, setCurrentSection] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);

  const sections: Section[] = [
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
    
    // Delay the transition to next section to show feedback
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

  const progress = ((currentSection + 1) / sections.length) * 100;

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          {sections[currentSection].title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Learning Content */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <pre className="whitespace-pre-wrap font-sans">
            {sections[currentSection].content}
          </pre>
        </div>

        {/* Quiz Section */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-semibold mb-4">Knowledge Check</h3>
          <p className="mb-4">{sections[currentSection].quiz.question}</p>
          <div className="space-y-2">
            {sections[currentSection].quiz.options.map((option, index) => {
              const isCorrect = index === sections[currentSection].quiz.correct;
              const isSelected = answered === index;
              let buttonStyle = "w-full text-left px-4 py-2 rounded border";
              
              if (answered !== null) {
                if (isCorrect) {
                  buttonStyle += " bg-green-100 border-green-500";
                } else if (isSelected) {
                  buttonStyle += " bg-red-100 border-red-500";
                } else {
                  buttonStyle += " bg-white border-gray-200";
                }
              } else {
                buttonStyle += " bg-white hover:bg-gray-100 border-gray-200";
              }

              return (
                <button
                  key={index}
                  onClick={() => answered === null && handleAnswer(index)}
                  className={buttonStyle}
                  disabled={answered !== null}
                  aria-label={`${option}${isCorrect ? ' (Correct answer)' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {answered !== null && isCorrect && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    {answered !== null && isSelected && !isCorrect && (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Progress and Score */}
        <div className="space-y-4">
          <Progress value={progress} className="w-full" />
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div>
              Section {currentSection + 1} of {sections.length}
            </div>
            <div>
              Score: {score}/{sections.length}
            </div>
          </div>
        </div>

        {currentSection === sections.length - 1 && answered !== null && (
          <Alert className={score === sections.length ? "bg-green-50" : "bg-blue-50"}>
            <AlertDescription>
              {score === sections.length 
                ? "Congratulations! You've completed the training with a perfect score!" 
                : `Training complete! You scored ${score} out of ${sections.length}. Consider reviewing the material and trying again for a better score.`}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
