import React, { useEffect, useState } from "react";
import backendUrl from "../Config";

function Table() {
    const [reversedData, setData] = useState([]);

    useEffect(() => {
        fetch(`${backendUrl}/store/products/`, {})
          .then((response) => response.json())
          .then((data) => {
            if (Array.isArray(data)) {
              // Verify that data is an array
              setData(data.reverse()); // Populate the state variable with fetched data
            } else {
              console.error("Data is not an array:", data);
            }
          })
          .catch((error) => {
            console.error("Error fetching orders:", error);
          });
      }, []);

      return(
        <div  style={{maxHeight: '400px',overflowY:'scroll'}}>
            <h2>Tabela</h2>
            {reversedData.map( (row)=>(
                <li key = {row.id}>{row.id}</li>

            ))}

        </div>
      )
};

export default Table;