import React, { useEffect, useState } from "react";
const Read = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  async function handleDelete(id) {
    const response = await fetch(`http://localhost:8000/${id}`, {
      method: "DELETE",
    });
    const result1 = await response.json();
    if (!response.ok) {
      setError(result1.error);
    }
    if (response.ok) {
      console.log("deleted", response.ok);
      setError("Deleted Successfully");
      setTimeout(() => {
        setError("");
        getData();
      }, 1000);
    }
  }
  async function getData() {
    const response = await fetch("http://localhost:8000");
    const result = await response.json();
    console.log("result..", result);
    if (!response.ok) {
      setError(result.error);
    }
    if (response.ok) {
      setData(result);
      setError("");
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container my-2">
      {error && <div class="alert alert-danger"> {error} </div>}
      <div className="row">
        {data?.map((ele) => (
          <div key={ele._id} className="col-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{ele.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{ele.email}</h6>
                <p class="card-text">{ele.age}</p>
                <span class="card-link">Edit</span>
                <span class="card-link" onClick={() => handleDelete(ele._id)}>
                  Delete
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Read;