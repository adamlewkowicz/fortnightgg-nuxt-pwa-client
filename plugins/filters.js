export const addCommasToValue = val => {
  const stringVal = val.toString();

  if (stringVal.includes('.')) {
    return stringVal.replace('.', ',');
  } else if (stringVal.length > 3) {
    let splitted = stringVal.split('');
    const valLength = splitted.length;
    const numOfCommas = parseInt((valLength - 1) / 3);

    for (let i = 0; i < numOfCommas; i++) {
      const insertIndex = valLength - 3 * (i + 1);
      splitted.splice(insertIndex, 0, ',');
    }
    return splitted.join('');
  } else {
    return val;
  }
}
