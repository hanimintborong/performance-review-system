import { error, grey, info, success, warning } from "@/constants/colors";
import type {
  ReviewPlanStatus,
  ReviewStatus,
  ReviewTemplateStatus,
} from "@/types/review";

export type StatusStyle = { bg: string; fg: string; dot: string };

const styleOf = (scale: { 10: string; 50: string; 70: string }): StatusStyle => ({
  bg: scale[10],
  fg: scale[70],
  dot: scale[50],
});

const neutral: StatusStyle = { bg: grey[10], fg: grey[70], dot: grey[40] };

export const REVIEW_STATUS_STYLE: Record<ReviewStatus, StatusStyle> = {
  "Not Started": neutral,
  "Self-Assessment In Progress": styleOf(info),
  "Employee Submitted": styleOf(info),
  "Manager Reviewing": styleOf(warning),
  "Manager Submitted": styleOf(info),
  "Awaiting Discussion": styleOf(warning),
  "Awaiting HR Review": styleOf(warning),
  "Awaiting Management Review": styleOf(warning),
  Finalised: styleOf(success),
  Overdue: styleOf(error),
};

export const PLAN_STATUS_STYLE: Record<ReviewPlanStatus, StatusStyle> = {
  Draft: neutral,
  Active: styleOf(success),
  Inactive: neutral,
  Archived: neutral,
};

export const TEMPLATE_STATUS_STYLE: Record<ReviewTemplateStatus, StatusStyle> = {
  Active: styleOf(success),
  Inactive: neutral,
};
