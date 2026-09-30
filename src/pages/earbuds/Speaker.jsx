import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryPage from "../../components/CategoryPage";
import { getspeakerproduct } from "../../redux/product/product.action";

const Speaker = () => {
  const dispatch = useDispatch();
  const { speaker, loading } = useSelector((store) => store.productManager);

  useEffect(() => {
    dispatch(getspeakerproduct());
  }, [dispatch]);

  return (
    <CategoryPage
      title="Wireless Speakers"
      description="Portable and powerful speakers that bring the party anywhere."
      products={speaker?.products || []}
      loading={loading}
    />
  );
};

export default Speaker;
