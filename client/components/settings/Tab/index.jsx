import { Navbar, Text } from '@nextui-org/react';
import { Children, useMemo, useState } from 'react';
import { styTab } from './style';

export default function Tab({ children, headers = [] }) {
  const [activeTab, setActiveTab] = useState(0);

  const tabContent = useMemo(() => {
    if (Array.isArray(children)) {
      return children[activeTab];
    }
    return children;
  }, [activeTab]);

  return (
    <div className={styTab}>
      <Navbar css={{ backgroundColor: 'white' }} isBordered>
        <Navbar.Content>
          {headers.map((header, idx) => (
            <Navbar.Link onClick={() => setActiveTab(idx)} key={header.text}>
              <Text weight="bold">{header.text}</Text>
            </Navbar.Link>
          ))}
        </Navbar.Content>
      </Navbar>
      {tabContent}
    </div>
  );
}
