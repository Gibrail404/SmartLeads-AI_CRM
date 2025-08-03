import api from './axios';

export const loginUser = async (email, password) => {
  const res = await api.post('/user/login', { email, password });
  return res.data;
};

export const signupUser = async ({ fullName, email, password, confirmPassword }) => {
  const res = await api.post('/user/signup', {
    fullName,
    email,
    password,
    confirmPassword,
  });
  return res.data;
};

export const getUser = async () => {
  const res = await api.get('/user/profile'); 
  return res.data;
};

export const updateUser = async (data) => {
  const res = await api.post('/user/update', data); 
  return res.data;
}

export const getLeads = async () => {
  const res = await api.get('/lead/getlead'); 
  return res.data;
};

export const createLead = async (data) => {
  const res = await api.post('/lead/createlead', data); 
  return res.data;
}