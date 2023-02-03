import { Text, Dropdown } from '@nextui-org/react';
import Link from 'next/link';
import HamburgerIcon from 'components/Icon/HamburgerIcon';
import { useCategory } from 'providers/categories';
import { useEffect, useState } from 'react';

export default function MenuDesktop() {
  const { getAll } = useCategory();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAll().then(data => setCategories(data));
  }, [getAll]);

  return (
    <>
      <Dropdown>
        <Dropdown.Button light size="sm">
          <HamburgerIcon />
        </Dropdown.Button>
        <Dropdown.Menu>
          {categories.map((data, idx) => (
            <Dropdown.Item key={idx}>
              <Link
                href={{ pathname: '/category/[id]', query: { id: data.id } }}
              >
                <a>
                  <Text weight={'semibold'}>{data.name}</Text>
                </a>
              </Link>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
