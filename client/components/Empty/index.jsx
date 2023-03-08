import { Image } from '@nextui-org/react';
import emptyImage from './assets/empty.png';
import { css } from '@emotion/css';

export default function EmptyData({ title = 'Tidak ada data' }) {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      })}
    >
      <Image src={emptyImage.src} alt="empty-image" width={256} height={256} />
      <p>{title}</p>
    </div>
  );
}
