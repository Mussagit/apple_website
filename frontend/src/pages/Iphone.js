// pages/Iphone.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import YoutubeAPI from "../components/Youtub/YoutubeAPI";
import "./Iphone.css";

function Iphone() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await api.get("/products");
        const list = response.data?.products || response.data?.data || response.data || [];
        setProducts(list);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Could not load iPhone products. Is the backend running?");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  let flip = false;

  return (
    <div className="iphone-page-wrapper">
      <section className="internal-page-wrapper">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-12 mt-5 pt-5">
              <h1 className="font-weight-bold" style={{ fontSize: "48px", fontWeight: "700" }}>
                Iphones
              </h1>
              <div className="brief-description mb-5" style={{ fontSize: "21px", color: "#6e6e73" }}>
                The best for the brightest.
              </div>
            </div>
          </div>

          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading iPhones...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-danger text-center my-4" role="alert">
              {error}
            </div>
          )}

          {products?.map((product) => {
            let order1 = 1;
            let order2 = 2;
            if (flip) {
              order1 = 2;
              order2 = 1;
              flip = !flip;
            } else {
              flip = !flip;
            }

            return (
              <div
                key={product.product_id}
                className="row justify-content-center text-center product-holder h-100 my-5 py-4 align-items-center"
              >
                <div className={`col-sm-12 col-md-6 my-auto order-${order1}`}>
                  <div className="product-title" style={{ fontSize: "38px", fontWeight: "600", color: "#1d1d1f" }}>
                    {product.product_name}
                  </div>
                  <div className="product-brief" style={{ fontSize: "19px", color: "#1d1d1f", marginTop: "8px" }}>
                    {product.product_brief_description}
                  </div>
                  <div className="starting-price" style={{ fontSize: "15px", color: "#86868b", marginTop: "12px" }}>
                    {`Starting at ${product.starting_price}`}
                  </div>
                  <div className="monthly-price" style={{ fontSize: "13px", color: "#86868b" }}>
                    {product.price_range}
                  </div>
                  <div className="links-wrapper mt-3">
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      <li>
                        <Link
                          to={`/iphone/${product.product_id}`}
                          style={{ color: "#06c", textDecoration: "none", fontSize: "17px" }}
                        >
                          Learn more &gt;
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className={`col-sm-12 col-md-6 order-${order2}`}>
                  <div className="product-image">
                    <img
                      src={product.product_img}
                      alt={product.product_name}
                      className="img-fluid"
                      style={{ maxHeight: "400px", objectFit: "contain" }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <YoutubeAPI />
    </div>
  );
}

export default Iphone;
