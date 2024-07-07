import React from "react";
import SideNav from "../../components/SideNav.jsx/SideNav";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { supabase } from "../../lib/supabase";
import convertStringify from "../../lib/convertStringify";
import Cetak from "../../components/Cetak/Cetak";

export default function Permohonan2AD() {
  const [data, setData] = React.useState([]);
  const [refetch, setRefetch] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      try {
        let { data, error } = await supabase.from("peminjaman").select("*");

        if (error) {
          throw error;
        }

        const bcc = data.filter(
          (item) =>
            (convertStringify(item.acara).lokasiGedung ===
              "Ruang Kreatif Ahmad Djuhara" &&
              item.admin_status === "Diterima") ||
            item.admin_status === "Ditolak"
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
  }, [refetch]);

  const handleConfirm = async (id) => {
    try {
      const { error } = await supabase
        .from("peminjaman")
        .update({ admin_utama_status: "Disetujui", user_status: "Diterima" })
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }

      setRefetch(Math.random());

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data berhasil dikonfirmasi",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal mengkonfirmasi data",
      });
    }
  };

  const handleTolak = async (id) => {
    try {
      const { error } = await supabase
        .from("peminjaman")
        .update({
          admin_utama_status: "Ditolak",
          user_status: "Ditolak",
          admin_status: "Ditolak",
          alasan_tolak: "Permohonan ditolak admin utama",
        })
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }

      setRefetch(Math.random());

      navi;

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data berhasil ditolak",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal tolak data",
      });
    }
  };

  return (
    <div>
      <div className="flex bg-white">
        <SideNav />
        <div className="overflow-x-auto">
          <div className="flex mx-10 mt-10">
            <p className="text-black font-semibold text-lg">
              Ruang Kreatif Ahmad Djuhara
            </p>
          </div>
          <Cetak data={data} />

          <div className=" bg-white mx-10 w-full  text-black my-10 p-5 rounded-lg">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="text-black text-center bg-blue-200">
                  <th>No Permohonan</th>
                  <th>Status</th>
                  <th>Pemohon</th>
                  <th>Nama Acara</th>
                  <th>Tanggal Mulai</th>
                  <th>Jam Mulai</th>
                  <th>Jam Berakhir</th>
                  <th>Ruangan</th>
                  <th>Jenis Acara</th>
                  <th>Subsektor Acara</th>
                  <th>Jumlah Peserta</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  const acara = convertStringify(item.acara);

                  const ruangan = convertStringify(acara.ruangan).join(", ");
                  return (
                    <tr className="text-center border-b-2">
                      <td>{item.id}</td>
                      <td className="cursor-pointer">
                        <div
                          className={`font-bold p-1 text-sm text-center self-center ${
                            item.admin_utama_status === "Diterima" &&
                            "bg-green-200"
                          } ${
                            item.admin_utama_status === "Disetujui" &&
                            "bg-green-500"
                          } ${
                            item.admin_utama_status === "Ditolak" ||
                            (item.admin_status === "Ditolak" && "bg-red-200")
                          }`}
                        >
                          {item.admin_utama_status ?? item.admin_status}
                        </div>
                      </td>
                      <td>{convertStringify(item.pemohon).namaPemohon}</td>
                      <td>{convertStringify(item.acara).namaAcara}</td>
                      <td>{convertStringify(item.acara).tanggalMulaiAcara}</td>
                      <td>{convertStringify(item.acara).jamMulai}</td>
                      <td>{convertStringify(item.acara).jamBerakhir}</td>
                      <td className="text-center">{ruangan}</td>
                      <td>{convertStringify(item.acara).jenisAcara}</td>
                      <td>{convertStringify(item.acara).subsektorAcara}</td>
                      <td>{convertStringify(item.acara).jumlahPeserta}</td>

                      {item.admin_utama_status === "Diterima" && (
                        <td>
                          <div className="flex flex-col">
                            {/* Confirm */}
                            <button onClick={() => handleConfirm(item.id)}>
                              <img
                                src="src\assets\checklist.png"
                                alt=""
                                className="mb-2 cursor-pointer"
                              />
                            </button>

                            {/* Tolak */}
                            <button onClick={() => handleTolak(item.id)}>
                              <img
                                src="src\assets\remove.png"
                                alt=""
                                className="cursor-pointer"
                              />
                            </button>
                          </div>
                        </td>
                      )}
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