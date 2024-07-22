import React from "react";

export default function DetailDataPemohon({ dataPemohon, ktp }) {
  console.log(dataPemohon);
  return (
    <div className="overflow-x-auto my-20 w-auto bg-slate-50 text-black rounded-md border p-10 ">
      <div className="flex">
        <div className="mr-20 font-semibold">
          <p className="mb-2">Nama Pemohon</p>
          <p className="mb-2">Alamat Pemohon</p>
          <p className="mb-2">Kelurahan</p>
          <p className="mb-2">Kecamatan</p>
          <p className="mb-2">Kota/Kabupaten</p>
          <p className="mb-2">Status Pemohon</p>
          <p className="mb-2">No Telepon</p>
          <p className="mb-2">Email</p>
          <p className="mb-2">NIK</p>
          <p className="mb-2">KTP</p>
        </div>
        <div className="">
          <p className="mb-2">{dataPemohon.namaPemohon}</p>
          <p className="mb-2">{dataPemohon.alamatPemohon} </p>
          <p className="mb-2">{dataPemohon.kelurahanPemohon}</p>
          <p className="mb-2">{dataPemohon.kecamatanPemohon}</p>
          <p className="mb-2">{dataPemohon.kabPemohon}</p>
          <p className="mb-2">{dataPemohon.statusPemohon}</p>
          <p className="mb-2">{dataPemohon.noPemohon}</p>
          <p className="mb-2">{dataPemohon.emailPemohon}</p>
          <p className="mb-2">{dataPemohon.nikPemohon}</p>
          <a href={dataPemohon.ktp} target="_blank" className="underline">
            Lihat KTP
          </a>
        </div>
      </div>
    </div>
  );
}
