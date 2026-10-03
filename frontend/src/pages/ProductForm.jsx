import axios from "axios";
import { useEffect, useState } from "react";
import useApi from "../shared/api";

const ProductForm = ({ openForm,setOpenForm, onClose, getProducts, product,setSelectedProduct }) => {
  const [formData, setFormData] = useState();
  // const [formData, setFormData] = useState({
  //   title: "",
  //   description: "",
  //   category: "",
  //   amount: "",
  //   stock: "",
  //   images: [],
  // });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        category: product.category,
        amount: product.price.amount,
        stock: product.stock,
        images: product.images,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        category: "",
        amount: "",
        stock: "",
        images: [],
      });
    }
  }, [product]);

  const api = useApi();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "file" ? Array.from(e.target.files) : e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {


    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("amount", formData.amount);
    data.append("stock", formData.stock);

    formData.images.forEach((file) => {
      data.append("images", file);
    });

    if(product){

      const response = await api.put(`/products/${product._id}`,data)
      setSelectedProduct(null)
      
      
      
    }else{
      const response = await api.post("/products", data);
      setSelectedProduct(null)
    }
    
    setOpenForm(false)
    getProducts();


    }
    catch (error) {
        alert("product not created")
        console.log(error);

    }
  };

  if (!openForm) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl p-8 relative">
        {/* Close Button */}

        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-2xl hover:text-red-500"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold mb-6">Product Form</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 h-28"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Category</option>
            <option value="fashion">Fashion</option>
            <option value="electronic">Electronic</option>
            <option value="books">Books</option>
            <option value="home">Home</option>
            <option value="toys">Toys</option>
          </select>

          <input
            type="number"
            name="amount"
            placeholder="Price"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="file"
            name="images"
            multiple
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
