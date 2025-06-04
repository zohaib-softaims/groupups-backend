export const trainingAiSnippetDto = (snippet) => {
  return {
    id: snippet._id,
    equipment_id: snippet.equipment_id,
    snippet_text: snippet.snippet_text,
    createdAt: snippet.createdAt,
    updatedAt: snippet.updatedAt,
  };
};

export const trainingAiSnippetsDto = (snippets) => {
  return snippets.map((snippet) => trainingAiSnippetDto(snippet));
};
