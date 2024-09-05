import { useForm, useFieldArray } from "react-hook-form";
import type { UseFormRegister, Control, DefaultValues } from "react-hook-form";
import "./styles.css";

type Option = {
  value: string;
};

type Field = {
  props: Array<Option>;
  options: Array<string>;
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
    name: `fields.${parentFieldIndex}.props`
  });

  return (
    <fieldset>
      <legend>Nested field array</legend>
      {fields.map((field, index) => (
        <fieldset key={field.id}>
          <legend>Prop #{index}</legend>
          <label>Value:</label>
          <input
            {...register(`fields.${parentFieldIndex}.props.${index}.value`)}
          />
          <button type="button" onClick={() => remove(index)}>
            Remove (<i>Nested</i>)
          </button>
        </fieldset>
      ))}
      <button
        type="button"
        onClick={() =>
          append({
            value: ""
          })
        }
      >
        Append (<i>Nested</i>)
      </button>
    </fieldset>
  );
}

const defaultValues: DefaultValues<FormValues> = {
  fields: [
    {
      props: [{ value: "Some value" }],
      options: [""]
    }
  ]
};

export default function App() {
  const { control, handleSubmit, register } = useForm<FormValues>({
    defaultValues
  });

  const { fields, append, remove } = useFieldArray({ control, name: "fields" });

  return (
    <form onSubmit={handleSubmit(console.info)}>
      <fieldset>
        <legend>Parent field array</legend>
        {fields.map((field, index) => (
          <fieldset key={field.id}>
            <legend>Field #{index}</legend>
            <label>Options</label>
            <select {...register(`fields.${index}.options`)} multiple>
              <option value="" disabled>
                Select an option
              </option>
              <option value="first">First</option>
              <option value="second">Second</option>
              <option value="third">Third</option>
            </select>
            <NestedFieldArray
              control={control}
              register={register}
              parentFieldIndex={index}
            />
            <button type="button" onClick={() => remove(index)}>
              Remove (<i>Parent</i>)
            </button>
          </fieldset>
        ))}
        <button
          type="button"
          onClick={() =>
            append({
              props: [{ value: "" }],
              options: [""]
            })
          }
        >
          Append (<i>Parent</i>)
        </button>
      </fieldset>
      <button>Submit</button>
    </form>
  );
}
