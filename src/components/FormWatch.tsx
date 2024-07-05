import { useForm } from "react-hook-form"

export const FormWatch = () => {
  const { register, handleSubmit, watch } = useForm()
  const likesCakes = watch("likesCakes")

  const onSubmit = (data) => {
    alert(JSON.stringify(data))
  }

  return (<div className="bg-blue-200">
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name: </label>
        <input type="text" {...register("name")} />
      </div>
      <div>
        <label htmlFor="likesCakes">Likes Cakes:</label>
        <input type="checkbox" id="likesCakes"
          {...register("likesCakes")}
        />
      </div>
      {likesCakes && (
        <div>
          <label htmlFor="favoriteFlavour">Favourite Flavour:</label>
          <select id="favoriteFlavour"
            {...register("favoriteFlavour")}
          >
            <option value="chocolate">Chocolate</option>
            <option value="lime">Lime</option>
            <option value="coconout">Coconout</option>
            <option value="mango">Mango</option>
          </select>

        </div>
      )}
      <button>Submit</button>
    </form>
  </div>)
}