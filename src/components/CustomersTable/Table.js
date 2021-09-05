import React from 'react';
import {
  TriangleLeftIcon,
  TriangleRightIcon,
  KebabHorizontalIcon,
  SortAscIcon,
  SortDescIcon,
} from '@primer/octicons-react';
import './Table.css';

const Table = ({
  page,
  total,
  headers,
  rows,
  toggleState,
  viewCustomer,
  goToPage,
  sortProps,
  sort,
}) => {
  const onRowSelect = (event, row) => {
    event.preventDefault();
    if (row.status) {
      viewCustomer(row._id);
    }
  };

  // Renders the status switch cells
  const renderSwitchCell = (row) => {
    return (
      <td>
        <div className="form-check form-switch table-status-switch">
          <input
            className="form-check-input"
            type="checkbox"
            checked={row.status}
            onChange={() => {
              toggleState(row._id);
            }}
          />
        </div>
      </td>
    );
  };

  // Renders table cells
  const renderCell = (row, field) => {
    return <td onDoubleClick={(e) => onRowSelect(e, row)}>{row[field]}</td>;
  };

  // Renders the headers
  const makeHeaders = () => {
    return (
      <thead>
        <tr>
          {Object.keys(headers).map((header) => {
            return (
              <th key={header} scope="col" onClick={() => sort(header)}>
                {headers[header]}
                {sortProps.field !== header ? null : sortProps.order ===
                  'ASC' ? (
                  <SortAscIcon />
                ) : (
                  <SortDescIcon />
                )}
              </th>
            );
          })}
          <th className="mobile-only">Action</th>
        </tr>
      </thead>
    );
  };

  // Renders the rows in the table
  const makeRows = () => {
    return (
      <tbody>
        {rows.map((row) => {
          return (
            <tr key={row._id} className={row.status ? 'enabled' : 'disabled'}>
              {renderSwitchCell(row)}
              {renderCell(row, 'firstName')}
              {renderCell(row, 'lastName')}
              {renderCell(row, 'company')}
              {renderCell(row, 'city')}
              {renderCell(row, 'state')}
              {renderCell(row, 'digest')}
              <td className="mobile-only" onClick={(e) => onRowSelect(e, row)}>
                <KebabHorizontalIcon />
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  // Renders the footer of the table
  const makeFooter = () => {
    const start = (page - 1) * 10 + 1;
    const lastPage = Math.floor(total / 10) + (total % 10 > 0 ? 1 : 0); // Calc final page
    const end = page === lastPage ? total : page * 10;
    return (
      <div className="table-footer">
        Viewing {start} - {end} of {total} rows
        <button
          className="btn btn-link"
          onClick={() => goToPage(1)}
          disabled={page === 1}
        >
          First
        </button>
        <button
          className="btn btn-primary page-btn"
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
        >
          <TriangleLeftIcon />
        </button>
        <button
          className="btn btn-primary page-btn"
          onClick={() => goToPage(page + 1)}
          disabled={page === lastPage}
        >
          <TriangleRightIcon />
        </button>
        <button
          className="btn btn-link"
          onClick={() => goToPage(lastPage)}
          disabled={page === lastPage}
        >
          Last
        </button>
      </div>
    );
  };

  return (
    <div className="table-wrapper">
      <h4 className="fw-bold">Customers</h4>
      <table className="table table-responsive table-bordered">
        {makeHeaders()}
        {makeRows()}
      </table>
      {makeFooter()}
    </div>
  );
};

export default Table;
