import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

import fs from 'fs';
import path from 'path';

const videoPath = './assets/videos/video-com-25fps.mp4';

const createDirectory = (dir:string) => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir,{recursive:true});
    }
};


// Segmentação do vídeo
const segmentVideo = async () => {
    const outputPattern = './segments/segment-%03d.mp4';
    createDirectory('segments');

    return new Promise<void>((resolve,reject) => {
        ffmpeg(videoPath).outputOptions([
            '-c copy',
            '-map 0',
            '-segment_time 5',
            '-f segment'
        ]).output(outputPattern)
        .on('end', () =>{
            console.log('Segmentação concluída!');
            resolve();
        })
        .on('error', (err) => reject(err))
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
segmentVideo();