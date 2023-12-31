function getAnotherShiftTable(pattern) {
  let N = new Map();
  for (let i = pattern.length-2; i >= 0; i--) {
    if(!N[pattern[i]]) {
      N[pattern[i]] = pattern.length-i-1;
    }
    else continue;
  }
  if (!N[pattern[pattern.length-1]]) {
    N[pattern[pattern.length-1]] = pattern.length;
  }
  return N;
}

function boyerMooreSearch(text, pattern, shiftTable) {
  let matches = [];
  let i = 0;
  while (i <= text.length-pattern.length) {
    let passed = 0;
    for (j = 0; j < pattern.length; j++) {

      if (passed == pattern.length-1) {
        matches.push(i);
        i += pattern.length;
        break;
      }
      if (text[i+pattern.length-passed-1] == pattern[pattern.length-passed-1]) {
        passed += 1;
        continue;
      }
      else if (shiftTable[text[i+pattern.length-passed-1]]) {
        i += shiftTable[text[i+pattern.length-passed-1]];
        break;
      }
      else i+= pattern.length;
      break;
    }
    //console.log(matches)
  }
  return matches;
}

  const text = "abracadabra";
  const pattern = "bra";

  const table = getAnotherShiftTable(pattern);
  const bms = boyerMooreSearch(text, pattern, table);

  if (!bms[0]) console.log("No matches");
  else console.log(bms);