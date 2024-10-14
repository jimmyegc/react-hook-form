import React from 'react'
import { useForm } from "react-hook-form"
import { Headers } from './Headers';

type FormValues = {
  firstName: string
}

let renderCount = 0;

export const FormWithFocus = () => {
  const { register, handleSubmit, setFocus } = useForm<FormValues>()
  const onSubmit = (data: FormValues) => console.log(data)
  renderCount++

  React.useEffect(() => {
    setFocus("firstName")
  }, [setFocus])
  return (<>
    <div>FormWithFocus</div>
    <Headers
      renderCount={renderCount}
      description="Performant, flexible and extensible forms with easy-to-use validation."
    />    
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} placeholder="First Name" />
      <input type="submit" />
    </form>
    <button onClick={() => setFocus("firstName")}>Focus</button>
    </>
  )
}
