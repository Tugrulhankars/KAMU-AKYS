import React, { useState } from 'react';

const QuestionForm = ({ onQuestionAdd }) => {
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('TEXT');
  const [choices, setChoices] = useState(['']);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    
    const questionData = {
      questionText: questionText.trim(),
      questionType: questionType
    };

    // Çoktan seçmeli sorular için seçenekleri ekle
    if (questionType === 'MULTIPLE_CHOICE') {
      const validChoices = choices.filter(choice => choice.trim() !== '');
      if (validChoices.length > 0) {
        questionData.choices = validChoices;
      }
    }

    onQuestionAdd(questionData);
    setQuestionText('');
    setQuestionType('TEXT');
    setChoices(['']);
  };

  const addChoice = () => {
    setChoices([...choices, '']);
  };

  const removeChoice = (index) => {
    if (choices.length > 1) {
      setChoices(choices.filter((_, i) => i !== index));
    }
  };

  const updateChoice = (index, value) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg border">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Yeni Soru Ekle</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Soru Metni */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Soru Metni
          </label>
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Sorunuzu yazın..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Soru Tipi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Soru Tipi
          </label>
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="TEXT">Açık Uçlu (Metin)</option>
            <option value="MULTIPLE_CHOICE">Çoktan Seçmeli</option>
          </select>
        </div>

        {/* Çoktan Seçmeli Seçenekleri */}
        {questionType === 'MULTIPLE_CHOICE' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seçenekler
            </label>
            <div className="space-y-2">
              {choices.map((choice, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 w-8">
                    {String.fromCharCode(65 + index)})
                  </span>
                  <input
                    type="text"
                    value={choice}
                    onChange={(e) => updateChoice(index, e.target.value)}
                    placeholder={`${index + 1}. seçenek`}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {choices.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeChoice(index)}
                      className="text-red-500 hover:text-red-700 font-semibold"
                    >
                      Sil
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <button
              type="button"
              onClick={addChoice}
              className="mt-2 text-blue-600 hover:text-blue-800 font-semibold text-sm"
            >
              + Seçenek Ekle
            </button>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:shadow-outline transition-colors"
          >
            Soru Ekle
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm; 