export const MAX_IMAGE_SIZE = 800; // Maximum width or height in pixels

export const resizeImage = async (file: File): Promise<{ base64String: string; mimeType: string }> => {
  return new Promise((resolve) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const reader = new FileReader();

    reader.onload = (e) => {
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions while maintaining aspect ratio
        if (width > height) {
          if (width > MAX_IMAGE_SIZE) {
            height = Math.round((height * MAX_IMAGE_SIZE) / width);
            width = MAX_IMAGE_SIZE;
          }
        } else {
          if (height > MAX_IMAGE_SIZE) {
            width = Math.round((width * MAX_IMAGE_SIZE) / height);
            height = MAX_IMAGE_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx?.drawImage(img, 0, 0, width, height);
        const base64String = canvas.toDataURL(file.type);

        resolve({
          base64String,
          mimeType: file.type,
        });
      };

      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}; 