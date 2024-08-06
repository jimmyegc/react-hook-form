import { useForm } from "react-hook-form";
import { edadValidator } from "./validators";
import { useEffect } from "react";

export const Formulario = () => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    setValue
  } = useForm({
    defaultValues: {
      nombre: "Luis",
      direccion: "Calle Gran Vía",
      pais: ""
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    const fieldArray = generateFieldArray(data);
    console.log(fieldArray);
  };

  const generateFieldArray = (inputObject) => {
    const resultArray = [];

    for (const [key, value] of Object.entries(inputObject)) {
      // Solo incluir propiedades que no estén vacías o que no sean falsas
      if (value !== "" && value !== false) {
        resultArray.push({
          fieldName: key,
          value: value
        });
      }
    }

    return resultArray;
  }


  const incluirTelefono = watch("incluirTelefono");

  useEffect(() => {
    console.log('done')
    setValue("pais", "fr")
  }, [])

  useEffect(() => {
    if (incluirTelefono) setValue('telefono', "00000")
  }, [incluirTelefono])

  return (
    <div className="bg-slate-200 border-2 border-solid border-sky-500">
      <h4>Formulario</h4>
      <p>Nombre: {watch("nombre")}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            {...register("nombre", {
              required: true,
              maxLength: 10,
            })}
          />
          {errors.nombre?.type === "required" && (
            <p>El campo nombre es requerido</p>
          )}
          {errors.nombre?.type === "maxLength" && (
            <p>El campo nombre debe tener menos de 10 caracteres</p>
          )}
        </div>
        <div>
          <label>Dirección</label>
          <input
            type="text"
            {...register("direccion", {
              required: true,
            })}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            {...register("email", {
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
            })}
          />
          {errors.email?.type === "pattern" && (
            <p>El formato del email es incorrecto</p>
          )}
        </div>
        <div>
          <label>Edad</label>
          <input
            type="text"
            {...register("edad", {
              validate: edadValidator,
            })}
          />
          {errors.edad && <p>La edad debe estar entre 18 y 65</p>}
        </div>
        <div>
          <label>País</label>
          <select {...register("pais")}>
            <option value="es">España</option>
            <option value="it">Italia</option>
            <option value="fr">Francia</option>
          </select>
        </div>
        <div>
          <label>¿Incluir teléfono?</label>
          <input type="checkbox" {...register("incluirTelefono")} />
          incluirTelefono: {JSON.stringify(incluirTelefono)}
        </div>
        {incluirTelefono && (
          <div>
            <label>Teléfono</label>
            <input type="text" {...register("telefono")} />
          </div>
        )}
        <input type="submit" value="Enviar" />
      </form>

      <button onClick={() => setValue("pais", "es")}>España</button>
      <button onClick={() => setValue("pais", "it")}>Italia</button>
      <button onClick={() => setValue("pais", "fr")}>Francia</button>
    </div>
  );
};
