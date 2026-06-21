import { QuestionWithRelations } from "@/types/prisma";
import QuestionPageHeader from "@/components/QuestionPageHeader";

type QuestionsResponse = {
    success: boolean;
    data: QuestionWithRelations[];
}
async function getQuestions(): Promise<QuestionsResponse> {
  const res = await fetch("http://localhost:3000/api/questions", {
    cache: "no-store",
  });

  return res.json();
}

export default async function QuestionsPage() {
    const result = await getQuestions();
    const questions = result.data;

    return (
        <main className="min-h-screen bg-gray-900 p-8 text-white rounded-2xl">
            <div className="max-w-4xl mx-auto">
                  
                <QuestionPageHeader />

                
                <div className="space-y-6">
                    {questions.map((q) => (
                        <div key={q.id} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                            <h3 className="text-xl font-semibold mb-4 text-purple-300">{q.title}</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {q.options.map((opt) => (
                                    <li 
                                        key={opt.id} 
                                        className={`p-3 rounded-lg border ${
                                            opt.isCorrect 
                                            ? "border-green-500 bg-green-500/10 text-green-400" 
                                            : "border-gray-600 bg-gray-700/50 text-gray-300"
                                        }`}
                                    >
                                        {opt.text}
                                        {opt.isCorrect && " ✓"}
                                    </li>
                                ))}
                            </ul>
                            {q.explanation && (
                                <p className="mt-4 text-sm text-gray-400 italic">
                                    توضیح: {q.explanation}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}