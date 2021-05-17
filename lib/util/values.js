module.exports = function getValues(input) {
  // console.log('in', input);
  let typed = [];
  for (let char of input.join(' ').split('')) {
    let type = char.match(/[0-9]/)
      ? 'int'
      : char.match(/[a-zA-Z]/)
      ? 'alpha'
      : 'literal';
    typed.push({ type: type, value: char });
  }

  let merged = [];
  for (let obj of typed) {
    if (merged.length === 0) {
      merged.push(obj);
      continue;
    }
    let lastOut = merged[merged.length - 1];
    if (obj.type === lastOut.type) {
      lastOut.value += obj.value;
    } else {
      merged.push(obj);
    }
  }
  // console.log('value.js', merged);
  return merged;
};
