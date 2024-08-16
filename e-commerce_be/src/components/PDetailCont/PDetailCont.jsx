import { useEffect } from "react";
import { useParams } from "react-router-dom";

function PDetailCont(){
     const {product_id} = useParams()
    useEffect(()=>{

        console.log(product_id);
    },[product_id]) 
return(<>
<p>hola</p>
</>)
}

export default PDetailCont