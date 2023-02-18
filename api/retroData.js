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

// Future proofing for stretch goals
// const deleteRetros = (retroId) => fetch(`http://localhost:8000/retros/${retroId}`, {
//   method: 'DELETE',
// });

export {
  getMyRetros,
  createRetros,
};
