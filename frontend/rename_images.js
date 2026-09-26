const fs = require("fs");
const path = require("path");

const publicImagesDir = path.join(__dirname, "public", "images");
const beautyDataFile = path.join(__dirname, "constants", "beauty-data.ts");
const heroScenesFile = path.join(
  __dirname,
  "components",
  "beauty-guide",
  "hero",
  "heroScenes.ts",
);

const directories = ["nails", "makeup", "hair", "hero/desktop"];
const renamingMap = {};

let counter = 1;

directories.forEach((dir) => {
  const fullPath = path.join(publicImagesDir, dir);
  if (fs.existsSync(fullPath)) {
    const files = fs.readdirSync(fullPath);
    files.forEach((file) => {
      if (
        file.endsWith(".jpg") ||
        file.endsWith(".png") ||
        file.endsWith(".jpeg")
      ) {
        const oldRelPath = `/images/${dir}/${file}`;
        const extension = path.extname(file);

        // Generate a short, unique name: category prefix + counter
        const prefix = dir.split("/")[0].substring(0, 3); // nai, mak, hai, her
        const newFileName = `${prefix}-${counter}${extension}`;
        const newRelPath = `/images/${dir}/${newFileName}`;

        renamingMap[oldRelPath] = newRelPath;

        // Rename file on disk
        const oldAbsPath = path.join(fullPath, file);
        const newAbsPath = path.join(fullPath, newFileName);
        fs.renameSync(oldAbsPath, newAbsPath);
        console.log(`Renamed: ${oldRelPath} -> ${newRelPath}`);

        counter++;
      }
    });
  }
});

// Update files
const filesToUpdate = [beautyDataFile, heroScenesFile];

filesToUpdate.forEach((filePath) => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, "utf8");
    let updated = false;

    // Replace all occurrences based on the map
    for (const [oldPath, newPath] of Object.entries(renamingMap)) {
      // Create a global regex for the old path, escaping special characters like spaces and ✨
      const escapedOldPath = oldPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escapedOldPath, "g");

      if (regex.test(content)) {
        content = content.replace(regex, newPath);
        updated = true;
      }
    }

    if (updated) {
      fs.writeFileSync(filePath, content, "utf8");
      console.log(`Updated references in: ${filePath}`);
    }
  }
});
