
export interface FaqItem {
  question: string;
  answer: string;
}

export const faqData: FaqItem[] = [
  {
    question: "How do I add a new lead?",
    answer: "To add a new lead, go to the Leads page and click the 'Add New Lead' button. Fill in the required information and click Save."
  },
  {
    question: "What does the AI score mean?",
    answer: "The AI score represents the likelihood of a lead converting to a customer based on our machine learning model. Higher scores indicate leads with better chances of conversion."
  },
  {
    question: "How can I export my data?",
    answer: "You can export your data by going to the Reports page and selecting the Export option. Choose the data you want to export and the file format."
  },
  {
    question: "How do I schedule a meeting with a lead?",
    answer: "Go to the lead's profile and click 'Schedule Meeting' or use the Schedule Meeting action from the dashboard. Select a date, time, and meeting details."
  },
  {
    question: "What are AI insights?",
    answer: "AI Insights are automatically generated business intelligence based on your data. They provide recommendations, identify trends, and highlight opportunities to improve your sales performance."
  }
];
