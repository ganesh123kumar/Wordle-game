
import glossary from './glossary.txt';
export const boardDefault = [
      ["", "", "", "", "",],
      ["", "", "", "", "",],
      ["", "", "", "", "",],
      ["", "", "", "", "",],
      ["", "", "", "", "",],
      ["", "", "", "", "",]
];

export const generateFunc = async () => {
      let wordSet;
      let todaysWord;
      await fetch(glossary)
            .then((response) => response.text())
            .then((result)=> {
                  let wordArr = result.split(/\r?\n/);                  
                  todaysWord = wordArr[Math.ceil(Math.random() * wordArr.length)].toUpperCase();
                  wordSet = new Set(wordArr);  
            })
            return {wordSet,todaysWord};
}
