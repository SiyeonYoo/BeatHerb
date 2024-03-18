// webm blob을 mp3 blob으로 변환

import { FFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

export async function convertWebmToMp3(webmBlob) {
  const url = URL.createObjectURL(webmBlob);
  const ffmpeg = new FFmpeg();
  await ffmpeg.load();

  const inputName = 'input.webm';
  const outputName = 'output.mp3';

  ffmpeg.writeFile(inputName, await fetch(url)); // <- 여기가 문제인듯????????????????????????????????????????????????
  
  console.log("OK");
  await ffmpeg.exec(['-i', inputName, outputName]); // <- why error??????????????????????????????????????????????????????????
  console.log("OK");
  
  const outputData = ffmpeg.readFile('output.mp3');
  const outputBlob = new Blob([outputData.buffer], { type: 'audio/mp3' });

  return outputBlob;
}