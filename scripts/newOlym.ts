import path from 'path';
import newPost from '../src/.vitepress/utils/newPost.js';

const typeList = (typ: string) => {
  switch (typ) {
    case 'new':
      return newOlymPost;
    case 'title':
      return (arg: string) => {
        const { Title } = getOlymData(arg);
        return Title;
      };
    case 'year':
      return (arg: string) => {
        const { Year } = getOlymData(arg);
        return Year;
      };
    case 'round':
      return (arg: string) => {
        const { Round } = getOlymData(arg);
        return Round;
      };
    case 'num':
      return (arg: string) => {
        const { Number } = getOlymData(arg);
        return Number;
      };
    case 'code':
      return (arg: string) => {
        const { Code } = getOlymData(arg);
        return Code;
      };
    case 'name':
      return (arg: string) => {
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

async function newOlymPost(str: string) {
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

function getOlymData(str: string) {
  // Format check
  if (str.match(/[a-zA-Z]{3,}[0-9]{4}(R[0-9]+)?-[0-9]+ .+/) === null) throw new Error('format error: ' + str);

  // Olym name
  const Title_raw = str.match(/[a-zA-Z]{3,}/);
  const Title = Title_raw ? Title_raw[0] : '';

  // Year
  const Year_raw = str.match(/[0-9]{4}/);
  const Year = Year_raw ? Year_raw[0] : '';

  // Round
  const Round_raq = str.match(/R[0-9]+/);
  const Round = Round_raq ? Round_raq[0].slice(1) : '';

  // Problem Number
  const Number_raw = str.match(/-[0-9]+/);
  const Number = Number_raw ? Number_raw[0].slice(1) : '';

  // Probrem Code
  const Code = Title + Year + (Round ? 'R' + Round : '') + '-' + Number;

  // Problem Name
  const Name_raw = str.match(/ .+/);
  const Name = Name_raw ? Name_raw[0].slice(1).trim() : '';

  return { Title, Year, Round, Number, Code, Name };
}
