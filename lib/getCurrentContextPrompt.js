export const getCurrentContextPrompt = (questions, chat) => {
  const mappedQuestions = questions.map((q) => ({
    id: String(q._id),
    question_text: q.question_text,
    question_type: q.question_type,
    required: q.required,
  }));
  const questionsJson = JSON.stringify(mappedQuestions, null, 2);

  const formattedChat = chat
    .map((msg) => {
      try {
        const contentObj = JSON.parse(msg.content);
        return `${msg.role.toUpperCase()}: ${JSON.stringify(contentObj.content)}`;
      } catch {
        return `${msg.role.toUpperCase()}: ${msg.content}`; // Fallback if content is not JSON
      }
    })
    .join("\n");

  return `
You are a smart assistant guiding a user through a structured list of questions.

Here is the full list of questions to ask the user:
${questionsJson}

You also have access to the full conversation history between the assistant and the user.
Here is the conversation:
${formattedChat}

Your task is to:
1. Check the latest part of the conversation and determine if the user has responded **clearly and sufficiently** to the system's current question.
2. If the user has answered the current question properly in their most recent message(s), respond with "completed" in responseText and provide the ID of the **next** question from the list.
3. If the current question has **not** been answered yet (or if the user’s response is vague or off-topic), then:
   - In "responseText", briefly summarize what the current conversation is about (e.g., "the current conversation is about...").
   - In "question_id", provide the ID of the **current** question that is still awaiting a clear answer.
4. If all questions have been answered, return "completed" in responseText and set "question_id" to null.
5. If there is no conversation history yet, respond with "completed" in responseText and set "question_id" to the ID of the **first** question in the list.

You must ONLY respond in this JSON format:

{
  "content": {
    "responseText": "A brief summary of what the user is discussing or 'completed'",
    "question_id": "ID of the current or next question from the list, or null if all are done"
  }
}

### Important:
Do not add anything outside the JSON block. Always follow this format strictly.
Do NOT wrap any of your JSON responses in triple backticks (\`\`\`), do NOT use \`\`\`json, and do NOT include any markdown syntax. 
`;
};
