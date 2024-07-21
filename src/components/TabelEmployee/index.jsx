import { Table } from "flowbite-react";
import PropTypes from "prop-types";

const TableEmployee = ({
  columns = [],
  data = [],
  handleInputChange = () => {},
}) => {
  return (
    <Table>
      <Table.Head>
        {columns?.map((column) => (
          <Table.HeadCell key={column?.key}>{column?.header}</Table.HeadCell>
        ))}
      </Table.Head>
      <Table.Body className="divide-y">
        {data?.map((row) => (
          <Table.Row
            key={row?.id}
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            {columns?.map((column) => (
              <Table.Cell
                key={column?.key}
                className="whitespace-nowrap  text-gray-600 dark:text-white"
              >
                <input
                  className="w-full px-2 py-1 border rounded border-none bg-white"
                  type="text"
                  value={row[column.key]}
                  onChange={(e) => handleInputChange(e, row.id, column.key)}
                />
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

TableEmployee.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
      type: PropTypes.string,
    })
  ).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nip: PropTypes.string,
      name: PropTypes.string,
      status: PropTypes.string,
      position: PropTypes.string,
    })
  ),
  handleInputChange: PropTypes.func.isRequired,
};

export default TableEmployee;
