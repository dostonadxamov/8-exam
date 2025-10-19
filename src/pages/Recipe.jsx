import { useParams, useNavigate } from "react-router-dom";
import { useDocument } from "../hooks/useDocument";

export default function Recipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: recipe } = useDocument("recipes", id);



  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 flex flex-col gap-6 py-8">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
        Recipe elements
      </h2>

      <div className="flex flex-wrap gap-4 text-amber-50 bg-gray-700 rounded-2xl p-3 sm:p-4 w-fit mb-4">
        <img
          key={recipe?.i}
          src={recipe?.image}
          alt="Meal"
          className="w-full sm:w-56 md:w-60 aspect-square object-cover rounded-xl"
        />
      </div>

      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
        {recipe?.title}
      </h2>

      <div className="flex flex-col sm:flex-row sm:items-start gap-2">
        <h3 className="text-sm sm:text-base font-semibold">Ingredients:</h3>
        <ul className="flex flex-wrap justify-start gap-2">
          <li
            className="badge badge-outline  text-xs sm:text-sm">
            {recipe?.ingredients}
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-1">
        <h3 className="text-sm sm:text-base font-semibold">Cooking time:</h3>
        <span className="text-sm sm:text-base">{recipe?.cookTime} minutes</span>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm sm:text-base font-semibold">Method</h3>
        <p className="text-sm sm:text-base leading-relaxed">{recipe?.method}</p>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={() => navigate("/")}
          className="btn btn-neutral normal-case px-5 sm:px-6"
        >
          Back
        </button>
      </div>
    </div>
  );
}
