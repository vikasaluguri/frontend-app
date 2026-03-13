import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import "./Content.css";

const API_URL = import.meta.env.VITE_API_URL;

function Content() {
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(AppContext);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/store`);

      // Ensure products is always an array
      const data = Array.isArray(res.data) ? res.data : res.data.products;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);

    if (!exists) {
      const newItem = { ...product, quantity: 1 };
      setCart([...cart, newItem]);
    }
  };

  return (
    <div>
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="box" key={product._id}>
              <img
                src={`${API_URL}/${product.imageUrl}`}
                width="300"
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p>{product.desc}</p>
              <h4>₹{product.price}</h4>
              <p>
                <button onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </p>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}

export default Content;