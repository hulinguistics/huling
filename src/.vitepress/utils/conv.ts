import axios from 'axios';
import papa from 'papaparse';

export const getList = async (path: string) =>
  await axios
    .get(path)
    .then((response) => {
      const data: any = papa.parse(response.data.trim(), {
        quoteChar: '\\',
        delimiter: '\t',
      }).data;
      return {
        title: { left: data[0][0], right: data[0][1] },
        set: data.slice(1, data.len),
        test: converter('HELLO, WORLD!', data.slice(1, data.len)),
      };
    })
    .catch((error) => {
      throw error;
    });

// 文字変換関数
export const converter = (input: string, set: [string, string][]) => {
  let output: string = input;
  while (
    set.some((value: [string, string]) => {
      if (value[0] && output.indexOf(value[0]) !== -1) {
        const output_old = output;
        output = output.replaceAll(value[0], value[1]);
        return output != output_old;
      } else {
        return false;
      }
    })
  );
  return output;
};
