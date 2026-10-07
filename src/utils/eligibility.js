// ============================================
// ELIGIBILITY LOGIC
// This is a PURE FUNCTION — it takes answers in and returns results out.
// It has no side effects and doesn't touch the DOM.
// This makes it easy to test (which we do in eligibility.test.js).
//
// The function checks the user's answers against real Council Tax
// discount rules and returns an array of discounts they may qualify for.
// ============================================

export function calculateEligibility(answers) {
  const discounts = [];

  // ----- SINGLE PERSON DISCOUNT (25% off) -----
  // Rule: If you are the only adult aged 18+ in your property,
  // you are entitled to a 25% reduction on your Council Tax bill.
  if (answers.singleAdult === 'Yes') {
    discounts.push({
      name: 'Single Person Discount',
      amount: '25% off',
      explanation:
        'If you are the only adult living in your property, you may be entitled to a 25% reduction on your Council Tax bill.',
    });
  }

  // ----- STUDENT EXEMPTION (up to 100% off) -----
  // Rule: If ALL adults in the property are full-time students,
  // the property may be exempt from Council Tax entirely.
  if (answers.student === 'Yes') {
    // Check if all adults are students:
    // - If singleAdult is 'Yes', the user is the only adult and they're a student
    // - If allStudents is 'Yes', everyone in the household is a student
    if (answers.singleAdult === 'Yes' || answers.allStudents === 'Yes') {
      discounts.push({
        name: 'Student Exemption',
        amount: 'Up to 100% off',
        explanation:
          'Properties where all adult residents are full-time students may be exempt from Council Tax entirely.',
      });
    }
  }

  // ----- COUNCIL TAX REDUCTION (means-tested) -----
  // Rule: If you receive certain benefits, you may qualify for a
  // Council Tax Reduction. The amount depends on your income,
  // circumstances and your local council's scheme.
  const benefits = answers.benefits || [];
  if (benefits.length > 0) {
    discounts.push({
      name: 'Council Tax Reduction (means-tested)',
      amount: 'Varies',
      explanation:
        "If you receive certain benefits, you may qualify for a Council Tax Reduction. The amount depends on your income, circumstances and your local council's scheme.",
    });
  }

  return discounts;
}