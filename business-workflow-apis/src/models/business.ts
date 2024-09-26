import mongoose, { Document, Schema } from "mongoose";

export enum BusinessStatus {
  New = "New",
  MarketApproved = "Market Approved",
  MarketDeclined = "Market Declined",
  SalesApproved = "Sales Approved",
  SalesDeclined = "Sales Declined",
}

export interface Classification {
  bureau: string;
  classCode: string;
}

export interface IBusiness extends Document {
  FEIN: string;
  name: string;
  classification?: Classification;
  phoneNumber?: string;
  xMod?: number;
  status: BusinessStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

const BusinessSchema: Schema = new Schema(
  {
    FEIN: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v: string) {
          return /\d{9}/.test(v);
        },
        message: (props: { value: string }) =>
          `${props.value} is not a valid FEIN!`,
      },
    },
    name: {
      type: String,
      required: true,
    },
    classification: {
      bureau: { type: String },
      classCode: { type: String },
    },
    phoneNumber: {
      type: String,
      validate: {
        validator: function (v: string) {
          return /\d{10}/.test(v);
        },
        message: (props: { value: string }) =>
          `${props.value} is not a valid phone number!`,
      },
    },
    xMod: { type: Number },
    status: {
      type: String,
      enum: Object.values(BusinessStatus),
      default: BusinessStatus.New,
    },
  },
  {
    timestamps: true,
  }
);

BusinessSchema.index({ FEIN: 1 });
BusinessSchema.index({ status: 1 });

BusinessSchema.methods.getFullName = function () {
  return `${this.name} (${this.FEIN})`;
};

BusinessSchema.statics.findByStatus = function (status: BusinessStatus) {
  return this.find({ status });
};

export const Business = mongoose.model<IBusiness>("Business", BusinessSchema);
