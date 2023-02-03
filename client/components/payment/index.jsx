export default function Payment({ data = [] }) {
  return (
    <>
      <style jsx>
        {`
          table {
            width: 100%;
          }

          table thead th {
            text-align: left;
          }
        `}
      </style>
      <table className="table mt-3 table-borderless">
        <thead>
          <th>{"BANK_NAME"}</th>
          <th>{"BANK_NUMBER"}</th>
          <th>{"Name"}</th>
        </thead>
        <tbody>
          {data?.map(
            ({ name, bank_account_number, bank_account_name, uid }) => {
              return (
                <tr key={uid}>
                  <td>{bank_account_name}</td>
                  <td>{bank_account_number}</td>
                  <td>{name}</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </>
  );
}
