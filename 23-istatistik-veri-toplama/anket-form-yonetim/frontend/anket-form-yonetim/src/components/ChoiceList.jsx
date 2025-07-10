import React from 'react';

const ChoiceList = ({ choices, onChoiceDelete, canModify = true }) => {
  if (!choices || choices.length === 0) {
    return <p className="text-sm text-gray-500 ml-4">Bu soruya henüz seçenek eklenmemiş.</p>;
  }

  return (
    <ul className="ml-4 mt-2 space-y-1">
      {choices.map(choice => (
        <li
          key={choice.id}
          className="flex justify-between items-center text-sm text-gray-600"
        >
          <span>• {choice.choiceText || choice.text}</span>
          {canModify && (
            <button
              onClick={() => onChoiceDelete(choice.id)}
              className="text-red-400 hover:text-red-600 text-xs"
            >
              Sil
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ChoiceList; 