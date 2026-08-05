import { DEPARTMENTS as ALL_DEPARTMENTS } from "@/constants/departments";
import type { ReviewTemplate } from "@/types/template";

export const mockReviewTemplates: ReviewTemplate[] = [
  {
    templateId: "TPL001",
    title: "Standard Staff Review v3",
    description: "Core KPI/OKR and core-value self-assessment used for all confirmed staff.",
    assignedDepartments: ALL_DEPARTMENTS,
    status: "Active",
    sections: [
      {
        sectionId: "TPL001-S1",
        title: "KPI & OKR",
        description: "Weighted key results for this review period.",
        questions: [
          { questionId: "TPL001-Q1", type: "kpi_okr", text: "Primary KPI / OKR", required: true, respondent: "employee", weightage: 60 },
          { questionId: "TPL001-Q2", type: "kpi_okr", text: "Secondary KPI / OKR", required: true, respondent: "employee", weightage: 40 },
          { questionId: "TPL001-Q3", type: "percentage", text: "Overall target achievement", required: true, respondent: "employee" },
          { questionId: "TPL001-Q4", type: "file_upload", text: "Supporting evidence", required: false, respondent: "employee" },
        ],
      },
      {
        sectionId: "TPL001-S2",
        title: "Core Values",
        description: "Rate each core value and share behaviour examples.",
        questions: [
          { questionId: "TPL001-Q5", type: "core_value_rating", text: "Integrity", required: true, respondent: "employee", ratingScaleMax: 5 },
          { questionId: "TPL001-Q6", type: "long_text", text: "Integrity — behaviour notes", required: false, respondent: "employee" },
          { questionId: "TPL001-Q7", type: "core_value_rating", text: "Customer Focus", required: true, respondent: "employee", ratingScaleMax: 5 },
          { questionId: "TPL001-Q8", type: "long_text", text: "Customer Focus — behaviour notes", required: false, respondent: "employee" },
        ],
      },
      {
        sectionId: "TPL001-S3",
        title: "Self Reflection",
        questions: [
          { questionId: "TPL001-Q9", type: "short_text", text: "One achievement you're proud of", required: true, respondent: "employee" },
          { questionId: "TPL001-Q10", type: "long_text", text: "Biggest challenge this period", required: true, respondent: "employee" },
          { questionId: "TPL001-Q11", type: "rating_scale", text: "How supported did you feel this period?", required: true, respondent: "employee", ratingScaleMax: 5 },
          { questionId: "TPL001-Q12", type: "number", text: "Training hours completed", required: false, respondent: "employee" },
          { questionId: "TPL001-Q13", type: "dropdown", text: "Interested in a role change?", required: false, respondent: "employee", options: ["Yes", "No", "Maybe"] },
        ],
      },
      {
        sectionId: "TPL001-S4",
        title: "Manager Evaluation",
        questions: [
          { questionId: "TPL001-Q14", type: "short_text", text: "Key strengths", required: true, respondent: "manager" },
          { questionId: "TPL001-Q15", type: "long_text", text: "Areas for improvement", required: true, respondent: "manager" },
          { questionId: "TPL001-Q16", type: "rating_scale", text: "Overall manager rating", required: true, respondent: "manager", ratingScaleMax: 5 },
          { questionId: "TPL001-Q17", type: "dropdown", text: "Final recommendation", required: true, respondent: "manager", options: ["Exceeds Expectations", "Meets Expectations", "Needs Improvement"] },
          { questionId: "TPL001-Q18", type: "long_text", text: "Review meeting notes", required: false, respondent: "manager" },
        ],
      },
    ],
  },
  {
    templateId: "TPL002",
    title: "Manager & Leadership Review",
    description: "Extended review for people managers, adds leadership and coaching competencies.",
    assignedDepartments: ALL_DEPARTMENTS,
    status: "Active",
    sections: [
      {
        sectionId: "TPL002-S1",
        title: "Leadership Competencies",
        questions: [
          { questionId: "TPL002-Q1", type: "rating_scale", text: "Coaches and develops team members", required: true, respondent: "employee", ratingScaleMax: 5 },
          { questionId: "TPL002-Q2", type: "rating_scale", text: "Sets clear direction and priorities", required: true, respondent: "employee", ratingScaleMax: 5 },
          { questionId: "TPL002-Q3", type: "long_text", text: "Describe a decision you're proud of this period", required: true, respondent: "employee" },
        ],
      },
      {
        sectionId: "TPL002-S2",
        title: "Core Values",
        questions: [
          { questionId: "TPL002-Q4", type: "core_value_rating", text: "Ownership", required: true, respondent: "employee", ratingScaleMax: 5 },
          { questionId: "TPL002-Q5", type: "core_value_rating", text: "Collaboration", required: true, respondent: "employee", ratingScaleMax: 5 },
        ],
      },
      {
        sectionId: "TPL002-S3",
        title: "Team Outcomes",
        questions: [
          { questionId: "TPL002-Q6", type: "kpi_okr", text: "Team OKR delivery", required: true, respondent: "employee", weightage: 100 },
          { questionId: "TPL002-Q7", type: "number", text: "Team attrition (headcount)", required: false, respondent: "employee" },
        ],
      },
      {
        sectionId: "TPL002-S4",
        title: "Manager Evaluation",
        questions: [
          { questionId: "TPL002-Q8", type: "long_text", text: "Areas for improvement", required: true, respondent: "manager" },
          { questionId: "TPL002-Q9", type: "dropdown", text: "Final recommendation", required: true, respondent: "manager", options: ["Exceeds Expectations", "Meets Expectations", "Needs Improvement"] },
        ],
      },
    ],
  },
  {
    templateId: "TPL003",
    title: "Probation Review (3-Month)",
    description: "Shortened review for staff still within their probation period.",
    assignedDepartments: ["Procurement", "Engineering"],
    status: "Inactive",
    sections: [
      {
        sectionId: "TPL003-S1",
        title: "Onboarding Progress",
        questions: [
          { questionId: "TPL003-Q1", type: "short_text", text: "Key task completed so far", required: true, respondent: "employee" },
          { questionId: "TPL003-Q2", type: "rating_scale", text: "Confidence in role so far", required: true, respondent: "employee", ratingScaleMax: 5 },
        ],
      },
      {
        sectionId: "TPL003-S2",
        title: "Manager Evaluation",
        questions: [
          { questionId: "TPL003-Q3", type: "dropdown", text: "Confirmation recommendation", required: true, respondent: "manager", options: ["Confirm", "Extend Probation", "Do Not Confirm"] },
          { questionId: "TPL003-Q4", type: "long_text", text: "Manager comments", required: false, respondent: "manager" },
        ],
      },
    ],
  },
  {
    templateId: "TPL004",
    title: "Sales Incentive Review",
    description: "Sales-specific KPI template scoring quota attainment and pipeline quality.",
    assignedDepartments: ["Sales & Partnerships"],
    status: "Inactive",
    sections: [
      {
        sectionId: "TPL004-S1",
        title: "Quota Attainment",
        questions: [
          { questionId: "TPL004-Q1", type: "percentage", text: "Quota attainment this quarter", required: true, respondent: "employee" },
          { questionId: "TPL004-Q2", type: "kpi_okr", text: "Pipeline generated (RM)", required: true, respondent: "employee", weightage: 100 },
        ],
      },
      {
        sectionId: "TPL004-S2",
        title: "Manager Evaluation",
        questions: [
          { questionId: "TPL004-Q3", type: "rating_scale", text: "Deal quality rating", required: true, respondent: "manager", ratingScaleMax: 5 },
          { questionId: "TPL004-Q4", type: "dropdown", text: "Final recommendation", required: true, respondent: "manager", options: ["Exceeds Expectations", "Meets Expectations", "Needs Improvement"] },
        ],
      },
    ],
  },
];
