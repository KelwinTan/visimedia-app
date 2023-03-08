import { cx } from '@emotion/css';
import { Badge } from '@nextui-org/react';
import color from 'constants/color';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { hover } from 'styles/globals';
import { styOrderFilter } from './style';
import { OrderFilterProps } from './type';

/**
 * @param {{filters : OrderFilterProps[]} } props
 */
export default function OrderFilter(props) {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();

  return (
    <>
      {props.filters.map((filter, key) => (
        <Badge
          onClick={() => {
            setActiveTab(key);
            router.replace({
              query: { ...router.query, status: filter.status }
            });
          }}
          key={key}
          css={{
            backgroundColor: activeTab === key ? '' : color.white,
            color: activeTab === key ? color.white : color.primary,
            // borderColor: color.primary,
            border: activeTab !== key ? `1px solid ${color.primary}` : 'none'
          }}
          size="lg"
          className={cx(styOrderFilter, hover)}
        >
          {filter.status}
        </Badge>
      ))}
    </>
  );
}
