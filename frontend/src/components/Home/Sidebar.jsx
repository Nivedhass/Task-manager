import React, { useEffect, useState } from 'react';
import { CgNotes } from 'react-icons/cg';
import { MdLabelImportant } from 'react-icons/md';
import { FaCheckDouble } from 'react-icons/fa6';
import { TbNotebookOff } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux'; 
import { authActions } from '../../store/auth';
import axios from 'axios';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const data = [
    {
      title: 'All tasks',
      icon: <CgNotes />,
      link: '/',
    },
    {
      title: 'Important tasks',
      icon: <MdLabelImportant />,
      link: '/importantTasks',
    },
    {
      title: 'Completed tasks',
      icon: <FaCheckDouble />,
      link: '/completedTasks',
    },
    {
      title: 'Incompleted tasks',
      icon: <TbNotebookOff />,
      link: '/incompletedTasks',
    },
  ];

  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    navigate("/signup");
  };

  useEffect(() => {
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v2/get-all-tasks", { headers });
        console.log("Response data:", response.data); 
        setUserData(response.data.user); 
      } catch (error) {
        console.error("Error fetching tasks:", error.response ? error.response.data : error.message);
      }
    };

    fetch();
  }, []); 

  return (
    <>
      {userData && (
        <div>
          <h2 className="text-xl font-semibold">{userData.username}</h2> {}
          <h4 className="mb-1 text-gray-400">{userData.email}</h4> {}
          <hr />
        </div>
      )}
      <div>
        {data.map((items, i) => (
          <Link
            to={items.link}
            key={i}
            className="my-2 flex items-center hover:bg-gray-600 p-2 rounded transition-all duration-300"
          >
            {items.icon}
            <span className="ml-2">{items.title}</span>
          </Link>
        ))}
      </div>
      <div>
        <button className="bg-gray-600 w-full p-2 rounded" onClick={logout}>Log Out</button>
      </div>
    </>
  );
};

export default Sidebar;





