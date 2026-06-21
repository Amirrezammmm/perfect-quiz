"use client";

import { useState } from "react";
import AddQuestionForm from "./AddQuestionForm";

export default function QuestionPageHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">بانک سوالات</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-purple-700 transition"
        >
          + سوال جدید
        </button>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" 
        onClick={() => setIsOpen(false)}>
          <div className="bg-gray-800 p-6 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-700 shadow-2xl"
          onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">افزودن سوال جدید</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                ✕
              </button>
            </div>
            
            <AddQuestionForm onSuccess={() => {
              setIsOpen(false);
              window.location.reload(); 
            }} />
          </div>
        </div>
      )}
    </div>
  );
}
