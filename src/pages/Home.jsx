import { Link } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import { IoMdClose } from "react-icons/io";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { toast } from "sonner";

export default function Home() {
  const { data: recipes, loading } = useCollection("recipes", true);

  async function handleDelete(id) {
    try {
      const docRef = doc(db, "recipes", id)
      await deleteDoc(docRef)
    }
    catch (err) {
      toast.error(err.message)
    }
  }
  console.log(recipes);

  return (
    <div className="my-8">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 flex flex-col gap-8">
        <h2 className="text-xl sm:text-2xl font-medium">Recipes</h2>
        <div
          className="grid gap-8 
              grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="relative bg-base-100 border border-base-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <button
                onClick={() => handleDelete(recipe.id)}
                className="absolute top-3 left-3 bg-black/60 text-white 
             rounded-full w-8 h-8 flex items-center justify-center
             opacity-0 group-hover:opacity-100 
             transition-all duration-300 hover:bg-black z-[50]"
              >
                <div
                  className="tooltip tooltip-bottom "
                  data-tip="Delete"
                >
                  <IoMdClose className="text-base" />
                </div>
              </button>

              <Link to={`/recipe/${recipe.id}`}>
                <figure className="relative w-full h-56 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                </figure>

                <div className="p-5 flex flex-col gap-3">
                  <h2 className="text-lg font-semibold line-clamp-1">
                    {recipe.title}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {recipe.method}
                  </p>
                </div>
                <div className="absolute top-3 right-3 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {recipe.cookTime} min
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
