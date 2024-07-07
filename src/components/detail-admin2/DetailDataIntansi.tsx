import React from "react";

export default function DetailDataIntansi({ dataIntansi }) {
  return (
    <div className="overflow-x-auto my-20 w-auto bg-slate-50 text-black rounded-md border p-10 ">
      <div className="flex">
        <div className="mr-20 font-semibold">
          <p className="mb-2">Nama Intansi</p>
          <p className="mb-2">Alamat Intansi</p>
          <p className="mb-2">No Telepon</p>
          <p className="mb-2">Email</p>
          <p className="mb-2">Status dalam Intansi</p>
        </div>
        <div className="">
          <p className="mb-2">{dataIntansi.namaIntansi}</p>
          <p className="mb-2">{dataIntansi.alamatIntansi} </p>
          <p className="mb-2">{dataIntansi.noTelpIntansi}</p>
          <p className="mb-2">{dataIntansi.emailIntansi}</p>
          <p className="mb-2">{dataIntansi.statusIntansi}</p>
        </div>
      </div>
    </div>
  );
}
