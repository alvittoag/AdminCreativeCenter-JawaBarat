import React from "react";
import convertStringify from "../../lib/convertStringify";
import { downloadExcel } from "react-export-table-to-excel";
import Swal from "sweetalert2";

export default function CetakLaporanKerusakan({ data }) {
  console.log(data);
  const [inputValue, setInputValue] = React.useState({
    dari: "",
    hingga: "",
  });

  const handleFilter = (start, end) => {
    if (inputValue.dari === "" && inputValue.hingga === "") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Pilih tanggal terlebih dahulu",
      });
    }

    const filtered = data.filter((item) => {
      return (!start || item.tanggal >= start) && (!end || item.tanggal <= end);
    });

    if (filtered.length === 0) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Data tidak ditemukan",
      });
    }

    const dataExcel = filtered.map((item) => {
      return {
        "No Laporan": item.id,
        Pemohon: item.users.nama,
        "Nama Ruangan": JSON.parse(item.ruangan).join(", "),
        Tanggal: item.tanggal,
        Denda: item.denda,
        Status: item.admin_utama_status,
        "Bukti Kerusakan": item.bukti_kerusakan,
      };
    });

    downloadExcel({
      fileName: `Laporan`,
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header: header,
        body: dataExcel,
      },
    });
  };

  return (
    <div className=" mt-10 bg-slate-100 rounded-lg pb-5 py-2 px-5 text-black">
      <p className="my-4 text-sm font-semibold">Cetak Laporan</p>
      <div className="flex text-sm items-center mt-4">
        <div className="flex items-center w-56">
          <p className="mr-4">Dari</p>
          <input
            value={inputValue.dari}
            onChange={(e) =>
              setInputValue({ ...inputValue, dari: e.target.value })
            }
            type="date"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs text-black bg-white"
          />
        </div>
        <div className="flex items-center w-56 mx-4">
          <p className="mr-4">Hingga</p>
          <input
            value={inputValue.hingga}
            onChange={(e) =>
              setInputValue({ ...inputValue, hingga: e.target.value })
            }
            type="date"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs text-black bg-white"
          />
        </div>
        <button
          onClick={() => handleFilter(inputValue.dari, inputValue.hingga)}
          className="btn  bg-green-500 text-white border-white hover:bg-white hover:text-green-500 hover:border-green-500"
        >
          Cetak
        </button>
      </div>
    </div>
  );
}

const header = [
  "No Laporan",
  "Pemohon",
  "Nama Ruangan",
  "Tanggal",
  "Denda",
  "Status",
  "Bukti Kerusakan",
];
