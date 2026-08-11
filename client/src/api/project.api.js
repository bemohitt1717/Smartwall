import api from "./axios.js";

/**
 * Upload image and create new project
 * @param {FormData} data - Form data containing image file
 * @returns {Promise} Project creation response
 */
export const uploadImage = async (data) => {
  const response = await api.post("/project/create", data);
  return response.data;
}

/**
 * Save project changes (name and editor state)
 * @param {string} projectId - Project ID
 * @param {Object} data - Project data to update
 * @returns {Promise} Update response
 */
export const saveProject = async (projectId, data) => {
  const response = await api.put(`/project/${projectId}`, data);
  return response.data;
};

/**
 * Get all projects for authenticated user
 * @returns {Promise} List of projects
 */
export const getProjects = async () => {
  const response = await api.get("/project");
  return response.data;
};

/**
 * Get single project by ID
 * @param {string} projectId - Project ID
 * @returns {Promise} Project data
 */
export const getProject = async (projectId) => {
  const response = await api.get(`/project/${projectId}`);
  return response.data;
};

/**
 * Delete project by ID
 * @param {string} projectId - Project ID
 * @returns {Promise} Delete confirmation
 */
export const deleteProject = async (projectId) => {
  const response = await api.delete(`/project/${projectId}`);
  return response.data;
};

/**
 * Save edited image to Cloudinary
 * @param {string} projectId - Project ID
 * @param {Blob} imageBlob - Image blob from canvas
 * @returns {Promise} Save response
 */
export const saveEditedImage = async (projectId, imageBlob) => {
  const formData = new FormData();
  formData.append("image", imageBlob);
  
  const response = await api.patch(`/project/${projectId}/edited-image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

/**
 * Get edited image URL for download
 * @param {string} projectId - Project ID
 * @param {string} format - Image format (png/jpg/webp)
 * @returns {Promise} Edited image data
 */
export const exportEditedImage = async (projectId, format = 'png') => {
  const response = await api.get(`/project/${projectId}/export`, {
    params: { format }
  });
  return response.data;
};