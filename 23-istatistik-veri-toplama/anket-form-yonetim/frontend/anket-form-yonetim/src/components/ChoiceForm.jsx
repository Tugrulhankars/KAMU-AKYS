import React, { useState } from 'react';

const ChoiceForm = ({ onChoiceAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onChoiceAdd({ text });
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="ml-4 mt-2 flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Yeni seçenek ekle..."
        className="flex-grow text-sm shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
      >
        Ekle
      </button>
    </form>
  );
};

export default ChoiceForm; 