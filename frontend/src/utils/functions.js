import numberToWords from "number-to-words";
import indianNumberFormat from "indian-number-format";

const amountInWordsIndian = (number) => {
  const words = numberToWords.toWords(number);
  return indianNumberFormat.format(words);
};

const changeText = (str) => {
  const splitStr = str?.split("_");
  const capitalize = splitStr?.map(
    (item) => item?.charAt(0)?.toUpperCase() + item.slice(1)
  );
  const finalText = capitalize.join(" ");
  return finalText;
};

const gstValue = (total, gstType) => {
  // console.log("gstType", gstType);
  // console.log("total", total);
  return Math.round(Number((total * gstType) / 100));
};

const convertNumericProperties = (data) => {
  const convertProperty = (propValue) => {
    if (typeof propValue === "string" && !isNaN(propValue)) {
      return Number(propValue);
    } else if (typeof propValue === "object") {
      if (Array.isArray(propValue)) {
        return propValue.map(convertProperty);
      } else {
        return convertNumericProperties(propValue);
      }
    }
    return propValue;
  };

  const convertedData = { ...data };

  Object.keys(convertedData).forEach((prop) => {
    convertedData[prop] = convertProperty(convertedData[prop]);
  });

  return convertedData;
};

export { changeText, amountInWordsIndian, gstValue, convertNumericProperties };
