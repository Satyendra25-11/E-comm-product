import { useEffect, useState } from "react";
import useApi from "../shared/api";
import Navbar from "../components/Navbar";
import ProductForm from "./ProductForm";
import { useAuth } from "../context/MyContext";
import { useNavigate } from "react-router";

const ProductPage = () => {
  const [selectedImage, setSelectedImage] = useState();
  // product.images?.[0]

  const [products, setProducts] = useState([]);
  const { setOpenForm, openForm, accessToken } = useAuth();
  const api = useApi();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null)

  const [loaded, setLoaded] = useState(false)
  


  const getProducts = async () => {
    try {
      const response = await api.get("/products");

      setProducts(response.data.data.products);
    } catch (error) {
      console.log(error);
      alert("Proucts not found")
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = async (id) => {

    if (!accessToken) {
      navigate("/auth/login");
      return;
    }

    await api.delete(`products/${id}`);
    getProducts();
  };

  const handleUpdate = async (product) => {
    if (!accessToken) {
      navigate("/auth/login");
      return;
    }

    setSelectedProduct(product)
    setOpenForm(true);

    // ()=> (accessToken ? setOpenForm(true) : navigate("/auth/login"))
  };

  return (
    <div>
      {/* <Navbar openForm = {()=> setOpen(true)}  /> */}

      <ProductForm
        product={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        openForm={openForm}
        setOpenForm={setOpenForm}
        getProducts={getProducts}
        onClose={() => {
          setOpenForm(false)
          setSelectedProduct(null)
        }}
      />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => {
          return (
            <div
              key={p._id}
              className="border border-gray-300 rounded-2xl p-4 flex flex-col gap-5 shadow-sm hover:shadow-lg transition"
            >
              {/* Images */}

              <div>
                {/* <div className="grid md:grid-cols-2 place-items-center gap-4 mt-4"> */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {p.images.slice(0, 5).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      loading="lazy"
                      onLoad={()=>{setLoaded(true)}}
                      alt=""
                      onClick={() => setSelectedImage(image)}
                      className={`w-full aspect-square rounded-lg border object-cover cursor-pointer
                        ${setLoaded ? "block" : "hidden"}
                         ${selectedImage === image
                          ? "border-blue-600"
                          : "border-gray-300"
                      }`}
                    />
                  ))}

                   {!loaded && (
    <div className="w-full h-52 bg-gray-300 animate-pulse rounded-lg"></div>
)}

                </div>
              </div>

              {/* Product Details */}

              <div>
                <h1 className="text-xl sm:text-2xl font-bold break-words">{p.title}</h1>

                <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-4">
                  <div>
                    <p className="text-xl text-green-600 font-semibold mt-1">
                      ₹ {p.price.amount}
                    </p>

                    <p className="mt-1 text-sm text-gray-600 capitalize">
                      <b>Category </b> : {p.category}
                    </p>
                  </div>

                  <div className="mt-2">
                    {p.stock > 0 ? (
                      <button className="bg-green-600 text-white w-full sm:w-auto px-4 py-2 rounded-lg">
                        Available
                      </button>
                    ) : (
                      <button className="bg-red-600 text-white px-6 py-3 rounded-lg">
                        Out of Stock
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-2">
                  <h2 className="text-xl font-semibold ">Description</h2>

                  <p className="text-sm text-gray-700 leading-relaxed break-words">{p.description}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                 onClick={()=>handleUpdate(p)}
                className="flex-1 bg-yellow-400 text-white py-3 rounded-lg">
                      Update
                    </button>
                    <button onClick={()=> handleDelete(p._id)} className="flex-1 bg-red-600 text-white py-3 rounded-lg">
                      Delete
                    </button>
              </div>


            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductPage;
