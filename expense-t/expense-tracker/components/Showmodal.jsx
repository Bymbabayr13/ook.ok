import { useEffect, useState } from "react";
import axios from "axios";

import Select, { StylesConfig } from "react-select";
export function Showmodal({ props }) {
  const [close, setClose] = useState();
  const [amount, setAmount] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [selectedOption, setSelectedOPtion] = useState();
  function addCard() {
    document.getElementById("my_modal_2").showModal();
    setClose(false);
  }
  function fetchCategories() {
    fetch("http://localhost:4000/Categories")
      .then((res) => res.json())
      .then((data) => setCategoryList(data));
  }
  function amountInput(event) {
    setAmount(event.target.value);
  }
  function nameInput(event) {
    setName(event.target.value);
  }
  function TextInput(event) {
    setDescription(event.target.value);
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  const options = categoryList.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  const newRecord = async () => {
    try {
      await axios.post("http://localhost:4000/Transactions", {
        name,
        amount,
        description,
        selectedOption,
      });
      setAmount("");
      setName("");
      setDescription("");
      props();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button className="btn bg-blue-600 text-white px-8" onClick={addCard}>
        +add
      </button>
      <dialog id="my_modal_2" className="modal ">
        <div className="modal-box grid grid-cols-2 ">
          <div className="p-4">
            <h3 className="font-bold text-lg mb-5">add record</h3>
            <div className="flex">
              <button className="btn  bg-blue-600">Expense</button>
              <button className="btn ">Income</button>
            </div>

            <p>Amout</p>
            <input
              className="py-4 input-sm w-full rounded border"
              placeholder="₮ 000,00"
              onChange={amountInput}
            />
            <div>
              <div className="dropdown ">
                <div tabIndex={0} role="button" className="btn mt-3">
                  Category
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-10 menu p-2 shadow fixed  bg-white  dark:text-slate-100 text-slate-900 rounded-box w-52"
                >
                  <Select
                    className="text-black"
                    options={options}
                    onChange={(value) => setSelectedOPtion(value)}
                    defaultValue={selectedOption}
                  />
                </ul>
              </div>
            </div>
            <div></div>
            <form method="dialog">
              <button
                className="btn w-full bg-blue-600 mt-4"
                onClick={newRecord}
              >
                Add Record
              </button>
            </form>
          </div>
          <div className="p-4">
            <p className="">payee</p>
            <input
              className="input-sm rounded border w-full"
              placeholder="write here"
              onChange={nameInput}
            ></input>
            <p className="mt-4 mb-2">Note</p>
            <textarea
              type=""
              className="input-sm border rounded w-full h-full "
              placeholder="note"
              onChange={TextInput}
            ></textarea>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
