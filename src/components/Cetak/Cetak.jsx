import React from "react";
import convertStringify from "../../lib/convertStringify";
import { downloadExcel } from "react-export-table-to-excel";
import Swal from "sweetalert2";
import { getValues } from "../../lib/getValues";

export default function Cetak({ data }) {
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
      return (
        (!start || convertStringify(item.acara).tanggalMulaiAcara >= start) &&
        (!end || convertStringify(item.acara).tanggalMulaiAcara <= end)
      );
    });

    if (filtered.length === 0) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Data tidak ditemukan",
      });
    }

    const dataExcel = filtered.map((item) => {
      const ruanganString = convertStringify(item.acara).ruangan;

      const ruangan = JSON.parse(ruanganString).join(", ");

      const pesertasString = convertStringify(item.acara).jumlahPesertas;

      const peserta = getValues(convertStringify(pesertasString)).join(", ");

      return {
        "No Pemohon": item.id,
        Status: item.admin_utama_status,
        Pemohon: convertStringify(item.pemohon).namaPemohon,
        "Nama Acara": convertStringify(item.acara).namaAcara,
        "Tanggal Mulai": convertStringify(item.acara).tanggalMulaiAcara,
        " Jam Mulai": convertStringify(item.acara).jamMulai,
        "Jam Berakhir": convertStringify(item.acara).jamBerakhir,
        Ruangan: ruangan,
        "Jenis Acara": convertStringify(item.acara).jenisAcara,
        "Subsektor Acara": convertStringify(item.acara).subsektorAcara,
        "Jumlah Peserta": peserta,
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
    <div className=" mx-10 mt-10 text-black">
      <p className="my-4 text-sm font-semibold">Cetak Laporan</p>
      <div className="flex text-sm items-center mt-4">
        <div className="flex items-center w-56">
          <p>Dari</p>
          <input
            value={inputValue.dari}
            onChange={(e) =>
              setInputValue({ ...inputValue, dari: e.target.value })
            }
            type="date"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs text-black bg-slate-300"
          />
        </div>
        <div className="flex items-center w-56 mx-4">
          <p>Hingga</p>
          <input
            value={inputValue.hingga}
            onChange={(e) =>
              setInputValue({ ...inputValue, hingga: e.target.value })
            }
            type="date"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs text-black bg-slate-300"
          />
        </div>
        <button
          onClick={() => handleFilter(inputValue.dari, inputValue.hingga)}
          className="btn"
        >
          Cetak
        </button>
      </div>
    </div>
  );
}

const header = [
  "No Pemohon",
  "Status",
  "Pemohon",
  "Nama Acara",
  "Tanggal Mulai ",
  "Jam Mulai",
  "Jam Berakhir",
  "Ruangan",
  "Jenis Acara",
  "Subsektor Acara",
  "Jumlah Peserta",
];
