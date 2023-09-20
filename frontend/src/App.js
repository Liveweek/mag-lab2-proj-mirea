import axios from "axios";
import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import API from "./api";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState();
  const [changer, setChanger] = useState()
  useEffect(() => {
    axios({
      method: "get",
      url: API + "/todos",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [changer]);
  return (
    <>
    <Header changer={setChanger}/>
    <Tasks data={data} changer={setChanger}/>
    </>
  );
}

export default App;
