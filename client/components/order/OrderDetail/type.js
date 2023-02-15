export class OrderDetailProps {
  order_details = {
    created_at: '',
    id: 0
  };
  order_items = [
    {
      order_detail_id: 21,
      product_name: 'Flexi Korea Cina 440gr (korcin)',
      product_category_name: 'FLEXI',
      public_image_url:
        'storage/images/202209080740-Flexi Korea Cina 440gr (korcin).jpg',
      quantity: 1,
      price: '2100000.00'
    }
  ];
  payment_details = [
    {
      id: 2,
      order_detail_id: 21,
      amount: '5860000.00',
      provider: 'MANUAL_TRANSFER',
      status: 'Verifikasi Pembayaran',
      deleted_at: null,
      created_at: '2023-01-20T09:54:08.000000Z',
      updated_at: '2023-01-20T09:54:08.000000Z'
    }
  ];
}
