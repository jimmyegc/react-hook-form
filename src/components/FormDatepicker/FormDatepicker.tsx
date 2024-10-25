import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from './styles.module.scss'
import { Controller, useForm } from 'react-hook-form';

type FormValues = {
  nombre: string
  cita: Date
}
// https://codesandbox.io/p/sandbox/react-hook-form-controller-079xx?file=%2Fsrc%2Findex.js
export const FormDatepicker = () => {

  const {  
    register,
    handleSubmit,
    setFocus,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>()

  //const [startDate, setStartDate] = useState()
  const onSubmit = (data: FormValues) => console.log(data);

  React.useEffect(() => {
    const firstError = Object.keys(errors).reduce((field, a) => {
      return !!errors[field] ? field : a;
    }, null);
    
    if (firstError) {
      setFocus(firstError);
    }
  }, [errors, setFocus]);

  return (<>
    <div>FormDatepicker</div>    
    <form onSubmit={handleSubmit(onSubmit)}>
      <section>
        <Controller
          name="nombre"
          control={control}          
          rules={{ required: 'Last name is required' }}
          render={({ field }) => <input {...field} placeholder="Last Name" />}
        />
        {errors.nombre && <p>{errors.nombre.message}</p>}       
      </section>
      <section>
        <label>React Datepicker</label>
        <Controller
          control={control}          
          name="cita"
          rules={{ required: 'Cita es requerida' }}
          render={({
              field: { onChange, onBlur, value, ref, name }
          }) => (
            <DatePicker
              ref={(elem) => {
                elem && ref(elem.input);
              }}
              name={name}
              className={`${styles.DatePicker}`}
              dateFormat='yyyy/MM/dd h:mm aa'
              onChange={onChange}
              onBlur={onBlur}
              selected={value}                           
            />
          )}
        />
        {errors.cita && <p>{errors.cita.message}</p>}
      </section>      
      <input type="submit" />      
    </form>
    </>
  )
}

/*
<form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name={"birthDate"}
          control={control}
          defaultValue={new Date()}
          rules={{ validate: { isOlderThan2Years } }}
          render={({ field: { onChange, value } }) => {
            return (
              <DatePicker
                onChange={onChange}
                selected={value}
                placeholderText="Enter your birth date"
              />
            );
          }}
        />
        <ErrorMessage
          errors={errors}
          name="birthDate"
          render={({ message }) => <p>{message}</p>}
        />
        <input type="submit" />
      </form>
*/