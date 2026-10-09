import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryPage from "../../components/CategoryPage";
import { getwatchproduct } from "../../redux/product/product.action";

const Watch = () => {
  const dispatch = useDispatch();
  const { watch, loading } = useSelector((store) => store.productManager);

  useEffect(() => {
    dispatch(getwatchproduct());
  }, [dispatch]);

  return (
    <CategoryPage
      title="Smart Watches"
      description="Stylish smart watches from our wearable partner, built for everyday tracking."
      products={watch?.products || []}
      loading={loading}
    />
  );
};

export default Watch;
