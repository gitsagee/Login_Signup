import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Home.css";
import { handleError, handleSuccess } from '../utils/toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email'); 
    if (!token) {
       
      
      handleError("Please log in first");
      setTimeout(()=>{navigate('/login');},1500);

      return;
    
    }
    setUserEmail(email); 

    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setProducts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    handleSuccess("Successfully logged out");
    setTimeout(()=>{navigate('/login');},1000);
  };

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <div>
      <header className="header">
        <div className="user-info">
          <span>{userEmail}</span> 
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h2 className="product-title">{product.title}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <p className="product-rating">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
          </div>
        ))}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Home;
