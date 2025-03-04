const detect = require('detect-port').default; // 🔥 .default 추가
const { exec } = require('child_process');

const BASE_PORT = 3000; // 기본 포트

detect(BASE_PORT, (err, availablePort) => {
  if (err) {
    console.error('포트 검색 중 오류 발생:', err);
    return;
  }
  console.log(`사용 가능한 포트: ${availablePort}`);

  // Webpack Dev Server 실행
  const devServerCommand = `webpack serve --port ${availablePort} --env development`;
  console.log(`실행: ${devServerCommand}`);

  const serverProcess = exec(devServerCommand);

  serverProcess.stdout.on('data', (data) => console.log(data));
  serverProcess.stderr.on('data', (data) => console.error(data));
});
