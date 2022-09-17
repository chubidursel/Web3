import { useState } from "react";

export default function Sidebar() {
    const [open, setOpen] = useState(false);

    return (

<>
<div className="min-h-screen w-96">
  <div className="sidebar min-h-screen w-[6.35rem] overflow-hidden border-r hover:w-72 hover:bg-white hover:shadow-lg">
    <div className="flex h-screen flex-col justify-between pt-2 pb-6">
      
      <div>
        <ul className="mt-6 space-y-2 tracking-wide">
          <li className="min-w-max">
            <a href="#" aria-label="dashboard" className="relative flex items-center space-x-4 bg-gradient-to-r from-sky-600 to-cyan-400 px-4 py-3 text-white">
               <span className="-mr-1 font-medium">MENU</span>
            </a>
          </li>
          <li className="min-w-max">
            <a href="#" className="bg group flex items-center space-x-4 rounded-full px-4 py-3 text-gray-600">
              <span className="group-hover:text-gray-700">Game</span>
            </a>
          </li>
          <li className="min-w-max">
            <a href="#" className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600">
              <span className="group-hover:text-gray-700">Note</span>
            </a>
          </li>
          <li className="min-w-max">
            <a href="#" className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600">
              <span className="group-hover:text-gray-700">Converter</span>
            </a>
          </li>
          <li className="min-w-max">
            <a href="#" className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600">
              <span className="group-hover:text-gray-700">Dropdown</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="w-max -mb-3">
        <a href="#" className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600">
          <span className="group-hover:text-gray-700">Social media</span>
        </a>
      </div>
    </div>
  </div>
</div>
</> );
}