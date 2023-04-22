import imageDownloader from "image-downloader";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const imageUploader = async (req, res) => {
  const { link } = req.body;
  try {
    const newName = "photo" + Date.now() + ".jpg";
    await imageDownloader.image({
      url: link,
      dest: __dirname + "/uploads/" + newName,
    });
    /*const url = await uploadToS3(
      "/tmp/" + newName,
      newName,
      mime.lookup("/tmp/" + newName)
    );*/
    res.json(newName);
  } catch (error) {
    res.status(500).json({
      location: error.location,
      message: error.message,
    });
  }
};
