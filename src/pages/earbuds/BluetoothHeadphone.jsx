import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryPage from "../../components/CategoryPage";
import { getbluetoothheadphoneproduct } from "../../redux/product/product.action";

const BluetoothHeadphone = () => {
  const dispatch = useDispatch();
  const { bluetooth_headphone, loading } = useSelector((store) => store.productManager);

  useEffect(() => {
    dispatch(getbluetoothheadphoneproduct());
  }, [dispatch]);

  return (
    <CategoryPage
      title="Bluetooth Headphones"
      description="Wireless over-ear and neckband headphones for all-day listening."
      products={bluetooth_headphone?.products || []}
      loading={loading}
    />
  );
};

export default BluetoothHeadphone;
