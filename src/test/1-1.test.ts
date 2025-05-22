import { isValidLogin } from "../helpers/validation";

describe("Login validation - no numbers allowed", () => {
  test("should return true if login has no numbers", () => {
    expect(isValidLogin("username")).toBe(true);
    expect(isValidLogin("user_name")).toBe(true);
    expect(isValidLogin("userName")).toBe(true);
    expect(isValidLogin("user.name")).toBe(true);
  });

  test("should return false if login contains numbers", () => {
    expect(isValidLogin("user123")).toBe(false);
    expect(isValidLogin("123")).toBe(false);
    expect(isValidLogin("user1name")).toBe(false);
    expect(isValidLogin("user2025")).toBe(false);
  });

  test("should handle empty string or other edge cases", () => {
    expect(isValidLogin("")).toBe(true); // No digits in empty string
    expect(isValidLogin("   ")).toBe(true); // Spaces only
  });
});
