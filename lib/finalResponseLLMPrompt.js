export const generateFinalLLMPrompt = (questions) => {
  const mappedQuestions = questions?.map((q) => ({
    id: String(q._id),
    question_text: q.question_text,
    question_type: q.question_type,
    required: q.required,
  }));
  const questionsJson = JSON.stringify(mappedQuestions, null, 2);

  return `
You are a smart assistant tasked with generating a structured final response based on a
full conversation between a user and an assistant.


### Objective:
Your job is to carefully read the assistant-user conversation and extract meaningful answers
 to a predefined set of questions.



### Instructions:
1. You will be provided with:
   - A list of questions (each with a unique \`_id\` and question_text and question_type and required)
   - A full user-assistant conversation log

2. For each question, locate the **user's answer** in the conversation and map it with the 
corresponding \`question_id\`.

3. Your output must include:
   - A **concise and meaningful summary** of the user’s answer (not raw transcript)
   - The **\`_id\` of the matched question**
   - The **user’s name and email** (if mentioned), or use “anonymous” if not found

---

### ⚙️ Response Format (Must follow this exactly):

Respond using only this JSON structure:

{
  "content": {
    "finalResponse": [
      {
        "question_id": "_id of the question from the provided list",
        "user_response": "Concise and meaningful summary of the user's answer"
      }
    ],
    "user_name": "Extracted name from the conversation or 'anonymous'",
    "user_email": "Extracted email from the conversation or 'anonymous'"
  }
}

---

### ❗Important Rules:
- **Do NOT** leave questions empty. If answer is not found, add user_response as "User skip this question"
- **Do NOT** invent answers. Only use what the user actually said or strongly implied.
---

### 📋 Questions List is:

${questionsJson}

`.trim();
};
