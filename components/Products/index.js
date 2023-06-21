import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import { setProducts } from '../../state/actions/products';

const Products = () => {
    //read data from store
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  //on page load as []
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    dispatch(setProducts(filterProducts(await fetchProducts())));
  };

  // api call to fetch products
  const fetchProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    let data = await response.json();
    return data;
  };

  const filterProducts = (products) => {
    return products.filter(
      (product) =>
        product.category === `men's clothing` ||
        product.category === `women's clothing`
    );
  };

  const productCards = products.map((product) => (
    <ProductCard
      key={Math.random()}
      id={product.id}
      title={product.title}
      price={product.price}
      image={product.image}
    />
  ));

  return (
    <div className="grid grid-cols-1 gap-16 justify-center mt-16 md:grid-cols-2 lg:grid-cols-3">
      {productCards}
    </div>
  );
};

export default Products;
