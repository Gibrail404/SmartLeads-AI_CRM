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
  return res;
};

export const addLead = async (data) => {
  const res = await api.post('/lead/createlead', data); 
  return res.data;
}

export const aiChat = async (data) => {
  const res = await api.post('/ai/chat', data); 
  return res.data;
}



export const getUserId = async () => {
  const res = await api.get('/user/me'); 
  return res;
}


// Ai Insights 
export const kpiMetrics = async () => {
  const res = await api.get('/insights/kpimetrics'); 
  return res.data;
}

//Analytics
export const getAnalytics = async () => {
  const res = await api.get('/analytics/all'); 
  return res.data;
}