export const interactionResponseDTO = (interaction) => {
  return {
    id: interaction._id,
    user: {
      name: interaction.user_name,
      email: interaction.user_email,
    },
    equipment: {
      id: interaction.equipment_id?._id,
      name: interaction.equipment_snapshot?.name,
    },
    industry: {
      id: interaction.industry_id?._id,
      name: interaction.industry_snapshot?.name,
    },
    responses: interaction.responses.map((response) => ({
      question_id: response.question_id,
      question: {
        question_text: response.question_snapshot.question_text,
        question_type: response.question_snapshot.question_type,
        required: response.question_snapshot.required,
        youtube_link: response.question_snapshot.youtube_link,
        options: response.question_snapshot.options,
        allowMultipleSelection: response.question_snapshot.allowMultipleSelection,
      },
      user_response: response.user_response,
    })),
    created_at: interaction.createdAt,
    updated_at: interaction.updatedAt,
  };
};

export const paginatedInteractionsDTO = (interactions, pagination) => {
  return {
    interactions: interactions.map((interaction) => ({
      id: interaction._id,
      user: {
        name: interaction.user_name,
        email: interaction.user_email,
      },
      equipment: {
        name: interaction.equipment_snapshot?.name,
      },
      created_at: interaction.createdAt,
    })),
    pagination: {
      total: pagination.total,
      page: pagination.page,
      limit: pagination.limit,
      total_pages: pagination.totalPages,
    },
  };
};
