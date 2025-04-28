import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function AddModal({ modal, head, desc , id }) {
  console.log(id);
  const [heading, setHeading] = useState('');
  const [items, setItems] = useState(['']);
  const inputRefs = useRef([]);

  // Autofill if head and desc are provided
  useEffect(() => {
    if (head) setHeading(head);
    if (desc && Array.isArray(desc)) setItems(desc);
  }, [head, desc]);

  // Sync refs with item count
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, items.length);
  }, [items]);

  // Capitalize first letter of each sentence
  const capitalizeSentences = (str) => {
    return str
      .split(/([.!?]\s*)/g)
      .map((segment) =>
        segment.length > 0
          ? segment.charAt(0).toUpperCase() + segment.slice(1)
          : ''
      )
      .join('');
  };

  // Add new input on Enter
  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index + 1, 0, '');
      setItems(newItems);
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 0);
    }
  };

  // Handle item input change
  const handleChange = (e, index) => {
    const capitalized = capitalizeSentences(e.target.value);
    const newItems = [...items];
    newItems[index] = capitalized;
    setItems(newItems);
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    try {
        if(id != null){
        res = await axios.put(`http://localhost:3001/todo/${id}`, {
        title: heading,
        description: items,
      });
    }
    else{
            res = await axios.post(`http://localhost:3001/todo`, {
            title: heading,
            description: items,
          });
    }
      console.log(res.data);
      modal(0); // close modal
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      onClick={() => modal(0)}
      className="fixed inset-0 flex items-center justify-center bg-white/60 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-blue-200 p-6 rounded-lg shadow-lg w-[900px]"
      >
        <form onSubmit={handleSubmit}>
          {/* Heading */}
          <div className="flex mb-4 items-center">
            <label className="text-2xl font-bold text-blue-900 mr-3">
              Heading:
            </label>
            <input
              type="text"
              value={heading}
              onChange={(e) =>
                setHeading(capitalizeSentences(e.target.value))
              }
              className="text-purple-900 font-semibold text-2xl w-full p-2 rounded outline-none"
              placeholder="Enter heading..."
            />
          </div>

          {/* List items */}
          <ul className="list-disc pl-5 space-y-2">
            {items.map((item, i) => (
              <li key={i}>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  ref={(el) => (inputRefs.current[i] = el)}
                  className="text-xl w-full p-2 outline-none rounded bg-white"
                  placeholder={`Item ${i + 1}`}
                />
              </li>
            ))}
          </ul>

          <button
            type="submit"
            className="text-xl mx-6 my-6 px-4 py-2 border border-green-900 bg-green-800 text-white rounded"
          >
            {head ? 'Update Todo' : 'Create Todo'}
          </button>
        </form>
      </div>
    </div>
  );
}
