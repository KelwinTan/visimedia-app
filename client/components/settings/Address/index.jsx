import { useQuery } from '@tanstack/react-query';
import auth from 'constants/auth';
import { getCookie } from 'cookies-next';
import _axios from 'shared/axios';
import { Loading } from '@nextui-org/react';
import AddressList from './List';
import AddressSearch from './Search';
import { useCallback, useState } from 'react';

export default function Address() {
  const [address, setAddress] = useState([]);
  const [filterAddress, setFilterAddress] = useState([]);

  const { isLoading: loadingGetAddress } = useQuery(
    ['address-user-list'],
    () =>
      _axios
        .get(`addresses/user/21`, {
          headers: {
            Authorization: `Bearer ${getCookie(auth.TOKEN)}`
          }
        })
        .then(res => res.data?.addresses || []),
    {
      onSuccess: data => {
        setAddress(data);
        setFilterAddress(data);
      }
    }
  );

  const onSearch = useCallback(
    search => {
      setFilterAddress(() => {
        if (search?.length) {
          return address.filter(addrr =>
            [
              addrr.address_line1?.toLowerCase(),
              addrr.address_line2?.toLowerCase(),
              addrr.city?.toLowerCase()
            ].includes(search.toLowerCase())
          );
        }
        return address;
      });
    },
    [setAddress]
  );

  if (loadingGetAddress) {
    return <Loading />;
  }

  return (
    <>
      <AddressSearch onSearch={onSearch} />
      {filterAddress.map(addrr => (
        <AddressList key={addrr.id} address={addrr} />
      ))}
    </>
  );
}
