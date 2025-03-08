const APIURL = 'http://146.190.143.234:8080/api/lotes';

const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user.token : null;
};

export const getPropertiesByUser = async (userId) => {
  const response = await fetch(`${APIURL}/usuario/${userId}`);
  if (!response.ok) {
    throw new Error('Error al obtener las propiedades del usuario');
  }
  return response.json();
};

export const createProperty = async (formData) => {
  try {
    const response = await fetch(APIURL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
      body: formData,
    });

    console.log("Código de estado:", response.status);

    // Verifica si la respuesta tiene contenido antes de intentar convertirla a JSON
    const text = await response.text();
    console.log("Respuesta de la API:", text);

    if (!response.ok) {
      throw new Error(text || 'Error desconocido al crear la propiedad');
    }

    return text ? JSON.parse(text) : {}; // Si no hay contenido, retorna un objeto vacío
  } catch (error) {
    console.error('Error en createProperty:', error);
    throw error;
  }
};

export const deleteProperty = async (propertyId) => {
  try {
    const response = await fetch(`${APIURL}/${propertyId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al eliminar la propiedad');
    }

    return true;
  } catch (error) {
    console.error('Error en deleteProperty:', error);
    throw error;
  }
}