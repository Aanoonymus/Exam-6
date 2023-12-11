import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../../api";
import { Container } from "../../utils";
import "./Product.scss";
import { truncate } from "../../helpers/truncate";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance(`/api/posts/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log(product);

  return (
    <Container>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        product && (
          <div className="product-wrapper">
            <h1 className="product-title">{truncate(product.title, 30)}</h1>
            <img src={product.image} alt="" />
            <p className="product-description">{product.description}</p>
          </div>
        )
      )}
    </Container>
  );
};

export default Product;
