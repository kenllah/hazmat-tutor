import React, { useState } from 'react';
import image1 from './image1.svg';
import image2 from './image2.svg';
import image3 from './image3.svg';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, BookOpen, CheckCircle2 } from "lucide-react";

const HazmatTutor = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [score, setScore] = useState(0);

  const sections = [
    {
      title: "Parking Rules for Explosives (Division 1.1, 1.2, 1.3)",
      content: `Never park within five feet of the traveled part of the road. Except for brief operational needs, don't park within 300 feet of:
        • Bridges, tunnels, or buildings
        • Places where people gather
        • Open fires`,
      diagram: "/api/placeholder/400/300", 
      diagramCaption: "Safe parking distances illustration for explosive materials",
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
      diagram: "/api/placeholder/400/300", 
      diagramCaption: "Proper vehicle attendance zones and positioning",
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
    },
    {
      title: "Emergency Signals and Route Restrictions",
      content: `• Never use burning signals (flares) around flammable liquids or explosives
        • Use reflective triangles or red electric lights instead
        • Follow route restrictions and obtain necessary permits
        • Avoid tunnels, bridges, and populated areas when placarded`,
      diagram: "/api/placeholder/400/300", 
      diagramCaption: "Proper emergency signaling equipment and placement",
      quiz: {
        question: "What should you use instead of flares for emergency signaling?",
        options: [
          "Burning fuses",
          "Matches",
          "Reflective triangles",
          "Smoke signals"
        ],
        correct: 2
      }
    }
  ];

  const handleAnswer = (questionIndex, selectedOption) => {
    if (selectedOption === sections[currentSection].quiz.correct) {
      setScore(score + 1);
    }
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          {sections[currentSection].title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Learning Content */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <pre className="whitespace-pre-wrap font-sans">
              {sections[currentSection].content}
            </pre>
          </div>

          {/* Diagram */}
          <div className="bg-white p-4 rounded-lg border">
            {currentSection === 0 && (
              <img src={image1} alt="Image for Section 1" />
            )}
            {currentSection === 1 && (
              <img src={image2} alt="Image 2" />
            )}
            {currentSection === 2 && (
              <img src={image3} alt="Image 3" />
            )}
            <p className="text-center text-gray-600 text-sm">
              {sections[currentSection].diagramCaption}
            </p>
          </div>

          {/* Quiz Section */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-4">Knowledge Check</h3>
            <p className="mb-4">{sections[currentSection].quiz.question}</p>
            <div className="space-y-2">
              {sections[currentSection].quiz.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(currentSection, index)}
                  className="w-full justify-start text-left"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div className="flex justify-between items-center">
            <div>
              Section {currentSection + 1} of {sections.length}
            </div>
            <div>
              Score: {score}/{sections.length}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HazmatTutor;
