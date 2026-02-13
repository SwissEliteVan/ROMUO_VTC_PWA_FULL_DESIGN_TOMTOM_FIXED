const fs = require('fs');
const path = require('path');
const { Image } = require('image-js');

async function checkImageSizes() {
  const categories = ['hero', 'chauffeur', 'dashboard', 'app'];
  const basePath = 'client/src/assets/images';
  
  for (const category of categories) {
    const categoryPath = path.join(basePath, category);
    const files = fs.readdirSync(categoryPath);
    
    for (const file of files) {
      if (path.extname(file) === '.webp') {
        try {
          const image = await Image.load(path.join(categoryPath, file));
          console.log(`${category}/${file}: ${image.width}x${image.height}`);
        } catch (error) {
          console.error(`Erreur sur ${category}/${file}: ${error.message}`);
        }
      }
    }
  }
}

checkImageSizes();