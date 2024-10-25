import { useState } from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

export const DatePickerRangeOfDates = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const validarRangoFechas = (fechaInicio, fechaFin) => {
    // Verificar que ambas fechas tengan un valor
    if (!fechaInicio || !fechaFin) {
        return "Ambas fechas son necesarias.";
    }

    // Convertir las fechas a objetos Date
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    // Verificar que ambas fechas sean válidas
    if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
        return "Una o ambas fechas no son válidas.";
    }

    // Verificar que la fecha de inicio no sea mayor que la fecha de fin
    if (inicio > fin) {
        return "La fecha de inicio no puede ser mayor que la fecha de fin.";
    }

    // Si pasa todas las validaciones
    return "Las fechas son válidas.";
}


  const handleSearch = () => {
    console.log(validarRangoFechas(startDate, endDate))
  }

  return (<>
    <div>DatePickerRangeOfDates</div>
    <div>
      <DatePicker
        selected={startDate} 
        onChange={(date: Date) => setStartDate(date)}
      />
      <DatePicker 
       selected={endDate} 
       onChange={(date: Date) => setEndDate(date)}
      />
    </div>
    <button onClick={handleSearch}>Search</button>
    </>)
}
