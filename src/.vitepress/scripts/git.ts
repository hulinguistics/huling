import { spawn } from 'cross-spawn';

const git = async (options: string[], outFunc: any) => {
  return new Promise((resolve, reject) => {
    const child = spawn('git', options);
    let output = '';
    child.stdout.on('data', (d: any) => (output += String(d)));
    child.on('close', () => {
      resolve(outFunc(output));
    });
    child.on('error', reject);
  });
};

// file の最終 commit 日時を取得
export const getGitLastUpdated = async (file: string) =>
  await git(['log', '-1', `--pretty="%ci"`, file], (output: any) => +new Date(output));
