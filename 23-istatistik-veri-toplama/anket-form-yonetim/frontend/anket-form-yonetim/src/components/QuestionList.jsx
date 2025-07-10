import React from 'react';
import ChoiceList from './ChoiceList';
import ChoiceForm from './ChoiceForm';

const QuestionList = ({ questions, onQuestionDelete, onChoiceAdd, onChoiceDelete, canModify = true }) => {
  if (!questions || questions.length === 0) {
    return <p className="text-gray-500">Bu ankete henüz soru eklenmemiş.</p>;
  }

  return (
    <ul className="space-y-6">
      {questions.map(question => (
        <li
          key={question.id}
          className="bg-gray-50 p-4 rounded-md border border-gray-200"
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-gray-800 font-medium">{question.questionText || question.text}</span>
            {canModify && (
              <button
                onClick={() => onQuestionDelete(question.id)}
                className="text-red-500 hover:text-red-700 font-semibold text-sm"
              >
                Soruyu Sil
              </button>
            )}
          </div>
          
          <div className="border-t pt-2">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Cevap Seçenekleri:</h4>
            <ChoiceList 
              choices={question.choices} 
              onChoiceDelete={(choiceId) => onChoiceDelete(question.id, choiceId)}
              canModify={canModify}
            />
            {canModify && (
              <ChoiceForm 
                onChoiceAdd={(choiceData) => onChoiceAdd(question.id, choiceData)} 
              />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default QuestionList; 