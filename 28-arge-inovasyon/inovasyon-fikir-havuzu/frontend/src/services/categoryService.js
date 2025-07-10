/* eslint-disable no-undef */
import API from './axios';

export const getCategories = async () => {
  const response = await API.get('/categories');
  return response.data;
};

export const createIdea = async (values, token) => {
  const response = await API.post('/api/ideas', {
    title: values.title,
    description: values.description,
    createdBy: user.userName,
    categoryId: seçilenKategoriId,
    // diğer alanlar...
  }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  // 2. Dosya varsa yükle
  if (values.file) {
    const formData = new FormData();
    formData.append('file', values.file);
    await API.post(`/ideas/${response.data.id}/upload-file`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
  return response.data;
}; 