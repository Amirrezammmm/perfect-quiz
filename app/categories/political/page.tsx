import { QuestionWithRelations } from "@/types/prisma";
async function getQuestions() {
  const res = await fetch(
    "http://localhost:3000/api/questions?category=POLITICAL",
    { cache: "no-store" }
  );

  const data = await res.json();

  return data.data;
}

export default async function PoliticalPage() {
  const questions = await getQuestions();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">سوالات عقیدتی</h1>

      {questions.map((q: QuestionWithRelations ) => (
        <div key={q.id}>{q.title}</div>
      ))}
    </div>
  );
}