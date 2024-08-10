import React from "react";
import { NavLink } from "react-router-dom";

export default function SideNav2({ setActive }) {
  return (
    <div>
      <ul className="menu  border h-screen bg-green-700 text-white w-56 ">
        <li>
          <h2 className="menu-title text-white">Data Permohonan</h2>
          <ul>
            <li onClick={() => setActive("dataPemohon")}>
              <a>Data Pemohon</a>
            </li>
            <li onClick={() => setActive("dataIntansi")}>
              <a>Data Intansi</a>
            </li>
            <li onClick={() => setActive("dataAcara")}>
              <a>Data Acara</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
