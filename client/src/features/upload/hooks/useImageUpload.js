import { useState } from "react";
import { useCallback } from "react";
// import { uploadImage } from "../../../api/upload.api";

export default function useImageUpload(initialImage = null) {
  const [selectedImage, setSelectedImage] = useState(initialImage);

  const processFile = (file) => {
    if (!file) return;

    // validation

    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("Invalid file type. Please upload a PNG or JPG.");
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("File is too large. Max size is 10MB.");
      return;
    }
if (selectedImage?.preview) {
    URL.revokeObjectURL(selectedImage.preview);
}

    // Create preview URL
    const imageUrl = URL.createObjectURL(file);
   
    setSelectedImage({
      file,
      preview: imageUrl,
      name: file.name,
      size: file.size,
    });
  };

  // Load image from URL (for existing projects from backend)
  const loadFromUrl = useCallback((url) => {
    if (!url) return;
    
    setSelectedImage({
      preview: url,
      name: 'Project Image',
      isExistingImage: true, // Flag to identify it's from backend
    });
  }, []); // No dependencies - stable function

  const clearImage = () => {
        if(selectedImage?.preview && !selectedImage?.isExistingImage){
        URL.revokeObjectURL(selectedImage.preview);
    }


    setSelectedImage(null)
  };


  return {
    selectedImage,
    processFile,
    loadFromUrl,
    clearImage
  };
};
