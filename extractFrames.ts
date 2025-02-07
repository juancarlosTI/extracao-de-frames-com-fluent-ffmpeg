import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

import fs from 'fs';
import path from 'path';

const createDirectory = (dir:string) => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir,{recursive:true});
    }
};

// Segmentação do vídeo
const segmentVideo = async (videoPath:string, outputDir:string): Promise<void> => {
    
    createDirectory('key-frames');

    return new Promise<void>((resolve,reject) => {
        ffmpeg(videoPath).
        outputOptions([
            '-vf',"select='eq(pict_type,PICT_TYPE_I)'"
        ])
        .output(`${outputDir}/frame-%03d.png`)
        .on('end', () => {
            console.log('Extração de frames concluída!');
            resolve();
        })
        .on('error', (err) => {
            console.error('Erro ao extrair quadros', err);
            reject(err);
        })
        .run();
    });
};


// // Executando as funções
// (async () => {
//     try {
//         console.log('Inicio');
//         await segmentVideo();
//         console.log('Fim');
//     } catch (error) {
//         console.error('Erro: ', error)
//     }
// })
const videoPath = './assets/videos/7092093-hd_1920_1080_30fps.mp4';
const outputDir = './key-frames'

segmentVideo(videoPath,outputDir);