import { QuestionWithRelations } from "@/types/prisma";

async function getQuestions() {
  const res = await fetch(
    "http://localhost:3000/api/questions?category=IDEOLOGICAL",
    { cache: "no-store" }
  );

  const data = await res.json();

  return data.data;
}

export default async function IdeologicalPage() {
  const questions: QuestionWithRelations[] = await getQuestions();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">سوالات عقیدتی</h1>

      {questions.map((q) => (
        <div
          key={q.id}
          className="bg-gray-800 p-6 rounded-xl border border-gray-700"
        >
          <h2 className="text-lg font-bold text-white mb-4">
            {q.title}
          </h2>

          <ul className="space-y-2">
            {q.options.map((option) => (
              <li
                key={option.id}
                className={`p-2 rounded ${
                  option.isCorrect
                    ? "bg-green-600/30 border border-green-500"
                    : "bg-gray-700"
                }`}
              >
                {option.text}
              </li>
            ))}
          </ul>

          {q.explanation && (
            <p className="mt-4 text-gray-300 text-sm">
              توضیح: {q.explanation}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
