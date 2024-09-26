import { IBusiness } from "../models";

enum BusinessStatus {
  New = "New",
  MarketApproved = "Market Approved",
  SalesApproved = "Sales Approved",
  MarketDeclined = "Market Declined",
  SalesDeclined = "Sales Declined",
}

interface RequiredData {
  required: string[];
  description: string;
}

export const getNextRequiredData = (business: IBusiness): RequiredData => {
  switch (business.status) {
    case BusinessStatus.New:
      return {
        required: ["classification"],
        description:
          'Provide classification with bureau "WCIRB" and classCode "9079" or "8078" to move to Market Approved.',
      };
    case BusinessStatus.MarketApproved:
      return {
        required: ["phoneNumber", "xMod"],
        description: "Provide phone number and xMod to move to Sales Approved.",
      };
    case BusinessStatus.SalesApproved:
      return {
        required: [],
        description: "No further data required. Process is complete.",
      };
    case BusinessStatus.MarketDeclined:
    case BusinessStatus.SalesDeclined:
      return {
        required: [],
        description: "Business has been declined. No further data required.",
      };
    default:
      console.error(`Unknown status: ${business.status}`);
      return {
        required: [],
        description: "Unknown status.",
      };
  }
};
