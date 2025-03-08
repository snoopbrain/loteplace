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

    // Verificamos si la respuesta tiene contenido antes de intentar convertirla a JSON
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

export const updateProperty = async (propertyId, updatedData) => {
  try {
    const formData = new FormData();
    formData.append('title', updatedData.title);
    formData.append('description', updatedData.description);
    formData.append('price', updatedData.price);
    formData.append('location', updatedData.location);
    formData.append('area', updatedData.area);

    // Si hay una nueva imagen, la añadimos a FormData
    if (updatedData.image) {
      formData.append('image', updatedData.image);
    }

    const response = await fetch(`${APIURL}/${propertyId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
      body: formData, // Enviamos FormData en lugar de JSON
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'Error al actualizar la propiedad');
    }

    return response.json();
  } catch (error) {
    console.error('Error en updateProperty:', error);
    throw error;
  }
};
