import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { toast } from "sonner";
import { db } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function CreateRecipe() {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [images, setImages] = useState([]);
  const [imageInput, setImageInput] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleAddIngredient() {
    if (!ingredientInput.trim()) {
      toast.error("Please enter an ingredient!");
      return;
    }

    setIngredients([...ingredients, ingredientInput.trim()]);
    setIngredientInput("");
  }

  function handleAddImage() {
    if (!imageInput.trim()) {
      toast.error("Please enter a Image URL");
      return;
    }
    setImages([...images, imageInput.trim()]);
    setImageInput("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get("title");
    const cookTime = formData.get("cookTime");
    const method = formData.get("method");

    if (!title) {
      toast.error("Please enter a recipe title!");
      return;
    }
    if (!cookTime) {
      toast.error("Please enter a Cooking Time!");
      return;
    }
    if (!method) {
      toast.error("Please enter a method!");
      return;
    }

    const recipe = {
      title,
      cookTime,
      method,
      ingredients,
      images,
    };
    setLoading(true);

    try {
      await addDoc(collection(db, "recipes"), { ...recipe });
      toast.success("Recipe created successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to create recipe!");
      console.error(err);
    } finally {
      setLoading(false);
    }

    e.target.reset();
    setIngredients([]);
    setImages([]);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-base-100 shadow-md rounded-2xl p-6 w-full max-w-2xl space-y-6 border border-base-300"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">
          Add New Recipe
        </h2>

        <div>
          <label className="label">
            <span className="label-text font-medium">Title:</span>
          </label>
          <input
            type="text"
            name="title"
            className="input input-bordered w-full"
            placeholder="Enter recipe title"
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text font-medium">
              Cooking Time:(minutes)
            </span>
          </label>
          <input
            type="number"
            name="cookTime"
            className="input input-bordered w-full"
            placeholder="Enter Cooking Time"
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text font-medium">Ingredients:</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              className="input input-bordered flex-1"
              placeholder="Enter ingredient"
            />
            <button
              type="button"
              onClick={handleAddIngredient}
              className="btn btn-neutral btn-square"
              title="Add ingredient"
            >
              <CiCirclePlus className="text-2xl" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {ingredients.length > 0 ? (
              ingredients.map((item, i) => (
                <div key={i} className="badge badge-outline">
                  {item}
                </div>
              ))
            ) : (
              <div className="badge badge-outline">No Ingredients Yet!</div>
            )}
          </div>
        </div>

        <div>
          <label className="label">
            <span className="label-text font-medium">Image URLs:</span>
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              className="input input-bordered flex-1"
              placeholder="Enter Image URL"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="btn btn-neutral btn-square"
              title="Add image"
            >
              <CiCirclePlus className="text-2xl" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {images.length > 0 ? (
              images.map((img, i) => (
                <div
                  key={i}
                  className="badge badge-outline max-w-[200px] truncate"
                >
                  {img}
                </div>
              ))
            ) : (
              <div className="badge badge-outline">No Image URL Yet!</div>
            )}
          </div>
        </div>

        {/* METHOD */}
        <div>
          <label className="label">
            <span className="label-text font-medium">Cooking Method:</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full min-h-[100px]"
            name="method"
            placeholder="Enter Cooking Method"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`btn btn-primary w-full ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Apply"
          )}
        </button>
      </form>
    </div>
  );
}
