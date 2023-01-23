import api from '../API/posts';

export async function login(email, password) {
  const response = await api.post('/api/v1/login', { email, password });
  localStorage.setItem('user_id', response.data.id);
  localStorage.setItem('user_session_token', response.data.session_token);
  return response.data;
}

export async function logout() {
  const userID = localStorage.getItem('user_id');
  if (userID === null) {
    console.log('No user to logout!');
    return;
  }
  const response = await api.post(`/api/v1/logout/${userID}`);
  localStorage.removeItem('user_id');
  localStorage.removeItem('user_session_token');

  return response.data;
}

export async function signup(email, user_type, password, displayname) {
  const response = await api.post('/api/v1/users', { email, user_type, password, displayname });
  return response.data;
}
