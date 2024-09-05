import { useFieldArray, useForm } from "react-hook-form"

export const FormArrayFields = () => {

  

    const { register, control, handleSubmit } = useForm({
        defaultValues: {
          questions: [{ label: "" }],
          answers: [{ label: "", action: "", webformId: 0 }],
          test: [{ nombre: "Jimmy", apellido: "Garcia" }]
        },
        mode: "onChange"
    })

    const { fields: fieldsQuestion, append: appendQuestion, remove: removeQuestion } = useFieldArray({
      control, 
      name: "questions"
    })

    const { fields, append, remove } = useFieldArray({
      control, 
      name: "answers"
    })

    /*const { fields, append, remove } = useFieldArray({
        control, 
        name: "test"
    })*/

    
    const onSubmit = (values) => {
      console.log(values)
    }



  return (<>
    <div>FormArrayFields</div>

    <button onClick={()=> appendQuestion({ label: "¿?" })}>+Pregunta</button> |
    {/* <button onClick={() => append({ nombre: "nuevo", apellido: "nuevo apellido" })}>Agregar</button> */}
    <button onClick={() => append({ label: "", action: "n", webformId: 0 })}
      style={{ border: '1px solid #000'}}
      >+ Respuesta</button> 

    {/* {JSON.stringify(fields)} */}



    <form onSubmit={handleSubmit(onSubmit)}>
    

      {fieldsQuestion.map((item, index) => (
        <div key={index}>
          <input type="text" 
          style={{ border: '1px solid #000'}}
            {...register(`questions.${index}.label`)} 
          />
          <button>X</button>

          {fields.map((item2, index2) => (
        <div key={index2}>          
          <input 
            type="text" 
            style={{ border: '1px solid #000'}}
            {...register(`answers.${index2}.label`)} 
          />
          <input 
            type="text" 
            style={{ border: '1px solid #000'}}
            {...register(`answers.${index2}.action`, { required: true })} 
          />    
          
          <button onClick={() => remove(index2)}>X</button>      
        </div>      
      )
    )}

        </div>
      )) }
      
     
    <button type="submit">Enviar</button>
    </form>
    
    </> )
}
