async function login({ email, password }: {email: string, password: string}) {
  console.log(email);
  console.log(password);
}

async function signup({ email, password }: {email: string, password: string}) {
  console.log(email);
  console.log(password);
}

function logout() {}

export { login, signup, logout };
