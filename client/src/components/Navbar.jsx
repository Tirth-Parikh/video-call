import moment from 'moment/moment';
import React from 'react'; // 👈 Add this
import { Link } from "react-router-dom";

export default function Navbar() {
  const time = moment().format('hh:mmA');        // e.g., 11:12AM
const date = moment().format('ddd,MMMDD');     // e.g., Sat,Apr26
  return (
    <div className="text-gray p-4 flex justify-between">
    <div>

      <Link to="/" className='text-[19px]'>
        QuickVideoConf
      </Link>
    </div>
    <div className='flex space-x-2 items-center text-gray-700 text-[19px]'>
      <div >{time}</div> <span className="w-2 h-2 bg-gray-500 rounded-full"></span><div>{date}</div>
    </div>
    </div>
  );
}
