const APIURL = 'http://146.190.143.234:8080/api/lotes';


export const getPropertiesByUser = async (userId) => {
  const response = await fetch(`${APIURL}/usuario/${userId}`);
  if (!response.ok) {
    throw new Error('Error al obtener las propiedades del usuario');
  }
  return response.json();
}