import { useForm } from 'react-hook-form'
import { InputFirstName } from './InputFirstName'

type Profile = {
  firstname: string
  lastname: string
  age: number
}

export const FormUser = () => {

  const { register, handleSubmit, watch, control, formState: { errors } } = useForm<Profile>()

  const onSubmit = handleSubmit((data) => {
    alert(JSON.stringify(data))
    const fieldArray = generateFieldArray(data);
    console.log(fieldArray);
  })

  console.log('render')

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

  return (
    <main>
      <form onSubmit={onSubmit}>

        <InputFirstName register={register} watch={watch} control={control} />
        {/* <div>
          <label htmlFor="firstname">First Name</label>
          <input {...register('firstname', { required: true })} id="firstname" name="firstname" type="text" />
          {
            errors.firstname && <div className="error">Enter your name</div>
          }
        </div> */}
        <div>
          <label htmlFor="lastname">Last Name</label>
          <input {...register("lastname", { required: true })} id="lastname" name="lastname" type="text" />
          {
            errors.lastname && <div className="error">Enter your last name</div>
          }
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input {...register("age", { required: true })} id="age" name="age" type="text" />
          {
            errors.age && <div className="error">Enter your age</div>
          }
        </div>
        <button type="submit">Save</button>
      </form>
    </main>
  );
}