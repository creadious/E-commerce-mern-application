export function searchWord(text, word) {
  // Convert both text and word to lowercase for case-insensitive search
  const lowerCaseText = text.toLowerCase();
  const lowerCaseWord = word.toLowerCase();

  // Use includes() method to check if the word exists in the text
  return lowerCaseText.includes(lowerCaseWord);
}
