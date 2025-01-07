import React, { useState } from 'react';
import Image from 'next/image'; 
import image1 from '../public/image1.svg'; 
import image2 from '../public/image2.svg'; 
import image3 from '../public/image3.svg'; 

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
    <div>
      <h1>Hazmat Tutor</h1>
      <div className="section">
        <h2>{sections[currentSection].title}</h2>
        <p>{sections[currentSection].content}</p>
        <div>
          {currentSection === 0 && (
            <Image src={image1} alt="Image for Section 1" width={400} height={300} />
          )}
          {currentSection === 1 && (
            <Image src={image2} alt="Image for Section 2" width={400} height={300} />
          )}
          {currentSection === 2 && (
            <Image src={image3} alt="Image for Section 3" width={400} height={300} />
          )}
        </div>
        {/* ... (rest of your quiz and progress logic) ... */} 
      </div>
    </div>
  );
};

export default HazmatTutor;
