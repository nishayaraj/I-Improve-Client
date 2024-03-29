import { clientCredentials } from '../utils/client';

const getMyRetros = (userId) => fetch(`${clientCredentials.apiUrl}/retros?userId=${userId}`)
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error:', error);
  });

const createRetros = (retro) => fetch(`${clientCredentials.apiUrl}/retros`, {
  method: 'POST',
  body: JSON.stringify(retro),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
  .then((resp) => resp.json())
  .catch((error) => {
    console.error('Error:', error);
  });

const deleteRetros = (retroId) => fetch(`${clientCredentials.apiUrl}/retros/${retroId}`, {
  method: 'DELETE',
});

export {
  getMyRetros,
  createRetros,
  deleteRetros,
};
