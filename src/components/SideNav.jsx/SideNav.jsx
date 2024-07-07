import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function SideNav() {
  const adminLocalStorage = localStorage.getItem("admin");

  const { type } = JSON.parse(adminLocalStorage);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    Swal.fire({
      icon: "success",
      title: "Logout Success",
      text: "Logout Success",
    });

    navigate("/login");
  };

  console.log(type);
  return (
    <div>
      <div className="sidenav flex flex-col justify-between bg-white w-56 h-screen  drop-shadow-md text-black">
        <div className="">
          <p className="text-sm text-slate-400 my-5 mx-7">MAIN MENU</p>
          <ul className="menu rounded-box ">
            {/* Admin 1 */}
            {type === 1 && (
              <>
                <NavLink to="/">
                  <li className="flex">
                    <a>Dashboard (admin1)</a>
                  </li>
                </NavLink>

                <li>
                  <details>
                    <summary className="text-md">Permohonan (admin1)</summary>
                    <ul className="text-sm">
                      <NavLink to="/permohonanTimKreasi">
                        <li>
                          <a>Bogor Creative Center</a>
                        </li>
                      </NavLink>
                      <NavLink to="/permohonanPCCTimKreasi">
                        <li>
                          <a>Purwakarta Creative Center</a>
                        </li>
                      </NavLink>
                      <NavLink to="/permohonanADTimKreasi">
                        <li>
                          <a>Ruang Kreatif Ahmad Djuhara</a>
                        </li>
                      </NavLink>
                    </ul>
                  </details>
                </li>

                <li>
                  <details>
                    <summary className="text-md">
                      Laporan Akhir (admin1)
                    </summary>
                    <ul className="text-sm">
                      <NavLink to="/laporanAkhir">
                        <li>
                          <a>Bogor Creative Center</a>
                        </li>
                      </NavLink>
                      <NavLink to="/laporanAkhirPCC">
                        <li>
                          <a>Purwakarta Creative Center</a>
                        </li>
                      </NavLink>
                      <NavLink to="/laporanAkhirAD">
                        <li>
                          <a>Ruang Kreatif Ahmad Djuhara</a>
                        </li>
                      </NavLink>
                    </ul>
                  </details>
                </li>

                <li>
                  <details>
                    <summary className="text-md">
                      Laporan Kerusakan (admin1)
                    </summary>
                    <ul className="text-sm">
                      <NavLink to="/laporanKerusakan">
                        <li>
                          <a>Bogor Creative Center</a>
                        </li>
                      </NavLink>
                      <NavLink to="/laporanKerusakanPCC">
                        <li>
                          <a>Purwakarta Creative Center</a>
                        </li>
                      </NavLink>
                      <NavLink to="/laporanKerusakanAD">
                        <li>
                          <a>Ruang Kreatif Ahmad Djuhara</a>
                        </li>
                      </NavLink>
                    </ul>
                  </details>
                </li>
              </>
            )}

            {/* Admin 2 */}
            {type === 2 && (
              <>
                <NavLink to="/dashboard">
                  <li className="flex">
                    <a>Dashboard (admin2)</a>
                  </li>
                </NavLink>

                <li>
                  <details>
                    <summary className="text-md">Permohonan (admin2)</summary>
                    <ul className="text-sm">
                      <NavLink to="/permohonan">
                        <li>
                          <a>Bogor Creative Center</a>
                        </li>
                      </NavLink>
                      <NavLink to="/detailPermohonanPCC">
                        <li>
                          <a>Purwakarta Creative Center</a>
                        </li>
                      </NavLink>
                      <NavLink to="/detailPermohonanAD">
                        <li>
                          <a>Ruang Kreatif Ahmad Djuhara</a>
                        </li>
                      </NavLink>
                    </ul>
                  </details>
                </li>
              </>
            )}

            {/* Admin 3 */}
            {type === 3 && (
              <NavLink to="/laporanKerusakanFasilitas">
                <li className="flex">
                  <a>Dashboard (admin3)</a>
                </li>
              </NavLink>
            )}
          </ul>
        </div>

        <div className="">
          <button onClick={handleLogout} className="flex ml-6 text-sm my-8">
            <img src="src\assets\logout.png" alt="" className="w-5 h-5" />
            <p>Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
}
