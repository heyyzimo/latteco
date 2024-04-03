import React, { useEffect, useState } from "react";
import axios from "axios";
function EncodingParametersInURLs() {
  const [a, setA] = useState(34);
  const [b, setB] = useState(23);
  const [welcome, setWelcome] = useState("");
  const fetchWelcome = async () => {
    const response = await axios.get("http://localhost:4000/a5/welcome");
    setWelcome(response.data);
  };

  const [result, setResult] = useState(0);
  const fetchSum = async (a:any, b:any) => {
    const response = await
      axios.get(`http://localhost:4000/a5/add/${a}/${b}`);
    setResult(response.data);
  };
  const fetchSubtraction = async (a:any, b:any) => {
    const response = await axios.get(
      `http://localhost:4000/a5/subtract/${a}/${b}`);
    setResult(response.data);
  };

  useEffect(() => {
    fetchWelcome();
  }, []);


  // parse the string to an integer
  const handleInputChangeA = (e : any) => {
    setA(parseInt(e.target.value, 10)); // Parse input value to an integer
  };

  const handleInputChangeB = (e : any) => {
    setB(parseInt(e.target.value, 10)); // Parse input value to an integer
  };
  return (
    <div>
      <h3>Encoding Parameters In URLs</h3>
      <h4>Integrating React with APIs</h4>
      <h5>Fetching Welcome</h5>
      <h6>{welcome}</h6>
      <h4>Calculator</h4>
      <input type="number" value={a} className="form-control" style={{width:'50%'}} 
        onChange= {handleInputChangeA} />
      <input type="number" value={b} className="form-control" style={{width:'50%'}} 
        onChange= {handleInputChangeB} />
      
      <input  className="form-control" style={{width:'50%'}} value={result} type="number" readOnly />
      <h3>Fetch Result</h3>
      <button className="btn wd-bluebutton form-control" style={{width:'50%'}} onClick={() => fetchSum(a, b)} >
        Fetch Sum of {a} + {b}
      </button><br/>
      <button className="btn wd-redbutton form-control" style={{width:'50%'}}  onClick={() => fetchSubtraction(a, b)} >
        Fetch Substraction of {a} - {b}
      </button>
      <h3>Path Parameters</h3>
      <button className="btn wd-bluebutton">
      <a href={`http://localhost:4000/a5/add/${a}/${b}`} style={{ textDecoration: 'none', color: 'white' }}>
        Add {a} + {b}
      </a>
      </button>
      <button className="btn wd-redbutton" >
      <a href={`http://localhost:4000/a5/subtract/${a}/${b}`} style={{ textDecoration: 'none', color: 'white' }}>
        Substract {a} - {b}
      </a> </button>
      <button className="btn wd-bluebutton" >
      <a href={`http://localhost:4000/a5/multiply/${a}/${b}`} style={{ textDecoration: 'none', color: 'white' }}>
        Multiply {a} * {b}
      </a> </button>
      <button className="btn wd-redbutton" >
      <a href={`http://localhost:4000/a5/divide/${a}/${b}`} style={{ textDecoration: 'none', color: 'white' }}>
        Divide {a} / {b}
      </a> </button>
      <h3>Query Parameters</h3>
      <a className="btn btn-primary wd-bluebutton"
        href={`http://localhost:4000/a5/calculator?operation=add&a=${a}&b=${b}`}>
        Add {a} + {b}
      </a>
      <a className="btn btn-danger wd-redbutton"
        href={`http://localhost:4000/a5/calculator?operation=subtract&a=${a}&b=${b}`}>
        Substract {a} - {b}
      </a>
      <a className="btn btn-primary wd-bluebutton"
        href={`http://localhost:4000/a5/calculator?operation=multiply&a=${a}&b=${b}`}>
        Multiply {a} * {b}
      </a>
      <a className="btn btn-primary wd-redbutton"
        href={`http://localhost:4000/a5/calculator?operation=divide&a=${a}&b=${b}`}>
        Divide {a} / {b}
      </a>

    </div>
    
  );
}
export default EncodingParametersInURLs;


