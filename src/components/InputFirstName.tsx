import { useWatch } from "react-hook-form";

export const InputFirstName = ({ register, watch, control }) => {

  //const firstName = watch('firstName') // Re-renders
  const firstName = useWatch({ control, name: 'firstName' }) // No render at all

  return (
    <div className="form-control">
      <p>
        <label>Nombre</label>
      </p>
      <input type="text"
        {...register("firstName", { required: true, minLength: 3 })}
      />
      <p>Lo que va escribiendo el usuario: {firstName}

      </p>

    </div>
  )
};
