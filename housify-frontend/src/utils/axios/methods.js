import { withAuthInstance, withoutAuthInstance } from './axios';

export async function get(url, auth = false) {
  if (!auth) {
    return await withoutAuthInstance.get(url);
  }
  return await withAuthInstance.get(url);
}

export async function post(url, data = {}, auth = false) {
  if (!auth) {
    return await withoutAuthInstance.post(url, data);
  }
  return await withAuthInstance.post(url, data);
}

export async function Delete(url, data = {}, auth = false) {
  if (!auth) {
    return await withoutAuthInstance.delete(url, data);
  }
  return await withAuthInstance.delete(url, data);
}
