import * as Yup from "yup";

/**
 * Validates that source string contain increasing straights with "lettersForStraights" letters
 * (Optional) straightsCount - minimum count of straights to for valid string, default is 1
 *
 * @param value - source string
 * @param lettersForStraights  -
 * @param straightsCount
 */
const testStringIncreasingStraight = (
  value: string | undefined,
  lettersForStraights: number,
  straightsCount: number = 1
): boolean => {
  if (!value) {
    return false;
  }
  const { totalStraights } = value
    .split("")
    .map(c => c.charCodeAt(0))
    .reduce(
      (acc, code) => {
        if (code - acc.prevCode === 1) {
          acc.currentStraight += 1;
          if (acc.currentStraight === lettersForStraights) {
            acc.totalStraights += 1;
            acc.currentStraight = 1;
          }
        } else {
          acc.currentStraight = 1;
        }
        acc.prevCode = code;
        return acc;
      },
      {
        prevCode: -1,
        totalStraights: 0,
        currentStraight: 1
      }
    );

  return totalStraights >= straightsCount;
};

export const emailPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required("Required")
    .email("Should be valid email"),
  password: Yup.string()
    .required("Required")
    .matches(/^[^<iOl>]+$/, `Should not contain "i", "O", or "l" letters`)
    .matches(/^[a-z]+$/, "Should contain only lowercase letters")
    .matches(
      /\w*(.)\1\w*(.)\2\w*/,
      "Must contain at least two non-overlapping pairs of letters"
    )
    .test(
      "increasing-straight",
      "Must include one increasing straight of at least three letters",
      value => testStringIncreasingStraight(value, 3)
    )
    .max(32, "Must be maxumum 32 characters")
});
