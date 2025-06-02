export const questionDto = (question) => {
  const base = {
    id: question._id,
    equipment_id: question.equipment_id,
    question_type: question.question_type,
    required: question.required,
    youtube_link: question.youtube_link,
    question_text: question.question_text,
    context: question.context || [],
    created_at: question.createdAt,
    updated_at: question.updatedAt,
  };

  if (question.question_type === "multiple_choice") {
    return {
      ...base,
      options: question.options,
      allowMultipleSelection: question.allowMultipleSelection,
    };
  }

  return base;
};

export const questionsDto = (questions) => questions.map(questionDto);
