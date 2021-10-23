import "./index.scss";
import { useEffect, useState } from "react";
import api from "../../services/api";

export const Cart = () => {
  const [products, setProducts] = useState([]);

  const fixPrice = (num) => {
    const fixedPrice = parseInt(num) / 100;
    return fixedPrice;
  };

  const totalValue = [];
  products.map((x) => {
    totalValue.push(Number(x.sellingPrice));
    return totalValue;
  });
  let sumTotalValue = totalValue.reduce((prev, cur) => {
    return prev + cur;
  }, 0);

  useEffect(() => {
    const response = api.get("items").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <section className="cartContainer">
      <div className="cartWrapper">
        <div className="cartHeader">
          <h1 className="title">Meu Carrinho</h1>
        </div>
        {products?.map((item) => (
          <div className="productCard" key={item.id}>
            <img src={item.imageUrl} alt="Trufa" />
            <div className="productInfo">
              <p className="name">{item.name}</p>
              <p className="normalPrice">R$ {fixPrice(item.price)}</p>
              <p className="bestPrice">R$ {fixPrice(item.sellingPrice)}</p>
            </div>
          </div>
        ))}

        <div className="totalWrapper">
          <p>Total</p>
          <p>R$ {fixPrice(sumTotalValue)}</p>
        </div>
        <div className="messageWrapper">
          {fixPrice(sumTotalValue) >= 10 ? (
            <p className="deliveryMessage">
              Parabéns, sua compra tem frete grátis!
            </p>
          ) : null}
        </div>
        <div className="checkoutButton">
          <button type="submit">Finalizar Compra</button>
        </div>
      </div>
    </section>
  );
};
