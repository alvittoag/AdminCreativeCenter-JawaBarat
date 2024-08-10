import React from "react";
import convertStringify from "../../lib/convertStringify";
import { downloadExcel } from "react-export-table-to-excel";
import Swal from "sweetalert2";
import { getValues } from "../../lib/getValues";

export default function CetakLaporanAkhir({ data }) {
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

      const pesertasString = convertStringify(item.acara).jumlahPesertas;

      const peserta = getValues(convertStringify(pesertasString)).join(", ");
      return {
        "No Pemohon": item.id,
        "Nama Pemohon": convertStringify(item.pemohon).namaPemohon,
        "Nama Acara": convertStringify(item.acara).namaAcara,
        "Lokasi Gedung": convertStringify(item.acara).lokasiGedung,
        "Tanggal Mulai": convertStringify(item.acara).tanggalMulaiAcara,
        "Jumlah Peserta": peserta,
        "Rangkuman Acara": item.rangkuman_acara,
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
          className="btn bg-green-500 text-white border-white hover:bg-white hover:text-green-500 hover:border-green-500"
        >
          Cetak
        </button>
      </div>
    </div>
  );
}

const header = [
  "No Pemohon",
  "Nama Pemohon",
  "Nama Acara",
  "Lokasi Gedung",
  "Tanggal Acara",
  "Jumlah Peserta",
  "Rangkuman Acara",
];
