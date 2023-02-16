import { Image } from '@nextui-org/react';
import emptyImage from './assets/empty.png';

export default function EmptyData({ title = 'Tidak ada data' }) {
  return (
    <div>
      <Image src={emptyImage} alt="empty-image" />
      <p>{title}</p>
    </div>
  );
}
