// ============================================
// TESTS FOR ELIGIBILITY LOGIC
// These tests verify that calculateEligibility returns the correct
// discounts for different combinations of answers.
//
// We test:
//   1. Single adult → should get Single Person Discount
//   2. Student living alone → should get both Single Person Discount AND Student Exemption
//   3. Student living with other students → should get Student Exemption
//   4. Person receiving benefits → should get Council Tax Reduction
//   5. Non-single, non-student, no benefits → should get no discounts
// ============================================

import { describe, it, expect } from 'vitest';
import { calculateEligibility } from './eligibility';

describe('calculateEligibility', () => {

  // TEST 1: Single adult should get 25% discount
  it('should return Single Person Discount when user is the only adult', () => {
    const answers = {
      singleAdult: 'Yes',
      student: 'No',
      benefits: [],
    };
    const result = calculateEligibility(answers);
    // Should return exactly 1 discount
    expect(result).toHaveLength(1);
    // That discount should be the Single Person Discount
    expect(result[0].name).toBe('Single Person Discount');
    // The amount should mention 25%
    expect(result[0].amount).toContain('25%');
  });

  // TEST 2: Student living alone should get student exemption too
  it('should return Student Exemption when user is a student and lives alone', () => {
    const answers = {
      singleAdult: 'Yes',
      student: 'Yes',
      benefits: [],
    };
    const result = calculateEligibility(answers);
    // Should return 2 discounts: Single Person + Student Exemption
    expect(result).toHaveLength(2);
    // Check that Student Exemption is in the results
    const hasStudentExemption = result.some(
      (discount) => discount.name === 'Student Exemption'
    );
    expect(hasStudentExemption).toBe(true);
  });

  // TEST 3: Student living with other students should get student exemption
  it('should return Student Exemption when all adults are students', () => {
    const answers = {
      singleAdult: 'No',
      otherAdults: '2',
      student: 'Yes',
      allStudents: 'Yes',
      benefits: [],
    };
    const result = calculateEligibility(answers);
    // Check that Student Exemption is in the results
    const hasStudentExemption = result.some(
      (discount) => discount.name === 'Student Exemption'
    );
    expect(hasStudentExemption).toBe(true);
  });

  // TEST 4: Person receiving benefits should get Council Tax Reduction
  it('should return Council Tax Reduction when user receives benefits', () => {
    const answers = {
      singleAdult: 'No',
      otherAdults: '1',
      student: 'No',
      benefits: ['Universal Credit'],
    };
    const result = calculateEligibility(answers);
    // Check that Council Tax Reduction is in the results
    const hasReduction = result.some(
      (discount) => discount.name === 'Council Tax Reduction (means-tested)'
    );
    expect(hasReduction).toBe(true);
  });

  // TEST 5: No eligibility for any discount
  it('should return empty array when user is not eligible for any discounts', () => {
    const answers = {
      singleAdult: 'No',
      otherAdults: '2',
      student: 'No',
      allStudents: 'No',
      benefits: [],
    };
    const result = calculateEligibility(answers);
    // Should return an empty array — no discounts
    expect(result).toHaveLength(0);
  });

});