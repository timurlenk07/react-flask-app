import {Button, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";


PermissionsTable.propTypes = {elements: PropTypes.arrayOf(PropTypes.object)}

export function PermissionsTable(elements) {
  return (
    <Table striped hover borderless>
      <thead className="thead-light">
      <tr>
        <th>Név</th>
        <th>Email</th>
        <th>Szerepkör</th>
        <th colSpan="2">Művelet</th>
      </tr>
      </thead>
      <tbody>
      <tr className="align-middle">
        <td className="align-middle">Default Admin</td>
        <td className="align-middle">asd@asd.asd</td>
        <td className="align-middle">Admin</td>
        <td className="pr-0 align-middle text-right">
          <Link to="">Szerkesztés</Link>
        </td>
        <td className="align-middle text-left">
          <Button variant="danger" className="text-uppercase font-weight-bold">Végleges törlés</Button></td>
      </tr>
      </tbody>
    </Table>
  )
}