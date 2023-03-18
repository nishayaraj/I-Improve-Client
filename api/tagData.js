import { clientCredentials } from '../utils/client';

const getMyTags = (userId) => fetch(`${clientCredentials.apiUrl}/tags?userId=${userId}`)
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error:', error);
  });

const createTag = (tag) => fetch(`${clientCredentials.apiUrl}/tags`, {
  method: 'POST',
  body: JSON.stringify(tag),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
  .then((resp) => resp.json())
  .catch((error) => {
    console.error('Error:', error);
  });

const deleteTag = (tagId) => fetch(`${clientCredentials.apiUrl}/tags/${tagId}`, {
  method: 'DELETE',
});

export {
  getMyTags,
  createTag,
  deleteTag,
};
