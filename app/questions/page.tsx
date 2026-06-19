import { QuestionWithRelations } from "@/types/prisma";

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

export default async function QuestionsPage(){
    const result = await getQuestions();
    const questions = result.data;

    return(
        <div>
            <h1>Questions</h1>


            {questions.map((q) => (
                <div key={q.id}>
                    <h3>{q.title}</h3>

                    <ul>
                        {q.options.map((opt) =>(
                            <li key={opt.id}>
                                {opt.text}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}