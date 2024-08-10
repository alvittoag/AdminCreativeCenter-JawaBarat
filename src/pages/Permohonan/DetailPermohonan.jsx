import React from "react";
import SideNav2 from "../../components/SideNav2/SideNav2";
import { useLocation } from "react-router-dom";
import convertStringify from "../../lib/convertStringify";
import DetailDataPemohon from "../../components/detail-admin2/DetailDataPemohon";
import DetailDataIntansi from "../../components/detail-admin2/DetailDataIntansi";
import DetailDataAcara from "../../components/detail-admin2/DetailDataAcara";

export default function DetailPermohonan() {
  const [active, setActive] = React.useState("dataPemohon");
  const { state } = useLocation();

  const { id, pemohon, intansi, acara, ktp, surat } = state;

  const dataPemohon = convertStringify(pemohon);
  const dataIntansi = convertStringify(intansi);
  const dataAcara = convertStringify(acara);

  return (
    <div className="bg-slate-50 h-screxen">
      <div className="flex">
        <SideNav2 setActive={setActive} />

        {active === "dataPemohon" && (
          <DetailDataPemohon dataPemohon={dataPemohon} ktp={ktp} />
        )}

        {active === "dataIntansi" && (
          <DetailDataIntansi dataIntansi={dataIntansi} />
        )}

        {active === "dataAcara" && (
          <DetailDataAcara id={id} dataAcara={dataAcara} surat={surat} />
        )}
      </div>
    </div>
  );
}
