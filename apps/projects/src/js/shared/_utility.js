export const parseStrArr = arr => {
  /**
   * take in a string array, if any item is "included" by any other
   * item of the same array, remove this included item from the array.
   * finally, return the "cleaned" array.
   */
  // remove duplicates
  const occur = {};
  for (let item of arr) {
    item = item.trim();
    if (item === '') {
      continue;
    }
    item = item.toLowerCase();
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
