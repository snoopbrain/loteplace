// authenticationService.js
const APIURL = 'http://146.190.143.234:8080/api/auth';

export const login = async (email, password) => {
  const payload = { email, password };

  try {
    const response = await fetch(`${APIURL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error || 'Error en la autenticación';
      throw new Error(errorMessage);
    }

    // Si la respuesta es exitosa:
    const data = await response.json();
    localStorage.setItem('user', JSON.stringify(data));
    return data;

  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

export const signup = async (name, email, password, municipality, contact) => {
  const payload = { name, email, password, municipality, contact };
  try {
    const response = await fetch(`${APIURL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error || 'Error en el registro';
      throw new Error(errorMessage);
    }

    // Si la respuesta es exitosa:
    const data = await response.json();
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  }catch (error) {
    console.error('Error en signup:', error);
    throw error;
  }

}; 
