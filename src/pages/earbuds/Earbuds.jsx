import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryPage from "../../components/CategoryPage";
import { getearbudproduct } from "../../redux/product/product.action";

const EarbudProducts = () => {
  const dispatch = useDispatch();
  const { earbuds, loading } = useSelector((store) => store.productManager);

  useEffect(() => {
    dispatch(getearbudproduct());
  }, [dispatch]);

  return (
    <CategoryPage
      title="True Wireless Earbuds"
      description="Compact earbuds with rich sound, long battery life and a comfortable fit."
      products={earbuds?.products || []}
      loading={loading}
    />
  );
};

export default EarbudProducts;
