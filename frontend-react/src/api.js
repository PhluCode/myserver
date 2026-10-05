const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function request(method, path, body) {
  const res = await fetch(API + path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = typeof data.message === 'string' ? data.message : JSON.stringify(data.message);
    throw new Error(`(${res.status}) ${message}`);
  }
  return data;
}
