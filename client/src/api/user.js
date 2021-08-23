async function getCurrentUser() {
  const res = await fetch('/whoami');
  if (res.status === 401) {
    return null;
  }
  const body = await res.json();
  return body;
}

async function signup({ email, password }) {
  const res = await fetch('/signup', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const body = await res.json();
  return body;
}

export { getCurrentUser, signup };
