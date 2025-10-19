import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "sonner";

export default function CreateRecipe() {
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  // Ingredient qo‘shish
  function addIngredient() {
    if (!ingredientInput.trim()) return;
    setIngredients([...ingredients, ingredientInput.trim()]);
    setIngredientInput("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get("title");
    const cookTime = formData.get("cookTime");
    const method = formData.get("method");

    if (!title) return toast.error("Please enter recipe title!");
    if (!cookTime) return toast.error("Please enter Cooking Time!");
    if (!method) return toast.error("Please enter method!");
    if (!image) return toast.error("Please enter image URL!");

    const recipe = { title, cookTime, method, ingredients, image };

    setLoading(true);
    try {
      await addDoc(collection(db, "recipes"), recipe);
      toast.success("Recipe created successfully!");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Failed to create recipe.");
    } finally {
      setLoading(false);
      setIngredients([]);
      setIngredientInput("");
      setImage("");
      e.target.reset();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="shadow-md rounded-2xl p-6 w-full max-w-2xl space-y-6 border border-gray-300"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Add New Recipe</h2>

        {/* Cooking Time */}
        <div>
          <label className="font-medium">Cooking Time</label>
          <input
            type="number"
            name="cookTime"
            className="input input-bordered w-full border p-2 rounded"
            placeholder="Enter Cooking Time"
          />
        </div>

        {/* Title */}
        <div>
          <label className="font-medium">Title</label>
          <input
            type="text"
            name="title"
            className="input input-bordered w-full border p-2 rounded"
            placeholder="Enter recipe name"
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="font-medium">Ingredients</label>
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              className="input input-bordered flex-1 border p-2 rounded"
              placeholder="Enter ingredient"
            />
            <button
              type="button"
              onClick={addIngredient}
              className="btn btn-outline p-2"
            >
              <CiCirclePlus size={20} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {ingredients.map((item, i) => (
              <div key={i} className="badge badge-outline">
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Single Image */}
        <div>
          <label className="font-medium">Image URL</label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="input input-bordered w-full border p-2 rounded"
            placeholder="Enter Image URL"
          />
        </div>

        {/* Method */}
        <div>
          <label className="font-medium">Cooking Method</label>
          <textarea
            name="method"
            className="textarea textarea-bordered w-full min-h-[100px] border p-2 rounded"
            placeholder="Enter Cooking Method"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`btn btn-primary w-full ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}
