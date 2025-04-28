import { useEffect, useState } from 'react';
import { AddModal } from './AddModal.jsx';
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { IoTrashBin } from "react-icons/io5";
import axios from 'axios';

function App() {
  const [modal, setModal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [heads, setHeads] = useState([]);
  const [hd, setHd] = useState(null);
  const [mxPg, setMxPg] = useState(Number.MAX_SAFE_INTEGER);
  const [desc, setDesc] = useState([]);
  const [modDesc, setModDesc] = useState([]);
  const [ids, setIds] = useState([]);
  const [id, setId] = useState(null);
  const [msg, setMsg] = useState("");
  const [trigger, setTrigger] = useState(false);

  async function handleDelete(e, ind) {
    e.preventDefault();
    try {
      const delId = ids[ind];
      const res = await axios.delete(`http://localhost:3001/todo/${delId}`);
      setMsg("✅ Todo Deleted Successfully!");
      setTimeout(() => {
        setMsg(null);
        setTrigger(!trigger);
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  }

  function handleClick(e, head, ind) {
    e.preventDefault();
    setHd(head);
    setModDesc(desc[ind]);
    setId(ids[ind]);
    setModal(1);
  }

  useEffect(() => {
    if (mxPg !== Number.MAX_SAFE_INTEGER && page > mxPg) return;
    async function fetchTodos() {
      try {
        const res = await axios.get("http://localhost:3001/todo/allTodos", {
          params: { page, limit },
        });
        setMxPg(res.data.total);
        const allDesc = [];
        const h = [];
        const mid = [];
        res.data.todos.map((todo) => {
          h.push(todo.title);
          mid.push(todo._id);
          allDesc.push([...todo.description]);
        });
        setHeads(h);
        setDesc(allDesc);
        setIds(mid);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTodos();
  }, [page, limit, modal, trigger]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-purple-100 to-blue-100 p-6">
      <div className="text-4xl text-white bg-blue-800 py-3 rounded-lg text-center shadow-md font-bold tracking-wider">
        ✨ Todo App
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => {
            setHd(null);
            setModDesc(null);
            setId(null);
            setModal(1);
          }}
          className="bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transition"
        >
          ➕ Add Todo
        </button>

        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Page: {page}</h3>
          <AiFillCaretLeft
            className="cursor-pointer text-blue-700 hover:scale-110"
            onClick={() => page > 1 && setPage(page - 1)}
            size={24}
          />
          <AiFillCaretRight
            className="cursor-pointer text-blue-700 hover:scale-110"
            onClick={() => page < mxPg && setPage(page + 1)}
            size={24}
          />
        </div>
      </div>

      {modal === 1 && (
        <AddModal modal={setModal} head={hd} desc={modDesc} id={id} />
      )}

      {msg && (
        <div className="mt-6 bg-green-200 text-green-900 font-semibold px-4 py-2 rounded shadow text-center animate-pulse">
          {msg}
        </div>
      )}

      <div className="overflow-x-auto mt-6 rounded shadow-lg">
        <table className="w-full text-center table-auto border border-gray-300 bg-white">
          <thead>
            <tr className="bg-blue-300 text-gray-800">
              <th className="px-4 py-2 border border-gray-300">Sl No</th>
              <th className="px-4 py-2 border border-gray-300">Title</th>
              <th className="px-4 py-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {heads.map((head, ind) => (
              <tr
                key={ind}
                className="hover:bg-blue-100 transition-colors duration-200"
              >
                <td className="px-4 py-2 border border-gray-300">{ind + 1}</td>
                <td
                  className="px-4 py-2 border border-gray-300 cursor-pointer text-blue-800 font-medium hover:underline"
                  onClick={(e) => handleClick(e, head, ind)}
                >
                  {head}
                </td>
                <td
                  className="px-4 py-2 border border-gray-300 text-red-600 cursor-pointer"
                  onClick={(e) => handleDelete(e, ind)}
                >
                  <IoTrashBin className="inline-block hover:text-red-800 hover:scale-110 transition" size={22} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
