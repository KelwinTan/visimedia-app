import first from 'lodash-es/first';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@nextui-org/react';

export default function ListOrderProduct({ data, canReview = false }) {
  return (
    <div className="row mx-0 mb-3">
      <div className="col-sm-12 col-md-6 row">
        {first(data?.product?.product_images) && (
          <div className="col-2 position-relative">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${
                first(data?.product?.product_images)?.image_path
              }`}
              loading="lazy"
              layout="fill"
              objectFit="contain"
              alt={data?.product?.name}
            />
          </div>
        )}
        <div className="col-10">
          <Link
            href={{
              pathname: '/'
            }}
          >
            <a data-dismiss="modal">
              <p>{data?.product?.name}</p>
            </a>
          </Link>
          <p className="text-secondary mb-0">
            {data?.quantity} Product ({data?.product?.shipping_weight}) x Rp.{' '}
            {toIDR(data?.product?.price)}
          </p>
        </div>
      </div>
      <div className="col-sm-12 col-md-3">
        <p className="font-semi-bold nbmm">{PRICE}</p>
        <p className="mb-0">Rp. {toIDR(Number(data?.price))}</p>
      </div>
      {canReview && (
        <div className="col-sm-12 col-md-3">
          <Button color="secondary" text={t('REVIEW')} />
        </div>
      )}
    </div>
  );
}
