import { useCallback, useEffect, useRef, useState } from "react";
import { prepareImageForUpload } from "../utils/prepareImage.js";
// import { uploadImage } from "../../../api/upload.api";

export default function useImageUpload(initialImage = null) {
  const [selectedImage, setSelectedImage] = useState(initialImage);
  const selectionIdRef = useRef(0);

  useEffect(() => () => {
    if (selectedImage?.preview && !selectedImage.isExistingImage) {
      URL.revokeObjectURL(selectedImage.preview);
    }
  }, [selectedImage]);

  useEffect(() => () => {
    selectionIdRef.current += 1;
  }, []);

  const processFile = useCallback(async (file) => {
    if (!file) return null;

    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("Invalid file type. Please upload a PNG or JPG.");
      return null;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File is too large. Max size is 10MB.");
      return null;
    }

    const selectionId = ++selectionIdRef.current;

    try {
      const preparedFile = await prepareImageForUpload(file);

      if (selectionId !== selectionIdRef.current) return null;

      setSelectedImage({
        file: preparedFile,
        preview: URL.createObjectURL(preparedFile),
        name: file.name,
        size: preparedFile.size,
      });

      return preparedFile;
    } catch (error) {
      console.error("Failed to prepare image:", error);
      alert("The image could not be prepared. Please try another image.");
      return null;
    }
  }, []);

  // Load image from URL (for existing projects from backend)
  const loadFromUrl = useCallback((url) => {
    if (!url) return;

    selectionIdRef.current += 1;
    setSelectedImage({
      preview: url,
      name: 'Project Image',
      isExistingImage: true, // Flag to identify it's from backend
    });
  }, []); // No dependencies - stable function

  const clearImage = useCallback(() => {
    selectionIdRef.current += 1;
    setSelectedImage(null);
  }, []);


  return {
    selectedImage,
    processFile,
    loadFromUrl,
    clearImage
  };
};
