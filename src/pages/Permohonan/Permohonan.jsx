import React from "react";
import SideNav from "../../components/SideNav.jsx/SideNav";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { supabase } from "../../lib/supabase";
import convertStringify from "../../lib/convertStringify";
import CetakPermohonanAdmin2 from "../../components/Cetak/CetakPermohonanAdmin2";
import { getValues } from "../../lib/getValues";

export default function Permohonan() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        let { data, error } = await supabase.from("peminjaman").select("*");

        if (error) {
          throw error;
        }

        const bcc = data.filter(
          (item) =>
            convertStringify(item.acara).lokasiGedung ===
            "Bogor Creative Center"
        );

        const reverse = bcc.reverse();

        setData(reverse);
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

  console.log(data);

  return (
    <div>
      <div className="flex bg-slate-50">
        <SideNav />
        <div className="overflow-x-auto">
          <div className="flex mx-10 mt-10">
            <p className="text-black font-semibold text-3xl">
              Bogor Creative Center
            </p>
          </div>
          <CetakPermohonanAdmin2 data={data} />

          <div className="  bg-white mx-10 p-5 text-black  mt-10 shadow-sms">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="text-black text-center bg-blue-100">
                  <th>No Permohonan</th>
                  <th>Status</th>
                  <th>Pemohon</th>
                  <th>Nama Acara</th>
                  <th>Tanggal</th>
                  <th>Jam Mulai</th>
                  <th>Jam Berakhir</th>
                  <th>Ruangan</th>
                  <th>Jenis Acara</th>
                  <th>Subsektor Acara</th>
                  <th>Jumlah Peserta</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}

                {data.map((item) => {
                  const acara = convertStringify(item.acara);

                  const ruangan = convertStringify(acara.ruangan).join(", ");

                  const peserta = convertStringify(acara.jumlahPesertas);

                  return (
                    <tr key={item.id} className="text-center border-b-2">
                      <td>{item.id}</td>
                      <NavLink
                        to={`${
                          item.admin_status === "Baru"
                            ? "/detailPermohonan"
                            : ""
                        }`}
                        state={item}
                      >
                        <td>
                          <p
                            className={`font-semibold p-1 text-sm text-center rounded-lg ${
                              item.admin_status === "Diterima" && "bg-green-300"
                            } ${
                              item.admin_status === "Baru" && "bg-slate-100"
                            } ${
                              item.admin_status === "Ditolak" && "bg-red-400"
                            }  w-24`}
                          >
                            {item.admin_status}
                          </p>
                        </td>
                      </NavLink>
                      <td>{convertStringify(item.pemohon).namaPemohon}</td>
                      <td>{convertStringify(item.acara).namaAcara}</td>
                      <td>{convertStringify(item.acara).tanggalMulaiAcara}</td>
                      <td>{convertStringify(item.acara).jamMulai}</td>
                      <td>{convertStringify(item.acara).jamBerakhir}</td>
                      <td className="text-center">{ruangan}</td>
                      <td>{convertStringify(item.acara).jenisAcara}</td>
                      <td>{convertStringify(item.acara).subsektorAcara}</td>
                      <td>{getValues(peserta).join(", ")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
