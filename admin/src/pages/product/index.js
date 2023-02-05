import { useCallback } from "react";
import { useHistory } from "react-router";
import LayoutContent from "../../components/Layout/Content";
import ProductTable from "./table";

function Category() {
  const navigate = useHistory();

  const onUpdate = useCallback(
    (id) => {
      navigate.push(`/product/detail?id=${id}`);
    },
    [navigate]
  );

  return (
    <LayoutContent
      title="Product"
      actions={[
        {
          text: "Add Product",
          type: "primary",
          onClick: () => {
            navigate.push("/product/detail");
          },
        },
      ]}
    >
      <ProductTable onUpdate={onUpdate} />
    </LayoutContent>
  );
}

export default Category;
