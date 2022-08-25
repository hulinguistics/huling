import path from 'path';
import newPost from './newPost.js';

const typeList = (typ) => {
  switch (typ) {
    case 'new':
      return newOlymPost;
    case 'title':
      return (arg) => {
        const { Title } = getOlymData(arg);
        return Title;
      };
    case 'year':
      return (arg) => {
        const { Year } = getOlymData(arg);
        return Year;
      };
    case 'round':
      return (arg) => {
        const { Round } = getOlymData(arg);
        return Round;
      };
    case 'num':
      return (arg) => {
        const { Number } = getOlymData(arg);
        return Number;
      };
    case 'code':
      return (arg) => {
        const { Code } = getOlymData(arg);
        return Code;
      };
    case 'name':
      return (arg) => {
        const { Name } = getOlymData(arg);
        return Name;
      };
    default:
      throw new Error('type not found: ' + typ);
  }
};

const typ = process.argv[2];
const arg = process.argv[3];

(async () => {
  console.log(await typeList(typ)(arg));
})();

async function newOlymPost(str) {
  const { Title, Year, Round, Number, Code, Name } = getOlymData(str);

  const postPath = path.join('src/olympiad/', Title.toLowerCase(), Year, Round ? Round : '', Number, 'index.md');
  const templatePath = 'archetypes/olympiad/index.md';
  const dict = {
    Title: Title,
    Year: Year,
    Round: Round ? ' ラウンド' + Round : '',
    Number: Number,
    Code: Code,
    Name: Name,
  };

  return await newPost(postPath, templatePath, dict);
}

function getOlymData(str) {
  // Format check
  if (str.match(/[a-zA-Z]{3,}[0-9]{4}(R[0-9]+)?-[0-9]+ .+/)[0] != str) throw new Error('format error: ' + str);

  // Olym name
  const Title = str.match(/[a-zA-Z]{3,}/)[0];

  // Year
  const Year = str.match(/[0-9]{4}/)[0];

  // Round
  const Round = str.match(/R[0-9]+/) ? str.match(/R[0-9]+/)[0].slice(1) : null;

  // Problem Number
  const Number = str.match(/-[0-9]+/) ? str.match(/-[0-9]+/)[0].slice(1) : null;

  // Probrem Code
  const Code = Title + Year + (Round ? 'R' + Round : '') + '-' + Number;

  // Problem Name
  const Name = str.match(/ .+/)[0].slice(1).trim();

  return { Title, Year, Round, Number, Code, Name };
}
