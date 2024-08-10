import { NavLink, useNavigate } from "react-router-dom";
import SideNav from "../../components/SideNav.jsx/SideNav";
import React from "react";
import { supabase } from "../../lib/supabase";
import convertStringify from "../../lib/convertStringify";
import Swal from "sweetalert2";
import { convertRupiah } from "../../lib/convertRupiah";

function LandingPage() {
  const [countAdmin2, setCountAdmin2] = React.useState({
    pcc: 0,
    bcc: 0,
    ad: 0,
  });

  const [data, setData] = React.useState([]);
  const [refetch, setRefetch] = React.useState(null);

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
  }, [refetch]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        let { data, error } = await supabase.from("peminjaman").select("*");

        if (error) {
          throw error;
        }

        const countPcc = data.filter(
          (item) =>
            convertStringify(item.acara).lokasiGedung ===
              "Purwakarta Creative Center" &&
            item.admin_utama_status === "Diterima"
        ).length;

        const countBcc = data.filter(
          (item) =>
            convertStringify(item.acara).lokasiGedung ===
              "Bogor Creative Center" && item.admin_utama_status === "Diterima"
        ).length;

        const countAd = data.filter(
          (item) =>
            convertStringify(item.acara).lokasiGedung ===
              "Ruang Kreatif Ahmad Djuhara" &&
            item.admin_utama_status === "Diterima"
        ).length;

        setCountAdmin2({ pcc: countPcc, bcc: countBcc, ad: countAd });
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

  const handleConfirm = async (id) => {
    try {
      const { error } = await supabase
        .from("kerusakan")
        .update({ admin_utama_status: "Terkonfirmasi", user_status: "Selesai" })
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
        .from("kerusakan")
        .update({
          admin_utama_status: "Pembayaran Ditolak",
          user_status: "Pembayaran Ditolak",
          alasan_tolak: "Bukti Pembayaran Tidak Sesuai",
        })
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }

      setRefetch(Math.random());

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
    <>
      <div className="flex bg-slate-50 h-screen text-black">
        <SideNav />

        <div className="flex flex-col w-screen">
          <div className="flex m-10">
            <NavLink to="/permohonanPCCTimKreasi">
              <div className="border p-5 rounded-lg h-[150px] hover:bg-slate-50 hover:shadow-md">
                <p className="text-md font-bold">Purwakarta Creative Center</p>
                <div className="flex flex-col text-center mt-4">
                  <p className="text-4xl font-semibold">{countAdmin2.pcc}</p>
                  <p className="mt-2 text-sm">Permohonan Baru</p>
                </div>
              </div>
            </NavLink>

            <NavLink to="/permohonanTimKreasi">
              <div className="border p-5 rounded-lg h-[150px] mx-4 hover:bg-slate-50 hover:shadow-md">
                <p className="text-md font-bold">Bogor Creatice Center</p>
                <div className="flex flex-col text-center mt-4">
                  <p className="text-4xl font-semibold">{countAdmin2.bcc}</p>
                  <p className="mt-2 text-sm">Permohonan Baru</p>
                </div>
              </div>
            </NavLink>

            <NavLink to="/permohonanADTimKreasi">
              <div className="border p-5 rounded-lg h-[150px] hover:bg-slate-50 hover:shadow-md">
                <p className="text-md font-bold">Ruang Kreatif Ahmad Djuhara</p>
                <div className="flex flex-col text-center mt-4">
                  <p className="text-4xl font-semibold">{countAdmin2.ad}</p>
                  <p className="mt-2 text-sm">Permohonan Baru</p>
                </div>
              </div>
            </NavLink>
          </div>
          <div className="">
            <div className="overflow-x-auto bg-white mx-10 p-5 rounded-lg text-black border ">
              <p className="text-lg font-semibold mb-10">
                Laporan Kerusakan Fasilitas
              </p>
              <table className="table w-[100%]">
                {/* head */}
                <thead className="bg-slate-200 rounded-lg">
                  <tr className="text-black text-center">
                    <th>No Laporan</th>
                    <th>Pemohon</th>
                    <th>Nama Ruangan</th>
                    <th>Denda</th>
                    <th>Status</th>
                    <th>Bukti Bayar</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr className="text-center">
                      <td>{item.id}</td>
                      <td>{item.users.nama}</td>
                      <td>{JSON.parse(item.ruangan).join(", ")}</td>
                      <td>{convertRupiah(item.denda)}</td>
                      <td>
                        <p
                          className={`py-2 font-semibold text-sm ${
                            item.admin_utama_status === "Belum Bayar" &&
                            "bg-red-300"
                          } ${
                            item.admin_utama_status === "Sudah Bayar" &&
                            "bg-green-300"
                          } ${
                            item.admin_utama_status === "Terkonfirmasi" &&
                            "bg-green-500"
                          } ${
                            item.admin_utama_status === "Pembayaran Ditolak" &&
                            "bg-red-400"
                          } rounded-lg`}
                        >
                          {item.admin_utama_status}
                        </p>
                      </td>

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

                      {item.admin_utama_status == "Sudah Bayar" && (
                        <td>
                          <div className="flex">
                            {/* Confirm */}
                            <img
                              onClick={() => handleConfirm(item.id)}
                              src="src\assets\checklist.png"
                              alt=""
                              className="mr-2 cursor-pointer"
                            />

                            {/* TOlak */}
                            <img
                              onClick={() => handleTolak(item.id)}
                              src="src\assets\remove.png"
                              alt=""
                              className="cursor-pointer"
                            />
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
