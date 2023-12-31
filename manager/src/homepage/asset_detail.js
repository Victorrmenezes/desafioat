import React, { useEffect, useState } from "react";
import backendUrl from "../Config";
import axios from "axios";
import { useParams } from "react-router-dom";

function AssetDetail(){
  const state = {
    detail:[],
    assetCode:'',
    assetName:''
  }

  const [detail, setDetail] = useState([]);
  const [assetCode, setCode] = useState([]);
  const [assetName, setName] = useState([]);
  
  const { userAssetId } = useParams();

  useEffect(() => {
    axios.get(`${backendUrl}/manager/detail/${userAssetId}`)
      .then((data) => {
        setDetail(data);
        setCode(data.data[0].asset.code);
        setName(data.data[0].asset.name);
      })
  }, [userAssetId]);

  return(
    <div>
      <div style={{display:"flex"}}>
        
        <h3 style={{margin:'15px'}}>{ assetCode} - {assetName}</h3>
      </div>
      <div style={{maxHeight:'450px',overflow:'scroll' }}>
        <table className="table table-striped">
          <thead >
            <tr>
              <th>Data</th>
              <th>Hora</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(detail.data) && detail.data.map( (row) => (
              <tr key={row.id}>
                <td>{new Date(row.created_at).getDate()}/{new Date(row.created_at).getMonth()+1}/{new Date(row.created_at).getFullYear()+1}</td>  
                <td>{new Date(row.created_at).getHours().toString().padStart(2,'0')}:{new Date(row.created_at).getMinutes().toString().padStart(2,'0')}</td>  
                <td>R$ {row.price}</td>  
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}


// class AssetDetail extends Component {
//   state = { 
//       details: []
//    };

//   //  handleAdd = async asset => {
//   //      asset.user = 1;
//   //      asset.asset = asset.id;
//   //      console.log(asset);
//   //      await axios.post(`${backendUrl}/manager/add/`,asset);
       
//   //     const marketAssets =this.state.marketAssets.filter(a => a.id !== asset.id);
       
//   //      this.setState({marketAssets})
//   //  }
  
//   async componentDidMount() {

//     // const id = this.props.match.params.id;
//     const id=70;
//     const {data: details} = await axios.get(`${backendUrl}/manager/detail/${id}`);
//     this.setState({details})
//     console.log(details)
//   };

//   render() { 
//       return (
//           <div>
//               {this.state.details.map( row =>(
//                   <div>
//                     {row.asset.code}
//                   </div>
//               ) )}
//           </div>
//       );
//   }
// }

export default AssetDetail;