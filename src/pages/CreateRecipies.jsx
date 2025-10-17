import { useState } from "react";


export default function AddRecipe() {

  const [title, setTitle] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [method, setMethod] = useState("");

  function handlesubmit(e) {
    e.preventDefault();

    
  }

  return (
    <div className="pt-16 flex items-center justify-center ">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl border">
        <h1 className="text-center text-2xl font-semibold mb-8 ">
          Add New Recipe
        </h1>

        {/* Title */}
        <label htmlFor="title" className="block text-sm mb-1 text-start ">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Enter your meal name"
          className="w-full mb-4 px-4 py-2  rounded-lg border border-transparent focus:border-indigo-500 outline-none transition"
        />

        {/* Cooking time */}
        <label htmlFor="cooking-time" className="block text-start text-sm mb-1 ">Cooking time</label>
        <input
          type="text"
          id="cooking-time"
          placeholder="e.g. 45 minutes"
          className="w-full mb-4 px-4 py-2  rounded-lg border border-transparent focus:border-indigo-500 outline-none transition"
        />

        {/* Ingredients */}
        <label htmlFor="ingredients" className="block text-sm mb-1 text-start ">Ingredients</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            id="ingredients"
            placeholder="Add ingredient..."
            className="flex-1 px-4 py-2  rounded-lg border border-transparent focus:border-indigo-500 outline-none transition"
          />
          <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-700 px-4 rounded-lg font-bold transition"
          >
            +
          </button>
        </div>

        <ul className="text-sm text-gray-300 mb-4 space-y-1 list-disc pl-5">
    
        </ul>


        {/* Image URL */}
        <label htmlFor="image-url" className="block text-sm text-start mb-1 ">Image URL</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            id="image-url"
            placeholder="Enter image URL"
            className="flex-1 px-4 py-2  rounded-lg border border-transparent focus:border-indigo-500 outline-none transition"
          />
          <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-700 px-4 rounded-lg font-bold transition"
          >
            +
          </button>
        </div>
      

        {/* Method */}
        <label htmlFor="method" className="block text-sm text-start mb-1 ">Method</label>
        <textarea
          id="method"
          placeholder="Enter cooking steps..."
          className="w-full mb-6 px-4 py-2  rounded-lg border border-transparent focus:border-indigo-500 outline-none transition resize-none"
        ></textarea>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-medium">
            Apply
          </button>
          <button className="px-6 py-2 rounded-lg border border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 transition font-medium">
            Preview
          </button>
        </div>
      </div>
    </div>
  );
}
