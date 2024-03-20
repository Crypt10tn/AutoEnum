const { exec } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const proxyChain = require('proxy-chain');
const cliProgress = require('cli-progress');
const config = require('./config.json'); // 

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
function printHeader() {
  console.log(`
        This Tool Coded By Yassine[Crypt10_]
                ____________________________
               |_Subdomain_Enumeration_T00L_|

               ⠀⠀⠀⠀⠀⠀⠀⣀⣤⣴⣶⣶⣶⣿⣿⣿⣷⣶⣶⣶⣤⣄⠀⠀⠀⠀⠀⠀⠀⠀
               ⠀⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣤⡀⠀⠀⠀⠀
               ⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣄⠀⠀⠀
               ⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠀
               ⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀
               ⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇
               ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
               ⣿⣿⡏⠉⠙⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠉⠉⣿⣿
               ⢻⣿⡇⠀⠀⠀⠈⠙⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠋⠀⠀⠀⠀⢀⣿⡇
               ⠘⣿⣷⡀⠀⠀⠀⠀⠀⠀⠉⠛⠿⢿⣿⣿⣿⠿⠛⠋⠀⠀⠀⠀⠀⠀⢀⣼⣿⠃
               ⠀⠹⣿⣿⣶⣦⣤⣀⣀⣀⣀⣀⣤⣶⠟⡿⣷⣦⣄⣀⣀⣀⣠⣤⣤⣶⣿⣿⡟⠀
               ⠀⠀⣨⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⡇⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀
               ⠀⢈⣿⣿⣿⣿⣿⡿⠿⠿⣿⣿⣷⠀⣼⣷⠀⣸⣿⣿⣿⡿⠿⠿⠿⣿⣿⣿⡇⠀
               ⠀⠘⣿⣿⣿⡟⠋⠀⠀⠰⣿⣿⣿⣷⣿⣿⣷⣿⣿⣿⣿⡇⠀⠀⠀⣿⣿⠟⠁⠀
               ⠀⠀⠈⠉⠀⠈⠁⠀⠀⠘⣿⣿⢿⣿⣿⢻⣿⡏⣻⣿⣿⠃⠀⠀⠀⠈⠀⠀⠀⠀
               ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⡇⣿⣿⢸⣿⡇⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀
               ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⡇⣿⣿⢸⣿⡇⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
               ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⡇⣿⣿⢸⣿⡇⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
               ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⡇⣿⣿⢸⣿⠃⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
               ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⡇⣿⣿⢸⣿⠀⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
               ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠿⠇⢿⡿⢸⡿⠀⠿⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀                                             
  `);
}

printHeader();
async function runWithToken(target, token, useProxies, proxyHost, proxyPort, proxyUsername, proxyPassword) {
  const folderName = target.split('.')[0];
  fs.mkdirSync(folderName, { recursive: true });
  await runSubfinder(target, folderName);
  await runGithubSubdomains(target, token, folderName);
  await runAmass(target, folderName);
  rl.close();
}
function runSubfinder(target, folderName) {
  return new Promise((resolve, reject) => {
    console.log('Running Subfinder for', target);
    exec(`subfinder -d ${target} --all -o ${folderName}/SubfinderOutput.txt`, (err) => {
      if (err) {
        console.error('Error running Subfinder:', err);
        reject(err);
      } else {
        console.log('Subfinder completed successfully.');
        resolve();
      }
    });
  });
}
function runGithubSubdomains(target, token, folderName) {
  return new Promise((resolve, reject) => {
    console.log('Running Github Subdomains for', target);
    exec(`github-subdomains -d ${target} -t ${token} -o ${folderName}/githuboutput.txt`, (err) => {
      if (err) {
        console.error('Error running Github Subdomains:', err);
        reject(err);
      } else {
        console.log('Github Subdomains completed successfully.');
        resolve();
      }
    });
  });
}
function runAmass(target, folderName) {
  return new Promise((resolve, reject) => {
    console.log('Running Amass for', target);
    exec(`amass enum -brute -d ${target} -o ${folderName}/amassoutput.txt`, (err) => {
      if (err) {
        console.error('Error running Amass:', err);
        reject(err);
      } else {
        console.log('Amass completed successfully.');
        resolve();
      }
    });
  });
}

rl.question('Enter the target domain: ', (target) => {
  target = target.replace(/https?:\/\//, '').replace(/www\./, '');

  rl.question('Enter your GitHub token: ', (token) => {
    rl.question('Do you want to use proxies? (yes/no): ', (useProxies) => {
      if (useProxies.toLowerCase() === 'yes') {
        const { host, port, username, password } = config.ipvanish.credentials;
        runWithToken(target, token, true, host, port, username, password);
      } else {
        runWithToken(target, token, false);
      }
    });
  });
});
