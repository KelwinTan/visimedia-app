import ListCart from "@/component/list-cart";
import Shimmer from "@/component/loading/shimmer";
import SEO from "@/layout/seo";
import useAuthMiddleware from "middleware/auth.middleware";
import { CartContext } from "provider/cart.provider";
import { useContext, useEffect, useMemo } from "preact/compat";
import routes from "routes";
import { toIDR } from "utils/currency";
import LinkButton from "@/component/button/link/primary";
import useTranslation from "lang/useTranslation";
import { summaryDiscountCart } from "utils/cart";
import Empty from "@/component/empty";

export default function Index() {
  const { t } = useTranslation();
  const { carts, isLoading, refetch } = useContext(CartContext);

  const total_price = useMemo(() => {
    return carts?.cart_details?.reduce((curr, val) => {
      const {
        product: { price },
        quantity,
      } = val;
      return curr + parseInt(price) * parseInt(quantity);
    }, 0)
  }, [carts]);

  const total_discount = useMemo(() => {
    return summaryDiscountCart(carts?.cart_details)
  }, [carts])

  useEffect(() => {
    refetch()
  }, [])
  
  return (
    <>
      <SEO title={"Kleveru - Cart"} desc={"Kleveru - Cart"} />
      <div className="container-klev mb-6">
        {isLoading ? (
          <Shimmer />
        ) : carts?.cart_details?.length > 0 ? (
          <div className="row">
            <div className="col-md-8">
              {carts?.cart_details?.map((data) => {
                return (
                  <ListCart cart_id={carts?.uid} key={data.uid} data={data} />
                );
              })}
            </div>

            <div className="col-md-4 mt-sm-4 mt-mb-0">
              <div
                className="cart-summary position-sticky rounded py-4 px-5 border-0 shadow-sm align-self-start"
                style={{ top: 190 }}
              >
                <h2 className="font-semi-bold">Summary</h2>
                <div className="row">
                  <div className="col-6">
                    <p className="text-secondary">Total Harga</p>
                  </div>
                  <div className="col-6">
                    <p className="text-secondary">Rp {toIDR(total_price)}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-6">
                    <p className="text-secondary">Total Discount</p>
                  </div>
                  <div className="col-6">
                    <p className="text-secondary">Rp {toIDR(total_discount)}</p>
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col-6">
                    <p className="font-semi-bold text-black">Total Price</p>
                  </div>
                  <div className="col-6">
                    <p className="font-semi-bold text-black">
                      Rp {toIDR(total_price - total_discount)}
                    </p>
                  </div>
                </div>

                <LinkButton
                  href={{ pathname: routes.CHECKOUT }}
                  text={`${t("BUY")} (${carts?.cart_details?.length || 0})`}
                />
              </div>
            </div>
          </div>
        ) : (
          <Empty
            title="Your cart is Empty"
            subTitle="Make your dreams come true now"
          />
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  return useAuthMiddleware(ctx, () => {
    return {
      props: {},
    };
  });
}
