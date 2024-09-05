import { useForm, useFieldArray } from "react-hook-form";
import type { UseFormRegister, Control, DefaultValues } from "react-hook-form";
import "./styles.css";
import { useRef } from "react";

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
  const dragQuestion = useRef<number>(0)
  const draggedOverQuestion = useRef<number>(0)


  const { control, handleSubmit, register } = useForm<FormValues>({
    defaultValues
  });

  const { fields, append, remove, move } = useFieldArray({ control, name: "fields" });

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }
  
  const handleSortQuestion =() => {

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
          <fieldset key={field.id} 
            draggable 
            onDragStart={() => (dragQuestion.current = index)}
            onDragEnter={() => (draggedOverQuestion.current = index)}
            onDragEnd={() => move(dragQuestion.current, draggedOverQuestion.current)}
            onDragOver={(e)=> e.preventDefault()}
            style={{ border: '1px solid #000', padding: 10}}>
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
