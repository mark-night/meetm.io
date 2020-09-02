export const parseStrArr = arr => {
  /**
   * take in a string array, if any item is "included" by any other
   * item of the same array, remove this included item from the array.
   * finally, return the "cleaned" array. Case is sensitive.
   */
  // remove duplicates
  const occur = {};
  for (let item of arr) {
    item = item.trim();
    if (item === '') {
      continue;
    }
    if (!occur[item]) {
      occur[item] = true;
    }
  }
  const allUnique = Object.keys(occur);

  const parsed = [];
  for (const m of allUnique) {
    let included = false;
    for (const n of allUnique) {
      /**
       * Parse Rule: for string 'abc d':
       *    consider included: abc|d
       *    consider not included: a|b|c|ab|bc
       */
      included = n.length > m.length && n.split(' ').some(w => w === m);
      if (included) {
        break;
      }
    }
    if (!included) {
      parsed.push(m);
    }
  }
  return parsed;
};

export const removeArrFromArr = (arr1, arr2) => {
  /**
   * remove all values of arr1 from arr2
   */
  return arr2.filter(value => arr1.every(el => el !== value));
};

export const normalizeIndex = (index, arr) => {
  /**
   * Given an array "arr" and an int number "index", return a normalized index
   * that is valid for "arr"
   */
  const total = arr.length;
  if (total === 0) {
    return 0;
  }
  let indexNormalized = index;
  if (index >= total) {
    indexNormalized = index % total;
  } else if (index < 0) {
    // the extra mod is necessary when index is divisible by total
    indexNormalized = ((index % total) + total) % total;
  }
  return indexNormalized;
};

export const loopSlice = (arr, start, num) => {
  /**
   * Slice @num of items from array @arr, starting from @start:
   *  - If @arr end is reached before slice finishes, loop over from @arr beginning
   *  - If @arr.length < num, repeat @arr to until it is long enough
   */
  const sliceSource = [];
  const startIdx = normalizeIndex(start, arr);
  do {
    sliceSource.push(...arr);
  } while (sliceSource.length < arr.length + num);
  return sliceSource.slice(startIdx, startIdx + num);
};
