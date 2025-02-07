// Similaridade de frames por distância euclidiana (RGB)
import { createCanvas, loadImage } from "canvas";

async function compareImages(imagePath1: string, imagePath2: string): Promise<number> {
    
        // Carrega as duas imagens antes de desenhá-las no canvas
        const img1 = await loadImage(imagePath1);
        const img2 = await loadImage(imagePath2);

        // Cria o canvas em memória para processar as imagens
        const canvas = createCanvas(img1.width, img1.height);
        const ctx = canvas.getContext('2d');

        console.log(ctx);

        // Desenha a primeira imagem no canvas
        ctx.drawImage(img1, 0, 0);
        const imageData1 = ctx.getImageData(0, 0, img1.width, img1.height);

        // Limpa o canvas antes de desenhar a segunda imagem
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img2, 0, 0);
        const imageData2 = ctx.getImageData(0, 0, img2.width, img2.height);


        // Comparando os pixels
        let diff = 0;
        const totalPixels = img1.width * img1.height;

        console.log('Qt. de pixels: ',totalPixels);
        // console.log('Image1:', imageData1, '\nImage2:', imageData2);

        for (let i = 0; i < imageData1.data.length; i += 4) {
            const rDiff = Math.abs(imageData1.data[i] - imageData2.data[i]);
            const gDiff = Math.abs(imageData1.data[i + 1] - imageData2.data[i + 1]);
            const bDiff = Math.abs(imageData1.data[i + 2] - imageData2.data[i + 2]);
            const aDiff = Math.abs(imageData1.data[i + 3] - imageData2.data[i + 3]);
    
            if (rDiff + gDiff + bDiff + aDiff > 50) {
                diff++;
            }
        }
        return (diff / totalPixels) * 100;
}

compareImages('./key-frames/frame-001.png', './key-frames/frame-076.png')
.then(diff => console.log(`As imagens tem ${100 - diff}% de semelhança!`))
.catch(console.error);