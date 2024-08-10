import React from "react";
import SideNav from "../../components/SideNav.jsx/SideNav";
import { supabase } from "../../lib/supabase";
import Swal from "sweetalert2";
import convertStringify from "../../lib/convertStringify";
import CetakLaporanAkhir from "../../components/Cetak/CetakLaporanAkhir";
import { getValues } from "../../lib/getValues";

export default function LaporanAD() {
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
              "Ruang Kreatif Ahmad Djuhara" && item.user_status === "Selesai"
        );

        const reverse = bcc.reverse();

        setData(reverse);
      } catch (error) {
        console.log(error);
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
    <div>
      <div className="flex bg-white">
        <SideNav />
        <div className="">
          <div className=" mx-10 mt-10 text-black">
          <p className="text-sm">Laporan Akhir Acara</p>
            <p className="text-black font-semibold text-3xl">
            Ruang Kreatif Ahmad Djuhara
            </p>

            <CetakLaporanAkhir data={data} />
          </div>

          <div className=" bg-white mx-10 overflow-x-auto text-black w-max-[90%] my-10 rounded-lg border p-5 border-slate-100 shadow-md ">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="text-black text-center bg-blue-200">
                  <th>No Permohonan</th>
                  <th>Nama Pemohon</th>
                  <th>Nama Acara</th>
                  <th>Lokasi Gedung</th>
                  <th>Tanggal Acara</th>
                  <th>Jumlah Peserta</th>
                  <th>Rangkuman Acara</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  const { pemohon, acara } = item;

                  const dataPemohon = convertStringify(pemohon);
                  const dataAcara = convertStringify(acara);

                  const peserta = getValues(
                    convertStringify(dataAcara.jumlahPesertas)
                  ).join(", ");

                  return (
                    <tr key={item.id} className="text-center border-b-2">
                      <td>{item.id}</td>
                      <td>{dataPemohon.namaPemohon}</td>
                      <td>{dataAcara.namaAcara}</td>
                      <td>{dataAcara.lokasiGedung}</td>
                      <td>{dataAcara.tanggalMulaiAcara}</td>
                      <td>{peserta}</td>
                      <td className="text-justify">{item.rangkuman_acara}</td>
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
