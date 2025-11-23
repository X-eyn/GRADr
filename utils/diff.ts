import { DiffPart } from '../types';

/**
 * A simple word-based diff algorithm to visualize changes.
 * Compares two strings and returns an array of parts indicating additions, deletions, or unchanged text.
 */
export const computeDiff = (original: string, corrected: string): DiffPart[] => {
  // Normalize whitespace
  const oldWords = original.split(/\s+/);
  const newWords = corrected.split(/\s+/);
  
  const diff: DiffPart[] = [];
  let i = 0;
  let j = 0;

  while (i < oldWords.length || j < newWords.length) {
    if (i < oldWords.length && j < newWords.length && oldWords[i] === newWords[j]) {
      diff.push({ type: 'text', value: oldWords[i] + ' ' });
      i++;
      j++;
    } else {
      // Look ahead to find the next match
      let k = i;
      let l = j;
      let foundMatch = false;
      let bestMatchDistance = Infinity;
      let bestMatchOldIndex = -1;
      let bestMatchNewIndex = -1;

      // Simple lookahead search (limited window for performance)
      const windowSize = 10;
      
      for (let searchOffset = 0; searchOffset < windowSize; searchOffset++) {
        // Search in new words for current old word
        if (i + searchOffset < oldWords.length) {
            for(let newSearch = 0; newSearch < windowSize; newSearch++) {
                if (j + newSearch < newWords.length) {
                    if (oldWords[i + searchOffset] === newWords[j + newSearch]) {
                         // Found a match
                         if (searchOffset + newSearch < bestMatchDistance) {
                             bestMatchDistance = searchOffset + newSearch;
                             bestMatchOldIndex = i + searchOffset;
                             bestMatchNewIndex = j + newSearch;
                             foundMatch = true;
                         }
                    }
                }
            }
        }
      }

      if (foundMatch) {
          // Process deletions up to match
          while (i < bestMatchOldIndex) {
              diff.push({ type: 'del', value: oldWords[i] + ' ' });
              i++;
          }
          // Process additions up to match
          while (j < bestMatchNewIndex) {
              diff.push({ type: 'add', value: newWords[j] + ' ' });
              j++;
          }
      } else {
          // No match found nearby, treat current words as diff
          if (i < oldWords.length) {
            diff.push({ type: 'del', value: oldWords[i] + ' ' });
            i++;
          }
          if (j < newWords.length) {
            diff.push({ type: 'add', value: newWords[j] + ' ' });
            j++;
          }
      }
    }
  }

  return diff;
};