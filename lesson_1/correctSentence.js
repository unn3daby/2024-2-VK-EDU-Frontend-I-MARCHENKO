/*
For the input of your function, you will be given one sentence.
You have to return a corrected version,
that starts with a capital letter and ends with a period (dot).

Example:

input (string): "hey, friend"
output (string): "Hey, friend."

Updated first 'h' to 'H', added '.'.

More examples:

correctSentence("greetings, friends") == "Greetings, friends."
correctSentence("Greetings, friends") == "Greetings, friends."
correctSentence("Greetings, friends.") == "Greetings, friends."
 */

export const correctSentence = (text) => {
if (typeof text !== 'string') {
  throw new Error('Argument must be string');
}

const trimmedText = text.trim();

if (!trimmedText) {
  return '';
}

return `${trimmedText[0].toUpperCase()}${trimmedText.slice(1)}${trimmedText.at(-1) === '.' ? '' : '.'}`;
}
