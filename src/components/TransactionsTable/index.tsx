import { useMenus } from "../../hooks/useMenus";

import * as FaIcons from "react-icons/fa"

import { Container } from "./styles";


export function TransactionsTable() {
  const { menus, deleteMenu, exportMenu } = useMenus();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Application</th>
          </tr>
        </thead>
        <tbody>
          {menus.map(transaction => {
            return (
              <tr key={transaction.id}>
                <td>{transaction.name}</td>
                <td>{transaction.application}</td>
                <td>        
                  <button type="button" onClick={()=>exportMenu(transaction.id.toString())}>
                    <FaIcons.FaSave/>
                  </button>               
                  <button type="button"  onClick={()=>deleteMenu(transaction.id.toString())}>
                    <FaIcons.FaTrash/>
                  </button>
                  <button type="button"  onClick={()=>console.log("Ola")}>
                    <FaIcons.FaInfo/>
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Container>
  )
}