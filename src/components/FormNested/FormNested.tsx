import { useForm, useFieldArray } from "react-hook-form";
import type { UseFormRegister, Control, DefaultValues } from "react-hook-form";
import "./styles.css";

type Answer = {
  value: string;
};

type Field = {
  question: Array<string>;
  answers: Array<Answer>;  
};

type FormValues = {
  fields: Array<Field>;
};

type NestedFieldArrayProps = {
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  parentFieldIndex: number;
};

function NestedFieldArray({
  control,
  register,
  parentFieldIndex
}: NestedFieldArrayProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `fields.${parentFieldIndex}.answers`
  });

  return (
    <fieldset>
      <legend>Respuestas</legend>      
      {fields.map((field, index) => (
        <fieldset key={field.id}>
          <legend>Respuesta #{index+1}</legend>
          <label>Value:</label>
          <input
            {...register(`fields.${parentFieldIndex}.answers.${index}.value`)}
          />
          <button type="button" onClick={() => remove(index)}>
            Remove (<i>Respuesta</i>)
          </button>
        </fieldset>
      ))}
      <button
        type="button"
        style={{ border: '1px solid blue'}}
        onClick={() =>
          append({
            value: ""
          })
        }
      >
        +(<i>Respuesta</i>)
      </button>
    </fieldset>
  );
}

const defaultValues: DefaultValues<FormValues> = {
  fields: [
    {
      answers: [{ value: "Respuesta default" }],
      question: ["Pregunta"]
    }
  ]
};

export default function FormNested() {
  const { control, handleSubmit, register } = useForm<FormValues>({
    defaultValues
  });

  const { fields, append, remove } = useFieldArray({ control, name: "fields" });

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Cuestionario:</legend>
        <button
          type="button"
          style={{ border: '1px solid blue'}}
          onClick={() =>
            append({
              question: [""],
              answers: [{ value: "" }],              
            })
          }
        >
          +Pregunta
        </button>
        {fields.map((field, index) => (
          <fieldset key={field.id}>
            <legend>Pregunta #{index+1}</legend>
            <input type="text" placeholder="¿Pregunta?"
              {...register(`fields.${index}.question`)}
            />            
            <button type="button" 
            style={{ border: '1px solid crimson', padding: 8}}
            onClick={() => remove(index)}>
              Eliminar Pregunta              
            </button>

            <NestedFieldArray
              control={control}
              register={register}
              parentFieldIndex={index}
            />
            
          </fieldset>
        ))}
        
      </fieldset>
      <button>Submit</button>
    </form>
  );
}
