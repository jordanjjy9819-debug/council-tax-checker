export const questions = [
  {
    id: 'singleAdult',
    question: 'Are you the only adult aged 18 or over living in your property?',
    hint: 'Do not count anyone under 18.',
    type: 'radio',
    options: ['Yes', 'No'],
  },
  {
    id: 'otherAdults',
    question: 'How many other adults aged 18 or over live with you?',
    hint: 'Enter a number, for example 2.',
    type: 'number',
    // This question ONLY shows if the user answered "No" to the singleAdult question
    showIf: (answers) => answers.singleAdult === 'No',
  },
  {
    id: 'student',
    question: 'Are you a full-time student?',
    hint: 'Full-time means your course lasts at least one year and involves at least 21 hours of study per week.',
    type: 'radio',
    options: ['Yes', 'No'],
  },
  {
    id: 'allStudents',
    question: 'Are all the other adults in your household also full-time students?',
    hint: 'If all adults in the property are students, you may be exempt from Council Tax.',
    type: 'radio',
    options: ['Yes', 'No'],
    // This question ONLY shows if the user is a student AND lives with other adults
    showIf: (answers) => answers.student === 'Yes' && answers.singleAdult === 'No',
  },
  {
    id: 'benefits',
    question: 'Do you receive any of the following benefits?',
    hint: 'Select all that apply.',
    type: 'checkbox',
    options: [
      'Universal Credit',
      "Jobseeker's Allowance",
      'Pension Credit',
      'Employment and Support Allowance',
      'Income Support',
    ],
  },
];