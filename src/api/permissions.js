import { get } from './axios';

const PERMISSIONS_KEY = 'user_permissions';

import permissionsJson from './permissions.json'

export const getUserPermissions = async () => {

  return permissionsJson;

  let permissions = JSON.parse(sessionStorage.getItem(PERMISSIONS_KEY));

  if (!permissions) {
    const response = await get('/api/permissions');
    permissions = response.permissions || [];
    console.log('permissions:', response);
    sessionStorage.setItem(PERMISSIONS_KEY, JSON.stringify(permissions));
  }
  return permissions;
};

export const clearUserPermissions = () => {
  sessionStorage.removeItem(PERMISSIONS_KEY);
};
