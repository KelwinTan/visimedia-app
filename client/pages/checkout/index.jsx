import Button from "@/component/button/primary";
import SEO from "@/layout/seo";
import useAuthMiddleware from "middleware/auth.middleware";
import { CartContext } from "provider/cart.provider";
import { useContext, useEffect, useMemo, useState } from "preact/compat";
import { useMutation, useQuery } from "react-query";
import { getDiscount, getDiscountPriceLabel, toIDR } from "utils/currency";
import { QUERY_KEY } from "constant/key";
import { getUserAddress } from "@/api/user";
import useTranslation from "lang/useTranslation";
import Shimmer from "@/component/loading/shimmer";
import ModalListAddress from "@/component/modal/address";
import { ceil, toLower } from "lodash-es";
import { getCity, getShipmentCost } from "@/api/shipment";
import ModalVoucher from "@/component/modal/voucher";
import ListCheckout from "@/component/list-checkout";
import ModalConfirmationCheckout from "@/component/modal/confirmation-checkout";
import { useToasts } from "react-toast-notifications";
import { summaryDiscountCart } from "utils/cart";

export default function Index() {
  const [voucher, setVoucher] = useState(null);

  const { t } = useTranslation();
  const { addToast } = useToasts();
  const { carts, isLoading: loading_cart } = useContext(CartContext);

  const { data: address, isLoading: loading_get_address } = useQuery(
    QUERY_KEY.ADDRESS,
    () => getUserAddress()
  );

  const [default_address, setDefault_address] = useState(null);

  const {
    mutate: mutateGetShipping,
    isLoading: loading_get_fee,
    data: deliveries,
  } = useMutation(() => getDeliverFee());

  const [selectedShipment, setSelectedShipment] = useState(null);

  const total_price = useMemo(() => {
    return carts?.cart_details?.reduce((curr, val) => {
      const {
        product: { price },
        quantity,
      } = val;
      return curr + parseInt(price) * parseInt(quantity);
    }, 0);
  }, [carts]);

  let total_discount = useMemo(() => {
    let total = summaryDiscountCart(carts?.cart_details);

    if (voucher) {
      total += getDiscount({
        price: total_price,
        amount: voucher?.amount,
        amount_type: voucher?.amount_type,
      });
    }
    return total;
  }, [carts, voucher]);

  const getDeliverFee = async () => {
    const { city_id } = default_address;
    if (city_id) {
      const weight = carts?.cart_details?.reduce(
        (curr, { product: { shipping_weight } }) => {
          return curr + parseInt(shipping_weight);
        },
        0
      );
      return await getShipmentCost({
        origin: String(city_id),
        weight: ceil(weight / 1000),
      });
    }
    return [];
  };

  useEffect(() => {
    if (default_address) mutateGetShipping();
  }, [default_address]);

  useEffect(() => {
    setDefault_address(address?.find((d) => d.is_default == "1"));
  }, [address]);

  useEffect(() => {
    setSelectedShipment(null);
  }, [deliveries]);

  useEffect(() => {
    if (voucher?.minimum_payment > total_price) {
      addToast(<>insufficient total price with minimum price </>, {
        appearance: "error",
      });
      setVoucher(null);
    }
  }, [voucher]);

  const canCheckout = useMemo(() => {
    return carts?.cart_details?.reduce(
      (curr, { product: { stocks } }) => curr && stocks > 0,
      true
    );
  }, [carts]);

  return (
    <>
      <SEO title={"Kleveru - Checkout"} desc={"Kleveru - Checkout"} />

      <ModalListAddress
        id="modal-address"
        address={address}
        onSelect={(val) => setDefault_address(val)}
      />

      <ModalVoucher onSubmit={(voucher) => setVoucher(voucher)} />
      <ModalConfirmationCheckout
        data={{
          total_price: total_price - total_discount,
          shipment: selectedShipment,
          voucher,
          default_address,
        }}
      />

      <div className="container-klev pt-5 mb-6">
        <div className="row">
          <div className="col-md-8">
            {loading_get_address ? (
              <Shimmer />
            ) : (
              <section className="checkout-address">
                <h3 className="font-semi-bold">Checkout</h3>
                <p>{t("ADDRESS")}</p>
                <hr />
                {default_address && (
                  <>
                    <p>{default_address?.name}</p>
                    <p>{default_address?.phone_number}</p>
                    <p>{default_address?.address} </p>
                    <p>
                      {default_address?.sub_district}, {default_address?.city},{" "}
                      {default_address?.province}
                    </p>
                  </>
                )}
                <hr />
                <button
                  className="btn rounded border-secondary font-regular text-secondary"
                  data-toggle="modal"
                  data-target="#modal-list-address"
                >
                  {t("CHOOSE_OTHER_ADDRESS")}
                </button>
              </section>
            )}

            <hr />
            <p className="font-semi-bold">Deliver Method</p>
            <div className="dropdown">
              {loading_get_fee || loading_get_address ? (
                <Shimmer length={0} />
              ) : (
                <>
                  <button
                    className="btn bg-primary dropdown-toggle text-white font-semi-bold"
                    type="button"
                    id="triggerId"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {!selectedShipment
                      ? "Choose Delivery"
                      : `${selectedShipment?.code} Rp.${selectedShipment?.cost}`}
                  </button>
                  <div className="dropdown-menu" aria-labelledby="triggerId">
                    {deliveries?.length == 0 ? (
                      <p className="col-12 mb-0">{t("NO_SERVICE")}</p>
                    ) : (
                      deliveries?.map(({ code, cost, day }, idx) => {
                        return (
                          <a
                            key={idx}
                            className="dropdown-item hover"
                            onClick={() =>
                              setSelectedShipment({ code, cost, day })
                            }
                          >
                            <div className="row">
                              <div className="col-8">
                                <b>{code}</b> <br />
                                <p className="mb-0">Estimasi {day} hari</p>
                              </div>
                              <div className="col-4">{cost}</div>
                            </div>
                          </a>
                        );
                      })
                    )}
                  </div>
                </>
              )}
            </div>

            <hr style={{ borderWidth: 7 }} />

            {loading_cart ? (
              <Shimmer />
            ) : (
              <>
                {carts?.cart_details?.map((data) => {
                  return <ListCheckout key={data.uid} data={data} />;
                })}
              </>
            )}
          </div>

          <div className="col-md-4 mt-sm-4 mt-mb-0">
            <div
              className="cart-summary position-sticky rounded p-4 border-0 shadow-sm align-self-start"
              style={{ top: 150 }}
            >
              <button
                data-toggle="modal"
                data-target="#modal-voucher"
                className="btn w-100 mb-4 text-secondary font-semi-bold shadow-sm d-flex p-3 rounded"
              >
                <span className="d-flex w-100">
                  {!voucher ? (
                    t("SAVE_MORE_WITH_PROMOS")
                  ) : (
                    <>
                      <span className="font-semi-bold">voucher applied</span>
                      <span className="ml-2 badge badge-pill bg-primary text-white center-v-h">
                        {getDiscountPriceLabel({
                          amount: voucher?.amount,
                          amount_type: voucher?.amount_type,
                        })}
                      </span>
                    </>
                  )}
                </span>
                <span className="ml-auto">
                  <i className="fa fa-chevron-right" aria-hidden="true"></i>
                </span>
              </button>

              <h5 className="font-semi-bold">Summary</h5>
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

              <Button
                text={"Checkout"}
                disabled={deliveries?.length == 0 || !canCheckout}
                data_attribute={{
                  ["data-target"]: "#modal-confirmation-checkout",
                  ["data-toggle"]: "modal",
                }}
              />
            </div>
          </div>
        </div>
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
