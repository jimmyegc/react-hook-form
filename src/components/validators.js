
const calcularEdad = (fechaNacimiento) => {
  // Convertir la fecha de nacimiento en un objeto Date
  const fechaNacimientoDate = new Date(fechaNacimiento);
  
  // Obtener la fecha actual
  const fechaActual = new Date();
  
  // Calcular la diferencia de años
  let edad = fechaActual.getFullYear() - fechaNacimientoDate.getFullYear();
  
  // Verificar si el cumpleaños de este año ya ocurrió
  const mesActual = fechaActual.getMonth();
  const diaActual = fechaActual.getDate();
  const mesNacimiento = fechaNacimientoDate.getMonth();
  const diaNacimiento = fechaNacimientoDate.getDate();
  
  // Si el cumpleaños no ha ocurrido aún en el año actual, restar 1
  if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
      edad--;
  }
  
  return edad;
}

const edadValidator = (value) => {
  const edad = calcularEdad(value)
  return edad >= 18 && edad <= 65;
};

export { edadValidator };
