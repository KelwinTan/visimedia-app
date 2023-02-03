import { Button } from "@nextui-org/react";
import InputFile from "components/input/file";
import InputField from "components/input/text";
import Payment from "components/payment";
import { Form } from "react-final-form";
import { useRouter } from "next/router";

const FILE_SIZE = 8 * 1024 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

export default function Index() {
  const {
    query: { transaction_id },
    push,
  } = useRouter();

  return (
    <>
      <div className="mx-auto col-sm-12 col-md-5">
        <Form
          onSubmit={({ payment_image, ...values }) =>
            mutateUploadImage({ ...values, payment_image: payment_image[0] })
          }
          className="mb-4"
          validate={(values) => {
            /** all validation should occur here */
            return {};
          }}
          render={({ handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <InputFile
                  accept={"image/*"}
                  type="file"
                  name="payment_image"
                  label="Image"
                />
                <InputField name="payment_notes" label="Notes" />
                <Button loading={true} type="submit" text="Upload" />
              </form>
            );
          }}
        />

        <Payment
          data={[
            {
              name: "Jimmy",
              bank_account_name: "BCA",
              bank_account_number: "5785 887 333",
            },
          ]}
        />
      </div>
    </>
  );
}
