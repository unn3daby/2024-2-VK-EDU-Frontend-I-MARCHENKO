import { correctSentence } from './correctSentence';

test('returns correct sentence', () => {
  expect(correctSentence("greetings, friends")).toBe("Greetings, friends.");
  expect(correctSentence("Greetings, friends")).toBe("Greetings, friends.");
  expect(correctSentence("Greetings, friends.")).toBe("Greetings, friends.");
  expect(correctSentence("")).toBe("");
  expect(correctSentence("       ")).toBe("");
  expect(correctSentence("   as das da sd    ")).toBe("As das da sd.");
  expect(correctSentence("123")).toBe("123.");
});

test('throw error', () => {
  expect(() => correctSentence(123)).toThrow("Argument must be string");
  expect(() => correctSentence({})).toThrow("Argument must be string");
  expect(() => correctSentence([])).toThrow("Argument must be string");
  expect(() => correctSentence()).toThrow("Argument must be string");
  expect(() => correctSentence(NaN)).toThrow("Argument must be string");
})