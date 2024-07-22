import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import convertStringify from "../../lib/convertStringify";
import { supabase } from "../../lib/supabase";
import Swal from "sweetalert2";
import { getValues } from "../../lib/getValues";

export default function DetailDataAcara({ id, dataAcara, surat }) {
  const ruangan = convertStringify(dataAcara.ruangan);

  const navigate = useNavigate();

  const peserta = convertStringify(dataAcara.jumlahPesertas);

  console.log(peserta);

  const handleConfirm = async () => {
    try {
      const { error } = await supabase
        .from("peminjaman")
        .update({ admin_status: "Diterima", admin_utama_status: "Diterima" })
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data berhasil dikonfirmasi",
      });

      navigate(-1);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal mengkonfirmasi data",
      });
    }
  };

  return (
    <div className="overflow-x-auto my-20 w-auto bg-slate-50 text-black rounded-md border p-10 ">
      <div className="flex">
        <div className="mr-20 font-semibold">
          <p className="mb-2">Lokasi Gedung</p>
          <p className="mb-2">Ruangan</p>
          <p className="mb-2">Subsektor Acara</p>
          <p className="mb-2">Jenis Acara</p>
          <p className="mb-2">Nama Acara</p>
          <p className="mb-2">Tanggal Mulai</p>
          <p className="mb-2">Tanggal Berakhir</p>
          <p className="mb-2">Jam Mulai</p>
          <p className="mb-2">Jam Berakhir</p>
          <p className="mb-2">Jumlah Peserta</p>
          <p className="mb-2">Surat Permohonan</p>
        </div>
        <div className="">
          <p className="mb-2">{dataAcara.lokasiGedung}</p>
          <p className="mb-2">{ruangan.join(", ")}</p>
          <p className="mb-2">{dataAcara.subsektorAcara}</p>
          <p className="mb-2">{dataAcara.jenisAcara}</p>
          <p className="mb-2">{dataAcara.namaAcara}</p>
          <p className="mb-2">{dataAcara.tanggalMulaiAcara}</p>
          <p className="mb-2">{dataAcara.tanggalAkhirAcara}</p>
          <p className="mb-2">{dataAcara.jamMulai}</p>
          <p className="mb-2">{dataAcara.jamBerakhir}</p>
          <p className="mb-2">{getValues(peserta).join(", ")}</p>
          <a href={surat} target="_blank" className="underline">
            Lihat Surat Permohonan
          </a>
        </div>
      </div>
      <div className="flex mt-5 justify-center">
        <button
          onClick={handleConfirm}
          className="btn mr-5 bg-green-600 text-white border-none"
        >
          Terima
        </button>
        <NavLink to="/permohonanDitolak" state={id}>
          <div className="btn bg-red-600 text-white border-none">Tolak</div>
        </NavLink>
      </div>
    </div>
  );
}
