import { useFieldArray } from "react-hook-form";

export const NestedFieldArray = ({
    control,
    register,
    parentFieldIndex
  }: NestedFieldArrayProps)  => {
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