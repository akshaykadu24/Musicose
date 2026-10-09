import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryPage from "../../components/CategoryPage";
import { getheadphoneproduct } from "../../redux/product/product.action";

const Headphone = () => {
  const dispatch = useDispatch();
  const { headphone, loading } = useSelector((store) => store.productManager);

  useEffect(() => {
    dispatch(getheadphoneproduct());
  }, [dispatch]);

  return (
    <CategoryPage
      title="Wired Headphones"
      description="Reliable wired sound with deep bass for music, calls and gaming."
      products={headphone?.products || []}
      loading={loading}
    />
  );
};

export default Headphone;
