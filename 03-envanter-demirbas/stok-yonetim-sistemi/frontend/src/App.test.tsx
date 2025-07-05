import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">
          Stok Yönetim Sistemi
        </h1>
        <p className="text-gray-600 text-center">
          Sistem başarıyla çalışıyor! 🎉
        </p>
        <div className="mt-6 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <h3 className="text-sm font-medium text-blue-800">Backend API</h3>
            <p className="text-sm text-blue-600">http://localhost:5000</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <h3 className="text-sm font-medium text-green-800">Frontend</h3>
            <p className="text-sm text-green-600">http://localhost:3000</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 