const MAX_IMAGE_SIZE = 800; // Maximum width or height in pixels

export const resizeImage = async (file: File): Promise<{ base64String: string; mimeType: string }> => {
  return new Promise((resolve) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      
      // Calculate new dimensions while maintaining aspect ratio
      if (width > height && width > MAX_IMAGE_SIZE) {
        height = Math.round((height * MAX_IMAGE_SIZE) / width);
        width = MAX_IMAGE_SIZE;
      } else if (height > MAX_IMAGE_SIZE) {
        width = Math.round((width * MAX_IMAGE_SIZE) / height);
        height = MAX_IMAGE_SIZE;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      ctx?.drawImage(img, 0, 0, width, height);
      
      // Convert to base64 with reduced quality
      const base64String = canvas.toDataURL(file.type, 0.7).split(',')[1];
      
      URL.revokeObjectURL(img.src);
      resolve({ base64String, mimeType: file.type });
    };
    
    img.src = URL.createObjectURL(file);
  });
}; 