import { findQuestionsByEquipment, createInteraction, findAllInteractions, findInteractionById } from "./services.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { interactionResponseDTO, paginatedInteractionsDTO } from "./dtos/interactionDTO.js";
import { productsDto } from "../Products/dtos.js";
import { findProductsByEquipmentId } from "../Products/services.js";

export const getLLMQuestionsController = async (equipmentId) => {
  const questions = equipmentId ? await findQuestionsByEquipment(equipmentId) : await findAllQuestions();
  return questions || [];
};

export const addInteractionController = async (equipmentDetails, finalLLMResponse, user_name, user_email) => {
  const responses = finalLLMResponse
    .map(({ question_id, user_response }) => {
      const matchedQuestion = equipmentDetails.questions.find((q) => q._id.toString() === question_id.toString());
      if (!matchedQuestion) return null;
      return {
        question_id: matchedQuestion._id,
        question_snapshot: {
          question_text: matchedQuestion.question_text,
          question_type: matchedQuestion.question_type,
          required: matchedQuestion.required || false,
          youtube_link: matchedQuestion.youtube_link || "",
          options: matchedQuestion.options || [],
          allowMultipleSelection: matchedQuestion.allowMultipleSelection || false,
        },
        user_response,
      };
    })
    .filter(Boolean);

  const interactionPayload = {
    equipment_id: equipmentDetails._id,
    user_name,
    user_email,
    equipment_snapshot: {
      name: equipmentDetails.name,
    },
    industry_id: equipmentDetails.industry_id._id,
    industry_snapshot: {
      name: equipmentDetails.industry_id.name,
    },
    responses,
  };

  const interaction = await createInteraction(interactionPayload);
  return interaction;
};

export const getLLMInteractionsController = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const { equipment_id, user_email } = req.query;

  const { interactions, total } = await findAllInteractions(page, limit, equipment_id, user_email);

  const pagination = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };

  const formattedResponse = paginatedInteractionsDTO(interactions, pagination);

  return res.status(200).json({
    message: "Interactions fetched successfully",
    data: formattedResponse,
  });
});

export const getInteractionByIdController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const interaction = await findInteractionById(id);

  const formattedResponse = interactionResponseDTO(interaction);

  return res.status(200).json({
    message: "Interaction fetched successfully",
    data: formattedResponse,
  });
});

export const getProductsByEquipmentController = async (equipmentId) => {
  const products = await findProductsByEquipmentId(equipmentId);
  console.log("products", products);
  return productsDto(products);
};
