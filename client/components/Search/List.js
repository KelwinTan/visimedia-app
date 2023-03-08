import { Card, Divider, Text } from '@nextui-org/react';
import { css } from '@emotion/css';
import {
  array,
  arrayOf,
  bool,
  func,
  number,
  objectOf,
  string
} from 'prop-types';
import Link from 'next/link';
import { hover } from 'styles/globals';
import noop from 'shared/utils/noop';

const styles = {
  container: css`
    position: absolute;
    top: 45px;
    width: 100%;
    border-radius: 8px;
    padding: 4px;
  `
};

export default function ListSearch({ data = [], show = false, onSelected }) {
  if (!show) {
    return null;
  }
  return (
    <Card className={styles.container}>
      {data.map((d, idx, arr) => (
        <>
          <Link
            href={{ pathname: '/product/[id]', query: { id: d.id } }}
            legacyBehavior
          >
            <Text onClick={onSelected} className={hover}>
              {d.name}
            </Text>
          </Link>
          {idx < arr.length - 1 && <Divider />}
        </>
      ))}
    </Card>
  );
}

ListSearch.propTypes = {
  data: arrayOf(objectOf({ id: number, name: string })),
  show: bool,
  onSelected: func
};

ListSearch.defaultProps = {
  data: [],
  show: false,
  onSelected: noop
};
