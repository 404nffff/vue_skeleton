import axiosInstance from './axios';

const PERMISSIONS_KEY = 'user_permissions';

export const getUserPermissions = async () => {
  let permissions = JSON.parse(sessionStorage.getItem(PERMISSIONS_KEY));
  if (!permissions) {
    const response = await axiosInstance.get('/api/permissions');
    permissions = response.data.permissions || [];
    sessionStorage.setItem(PERMISSIONS_KEY, JSON.stringify(permissions));
  }
  return permissions;
};

export const clearUserPermissions = () => {
  sessionStorage.removeItem(PERMISSIONS_KEY);
};
