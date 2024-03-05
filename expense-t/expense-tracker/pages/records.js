import { CategoryList } from "@/components/CategoryLIst";
import { Header } from "@/components/Header";
import { Showmodal } from "@/components/Showmodal";
import axios from "axios";
import { useEffect, useState } from "react";

export default function () {
  const [render, setRender] = useState([]);

  useEffect(() => {
    fetchdata();
  }, []);

  function fetchdata() {
    fetch("http://localhost:4000/Transactions", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setRender(data));
  }

  async function removeCard(id) {
    if (confirm("delete?")) {
      try {
        await axios
          .delete(`http://localhost:4000/Transactions/${id}`)
          .then(() => {
            fetchdata();
          });
      } catch (error) {
        console.log(error);
      }
    }
  }
  console.log(render);
  async function updateCard() {
    return;
  }
  return (
    <div className="container mx-auto m-4">
      <Header />
      <div className="flex mt-5">
        <div className="w-1/4 pr-4 mr-4">
          <h1 className="font-bold text-2xl mb-4">Records</h1>
          <Showmodal props={fetchdata} />
          <CategoryList />
        </div>

        <div className="w-3/4 pl-4 ml-6">
          {render.map((item) => {
            return (
              <div className="card grid grid-cols-2 my-4  bg-slate-700 p-4">
                <div className="">
                  <button
                    onClick={() => {
                      removeCard(item.id);
                    }}
                    className="btn"
                  >
                    delete
                  </button>
                  <button
                    onClick={() => {
                      updateCard(item.id);
                    }}
                    className="btn"
                  >
                    update
                  </button>
                  <p className="font-bold text-xl">{item.name}</p>
                  <div className="flex gap-2">
                    <input type="checkbox"></input>
                    <p className="font-bold text-xl">{item.category_name}</p>
                  </div>
                  <p>{item.description}</p>
                </div>
                <div className="flex justify-end items-center">
                  <div>{item.amount}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
