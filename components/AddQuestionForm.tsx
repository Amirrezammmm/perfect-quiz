"use client";

import { useState } from "react";

export default function AddQuestionForm({ onSuccess }: { onSuccess: () => void }) {
  const [title, setTitle] = useState("");
  const [explanation, setExplanation] = useState("");
  const [category, setCategory] = useState("GENERAL");
  const [options, setOptions] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);

  const addOption = () => {
    setOptions([...options, { text: "", isCorrect: false }]);
  };

  const handleOptionChange = (index: number, text: string) => {
    const newOptions = [...options];
    newOptions[index].text = text;
    setOptions(newOptions);
  };

  const handleCorrectOption = (index: number) => {
    const newOptions = options.map((opt, i) => ({
      ...opt,
      isCorrect: i === index,
    }));
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch("/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, explanation, category, options }),
    });

    if (response.ok) {
      alert("سوال با موفقیت ثبت شد!");
      setTitle("");
      setExplanation("");
      setCategory("GENERAL")
      setOptions([{ text: "", isCorrect: false }, { text: "", isCorrect: false }]);
      onSuccess(); 
    } else {
      alert("خطا در ثبت سوال");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black">
      <div>
        <label htmlFor="title" className="block text-white">متن سوال:</label>
        <input
          id="title"
          className="w-full p-2 rounded bg-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="explanation" className="block text-white">توضیحات (پاسخ تشریحی):</label>
        <textarea
          id="explanation"
          className="w-full p-2 rounded bg-white"
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
        />
      </div>
      <div>
      <div>
      <label htmlFor="category" className="block text-white">دسته‌بندی سوال:</label>

      <select
        id="category"
        className="w-full p-2 rounded bg-white"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="GENERAL">عمومی</option>
        <option value="IDEOLOGICAL">عقیدتی</option>
        <option value="POLITICAL">سیاسی</option>
      </select>
    </div>

      </div>
      <div className="space-y-2">
        <label htmlFor="options" className="block text-white">گزینه‌ها:</label>
        {options.map((opt, index) => (
          <div key={index} className="flex gap-2 items-center bg-white rounded p-2">
            <input
              id="options"
              type="radio"
              checked={opt.isCorrect}
              onChange={() => handleCorrectOption(index)}
              required
            />
            <input
              className="flex-1 p-2 rounded"
              placeholder={`گزینه ${index + 1}`}
              value={opt.text}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addOption}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        + افزودن گزینه
      </button>

      <button
        type="submit"
        className="w-full bg-green-500 text-white px-4 py-2 rounded font-bold hover:bg-green-600 transition"
      >
        ذخیره سوال
      </button>
    </form>
  );
}
