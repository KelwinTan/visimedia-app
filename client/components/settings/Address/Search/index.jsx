import { css, cx } from '@emotion/css';
import { Input, Loading, Modal, Spacer, Text } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from 'components/Button';
import FormInput from 'components/Form/Input';
import auth from 'constants/auth';
import { getCookie } from 'cookies-next';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Form, useForm } from 'react-final-form';
import _axios from 'shared/axios';
import getValidatorFromSchema from 'shared/form/getValidator';
import { dFlex, hover } from 'styles/globals';
import { number, object, string } from 'yup';
import { stySearch } from './style';

const schema = object().shape({
  address_line1: string().required('alamat harus diisi'),
  city: string().required('kota harus diisi'),
  postal_code: string().required('kode pos harus diisi'),
  country: string().required('negara harus diisi'),
  receiver_name: string().required('nama penerima harus diisi'),
  receiver_phone_number: number()
    .required('nomor telepon penerima harus diisi')
    .typeError('nomor harus dalam bentuk angka')
});

export default function AddressSearch({ onSearch }) {
  const inputEl = useRef(null);
  const [value, setValue] = useState('');
  const [showModalAdd, setShowModalAdd] = useState(false);
  const client = useQueryClient();
  const { mutateAsync } = useMutation(vars =>
    _axios.post('addresses', vars, {
      headers: {
        Authorization: `Bearer ${getCookie(auth.TOKEN)}`
      }
    })
  );

  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          onSearch(value);
        }
      });
    }
  }, [inputEl.current, value]);

  const onSubmit = useCallback(
    vars => {
      mutateAsync(vars).then(() => {
        setShowModalAdd(false);
        client.refetchQueries(['address-user-list']);
      });
    },
    [mutateAsync, setShowModalAdd, client]
  );

  return (
    <>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={showModalAdd}
        onClose={() => setShowModalAdd(false)}
      >
        <Modal.Header>
          <Text weight="bold" id="modal-title" size={18}>
            Address
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit}>
                <FormInput
                  clearable
                  bordered
                  fullWidth
                  label="Negara"
                  color="primary"
                  size="md"
                  validate={getValidatorFromSchema('country', schema)}
                  name="country"
                />
                <FormInput
                  clearable
                  bordered
                  fullWidth
                  label="Kota"
                  color="primary"
                  size="md"
                  validate={getValidatorFromSchema('city', schema)}
                  name="city"
                />
                <FormInput
                  clearable
                  bordered
                  fullWidth
                  label="Alamat Lengkap"
                  color="primary"
                  size="md"
                  validate={getValidatorFromSchema('address_line1', schema)}
                  name="address_line1"
                />
                <FormInput
                  clearable
                  bordered
                  fullWidth
                  label="Kode Pos"
                  color="primary"
                  size="md"
                  validate={getValidatorFromSchema('postal_code', schema)}
                  name="postal_code"
                />
                <FormInput
                  clearable
                  bordered
                  fullWidth
                  label="Nama Penerima"
                  color="primary"
                  size="md"
                  validate={getValidatorFromSchema('receiver_name', schema)}
                  name="receiver_name"
                />
                <FormInput
                  clearable
                  bordered
                  fullWidth
                  label="Nomor Penerima"
                  color="primary"
                  size="md"
                  validate={getValidatorFromSchema(
                    'receiver_phone_number',
                    schema
                  )}
                  name="receiver_phone_number"
                />
                <Spacer y={0.5} />
                <div
                  className={cx(
                    dFlex,
                    css({
                      justifyContent: 'end',
                      borderTop: '1px solid #dee2e6',
                      paddingTop: 10,
                      marginTop: 7
                    })
                  )}
                >
                  <Button
                    secondary
                    classnames={cx(
                      hover,
                      css({ border: 'none', marginRight: 7 })
                    )}
                    onClick={() => setShowModalAdd(false)}
                  >
                    Kembali
                  </Button>
                  <Button primary type="submit" classnames={hover}>
                    {submitting ? <Loading /> : 'Simpan'}
                  </Button>
                </div>
              </form>
            )}
          />
        </Modal.Body>
      </Modal>

      <div className={stySearch}>
        <Input
          shadow={false}
          onChange={e => setValue(e.target.value)}
          clearable
          ref={inputEl}
          placeholder="Cari alamat"
        />
        <Button
          onClick={() => setShowModalAdd(true)}
          classnames={hover}
          primary
        >
          Add new address
        </Button>
      </div>
    </>
  );
}
