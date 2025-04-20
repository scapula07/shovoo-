import { getFFmpeg } from ".";
import { fetchFile, toBlobURL } from "@ffmpeg/util";




export const resizeImg = async (file,width,height) => {
    try{
        const ffmpeg = await getFFmpeg();
        console.log(ffmpeg,"ff")

        // ffmpeg.on('progress', ({ progress }) => onProgress(progress));
      
        const { name } = file;
        console.log(name,"file n")
        await ffmpeg.writeFile(name, await fetchFile(file));
        await ffmpeg.exec([
            "-i", name, // Input file
            "-vf", `scale=${width}:${height}`, // Resize filter
            "resized.png", // Output file
          ]);
        
        const data = await ffmpeg.readFile("resized.png");
        console.log(data,"dd")
      
        return new Blob([data.buffer], { type: "image/png" });
     }catch(e){
        console.log(e)
     }
}


export const cropImg = async (file, width, height, x = 0, y = 0) => {
  try {
    const ffmpeg = await getFFmpeg();
    const { name } = file;
    await ffmpeg.writeFile(name, await fetchFile(file));
    
    await ffmpeg.exec([
      "-i", name,
      "-vf", `crop=${width}:${height}:${x}:${y}`,
      "cropped.png"
    ]);

    const data = await ffmpeg.readFile("cropped.png");
    return new Blob([data.buffer], { type: "image/png" });
  } catch (e) {
    console.log("Crop error:", e);
  }
};



export const overlayText = async (file, text, x = 10, y = 10) => {
  try {
    const ffmpeg = await getFFmpeg();
    const { name } = file;
    await ffmpeg.writeFile(name, await fetchFile(file));

    await ffmpeg.exec([
      "-i", name,
      "-vf", `drawtext=text='${text}':x=${x}:y=${y}:fontsize=24:fontcolor=white:box=1:boxcolor=black@0.5`,
      "text_overlay.png"
    ]);

    const data = await ffmpeg.readFile("text_overlay.png");
    return new Blob([data.buffer], { type: "image/png" });
  } catch (e) {
    console.log("Text overlay error:", e);
  }
};





export const applyBgToImg = async (foregroundFile, backgroundFile) => {
  try {
    const ffmpeg = await getFFmpeg();
    await ffmpeg.writeFile("fg.png", await fetchFile(foregroundFile));
    await ffmpeg.writeFile("bg.png", await fetchFile(backgroundFile));

    await ffmpeg.exec([
      "-i", "bg.png",
      "-i", "fg.png",
      "-filter_complex", "[0][1]overlay=0:0",
      "composited.png"
    ]);

    const data = await ffmpeg.readFile("composited.png");
    return new Blob([data.buffer], { type: "image/png" });
  } catch (e) {
    console.log("Apply background error:", e);
  }
};



