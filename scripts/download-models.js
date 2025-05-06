const fs = require("fs");
const path = require("path");
const https = require("https");

const models = [
  "tiny_face_detector_model-weights_manifest.json",
  "tiny_face_detector_model-shard1",
  "face_landmark_68_model-weights_manifest.json",
  "face_landmark_68_model-shard1",
  "face_expression_model-weights_manifest.json",
  "face_expression_model-shard1",
];

const modelDir = path.join(__dirname, "../public/models");

// Create models directory if it doesn't exist
if (!fs.existsSync(modelDir)) {
  fs.mkdirSync(modelDir, { recursive: true });
}

// Function to download a file
const downloadFile = (url, filePath) => {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(
            new Error(`Failed to download ${url}: ${response.statusCode}`)
          );
          return;
        }

        const file = fs.createWriteStream(filePath);
        response.pipe(file);

        file.on("finish", () => {
          file.close();
          console.log(`Downloaded ${path.basename(filePath)}`);
          resolve();
        });

        file.on("error", (err) => {
          fs.unlink(filePath, () => {}); // Delete the file if there's an error
          reject(err);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

// Download all models
const downloadAllModels = async () => {
  console.log("Starting model downloads...");

  for (const model of models) {
    const url = `https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/${model}`;
    const filePath = path.join(modelDir, model);

    try {
      await downloadFile(url, filePath);
    } catch (error) {
      console.error(`Error downloading ${model}:`, error.message);
      process.exit(1);
    }
  }

  console.log("All models downloaded successfully!");
};

// Run the download
downloadAllModels().catch(console.error);
