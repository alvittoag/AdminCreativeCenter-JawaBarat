import { NavLink } from "react-router-dom";
import SideNav from "../../components/SideNav.jsx/SideNav";
import React from "react";
import { supabase } from "../../lib/supabase";
import Swal from "sweetalert2";
import { convertRupiah } from "../../lib/convertRupiah";

function LaporanKerusakanFasilitas() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        let { data, error } = await supabase
          .from("kerusakan")
          .select(`*, users(*)`)
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setData(data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Gagal mengambil data",
        });
      }
    };

    getData();
  }, []);

  return (
    <>
      <div className="flex bg-white h-screen text-black">
        <SideNav />

        <div className="flex flex-col w-screen overflow-x-auto">
          <div className=" mx-10 mt-10 text-black mb-10">
            <p className="text-black font-semibold text-lg">
            </p>
            <p className="my-4 text-sm font-semibold">Cetak Laporan</p>
            <div className="flex text-sm items-center mt-4">
              <div className="flex items-center w-56">
                <p className="mr-4">Dari</p>
                <input
                  type="date"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs text-black bg-white"
                />
              </div>
              <div className="flex items-center w-56 mx-4">
                <p className="mr-4">Hingga</p>
                <input
                  type="date"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs text-black bg-white"
                />
              </div>
              <div className="btn  bg-green-500 text-white border-white hover:bg-white hover:text-green-500 hover:border-green-500">Cetak</div>
            </div>
          </div>

          <div className="">
            <div className=" bg-white mx-10 p-5 rounded-lg text-black border ">
              <div className="flex items-center mb-10 justify-between">
                <p className="text-lg font-semibold ">
                  Laporan Kerusakan Fasilitas
                </p>
                <NavLink to="/tambahLaporan">
                  <div className="btn bg-blue-500 border-none text-white hover:bg-blue-200 hover:text-black">
                    Tambah Laporan
                  </div>
                </NavLink>
              </div>
              <table className="table w-[100%]">
                {/* head */}
                <thead className="bg-slate-200 rounded-lg">
                  <tr className="text-black text-center">
                    <th>No Laporan</th>
                    <th>Pemohon</th>
                    <th>Lokasi Gedung</th>
                    <th>Ruangan</th>
                    <th>Tanggal</th>
                    <th>Denda</th>
                    <th>Bukti Kerusakan</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr className="text-center">
                      <td>{item.id}</td>
                      <td>{item.users.nama}</td>
                      <td>{item.lokasi_gedung}</td>
                      <td>{JSON.parse(item.ruangan).join(", ")}</td>
                      <td>{item.tanggal}</td>
                      <td>{convertRupiah(item.denda)}</td>
                      <td className="uderline cursor-pointer">
                        {item.admin_utama_status !== "Belum Bayar" && (
                          <a
                            href={item.bukti_pembayaran}
                            target="_blank"
                            className="underline"
                          >
                            Lihat Bukti
                          </a>
                        )}
                      </td>
                      <td>
                        <p className="p-2 font-semibold text-sm bg-green-300 rounded-lg">
                          {item.admin_status}
                        </p>
                      </td>
                    </tr>
                  ))}
                  {/* row 1 */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LaporanKerusakanFasilitas;
