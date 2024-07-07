import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import Swal from "sweetalert2";

export default function PermohonanDitolak() {
  const { state } = useLocation();

  const [selectTolak, setSelectTolak] = React.useState(
    "Persyaratan Tidak Lengkap"
  );

  const navigate = useNavigate();

  const handleTolak = async () => {
    try {
      const { error } = await supabase
        .from("peminjaman")
        .update({
          user_status: "Ditolak",
          admin_status: "Ditolak",
          alasan_tolak: selectTolak,
        })
        .eq("id", state)
        .select();

      if (error) {
        throw error;
      }

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data berhasil ditolak",
      });

      navigate("/permohonan");
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
    <div className="bg-white h-screen">
      <div className="artboard artboard-horizontal phone-1 mx-auto items-center flex">
        <div className="rounded-lg border p-10">
          <p>Alasan Penolakan</p>
          <label className="flex form-control w-full max-w-xs mt-4">
            <select
              value={selectTolak}
              onChange={(e) => setSelectTolak(e.target.value)}
              className="select select-bordered w-56 bg-white placeholder:text-sm text-black"
              name="lokasiGedung"
            >
              <option disabled>Pilih</option>
              <option value="Persyaratan Tidak Lengkap">
                Persyaratan Tidak Lengkap
              </option>
              <option value="Acara Tidak Termasuk dalam 17 Subsektor">
                Acara Tidak Termasuk dalam 17 Subsektor
              </option>
              <option value=" Acara Tidak Termasuk dalam Jenis Acara yang Dizinkan">
                Acara Tidak Termasuk dalam Jenis Acara yang Dizinkan
              </option>
              <option value="Data Pemohon Invalid">Data Pemohon Invalid</option>
              <option value="Data Intansi Invalid">Data Intansi Invalid</option>
              <option value="Data Acara Invalid">Data Acara Invalid</option>
              <option value="Jadwal Sudah Terisi">Jadwal Sudah Terisi</option>
            </select>
          </label>
          <button
            onClick={handleTolak}
            className="btn mt-4 bg-green-500 hover:bg-white text-black"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
