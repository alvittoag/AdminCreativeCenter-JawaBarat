import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import Swal from "sweetalert2";
import Select from "react-select";

export default function TambahLaporan() {
  const [dataPeminjam, setDataPeminjam] = React.useState([]);
  const [selectOptions, setSelectOptions] = React.useState([]);
  const [selectPemohon, setSelectPemohon] = React.useState(null);

  const [bukti, setBukti] = React.useState(null);
  const [loadingUpload, setLoadingUpload] = React.useState(false);

  const [dataInput, setDataInput] = React.useState({
    user_id: "",
    lokasi_gedung: "",
    tanggal: "",
    denda: "",
  });

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectOptions([...selectOptions, value]);
    } else {
      setSelectOptions(selectOptions.filter((option) => option !== value));
    }
  };

  React.useEffect(() => {
    const getData = async () => {
      try {
        let { data, error } = await supabase.from("peminjaman").select("*");

        const manimpulate = data.map((item) => {
          return {
            value: { ...item },
            label: `No Pemohon (${item.id})  - ${
              JSON.parse(item.pemohon).namaPemohon
            }`,
          };
        });

        if (error) {
          throw error;
        }
        setDataPeminjam(manimpulate);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Gagal mengambil data",
        });
      }
    };

    getData();
  }, []);

  React.useEffect(() => {
    if (selectPemohon) {
      setDataInput((prev) => ({
        ...prev,
        user_id: selectPemohon?.user_id,
        lokasi_gedung: selectPemohon?.lokasi_gedung,
        tanggal: selectPemohon?.tanggal,
      }));

      setSelectOptions(JSON.parse(selectPemohon?.ruangan));
    }
  }, [selectPemohon]);

  const navigate = useNavigate();

  const uploadBukti = async () => {
    setLoadingUpload(true);

    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("berkas")
        .upload(`bukti/${dataInput.lokasi_gedung} - ${Math.random()}`, bukti);

      if (uploadError) {
        console.error(uploadError);
        return { error: true };
      }

      const { data, error: publicURLError } = supabase.storage
        .from("berkas")
        .getPublicUrl(uploadData.path);

      if (publicURLError) {
        console.error(publicURLError);
        return { error: true };
      }

      return { bukti: data.publicUrl };
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      return { error: true };
    } finally {
      setLoadingUpload(false);
    }
  };

  const handleSubmit = async () => {
    if (Object.values(dataInput).includes("")) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Lengkapi semua data",
      });
    }

    if (selectOptions.length === 0) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Lengkapi data ruangan",
      });
    }

    if (!bukti) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Lengkapi bukti kerusakan",
      });
    }

    const upload = await uploadBukti();

    if (upload?.error) {
      return Swal.fire({
        title: "...Ooops",
        text: "Terjadi kesalahan saat upload bukti kerusakan",
        icon: "error",
      });
    }

    try {
      const { error } = await supabase
        .from("kerusakan")
        .insert({
          ...dataInput,
          ruangan: JSON.stringify(selectOptions),
          user_status: "Belum Bayar",
          admin_status: "Terkirim",
          admin_utama_status: "Belum Bayar",
          bukti_kerusakan: upload?.bukti,
        })
        .select();

      if (error) {
        throw error;
      }

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data berhasil ditambahkan",
      });

      navigate("/laporanKerusakanFasilitas");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal menambahkan data",
      });
    }
  };

  console.log(dataInput);

  return (
    <div className="bg-white">
      <div className=" mx-auto items-center justify-center flex ">
        <div className="rounded-lg border mt-10 p-10 text-black">
          <p className="mb-2">No Pemohon</p>
          <Select
            placeholder="Pilih No Pemohon"
            onChange={(e) =>
              setSelectPemohon({
                user_id: e.value.user_id,
                lokasi_gedung: JSON.parse(e.value.acara).lokasiGedung,
                ruangan: JSON.parse(e.value.acara).ruangan,
                tanggal: JSON.parse(e.value.acara).tanggalMulaiAcara,
              })
            }
            options={dataPeminjam}
          />

          <p className="mt-4 mb-2">Lokasi Gedung</p>
          <label className="flex form-control w-full max-w-xs mt-4">
            <select
              disabled={!selectPemohon}
              onChange={(e) => {
                setSelectOptions([]);
                setDataInput((prev) => ({
                  ...prev,
                  lokasi_gedung: e.target.value,
                }));
              }}
              value={dataInput.lokasi_gedung}
              className="select select-bordered bg-white placeholder:text-sm text-black disabled:bg-gray-100 disabled:border-none disabled:text-black disabled:cursor-not-allowed"
              name="lokasiGedung"
            >
              <option disabled>Pilih</option>
              <option value="Bogor Creative Center">
                Bogor Creative Center
              </option>
              <option value="Purwakarta Creative Center">
                Purwakarta Creative Center
              </option>
              <option value="Ruang Kreatif Ahmad Djuhara">
                Ruang Kreatif Ahmad Djuhara
              </option>
            </select>
          </label>

          <p className="mt-4 mb-2">Nama Ruangan</p>
          <div className="flex">
            {/* BCC */}
            <div className="form-control text-black">
              <label className="label items-start flex flex-col">
                <p className="text-sm font-bold">Bogor Creative Center</p>

                {ruanganBogor.map((ruangan) => (
                  <div
                    key={ruangan}
                    className="flex mt-3 gap-4 justify-between w-36"
                  >
                    <span className="label-text text-black">{ruangan}</span>
                    {dataInput.lokasi_gedung === "Bogor Creative Center" && (
                      <input
                        type="checkbox"
                        value={ruangan}
                        checked={selectOptions.includes(ruangan)}
                        onChange={handleCheckboxChange}
                        className="checkbox border-black"
                      />
                    )}
                  </div>
                ))}
              </label>
            </div>

            {/* PCC */}
            <div className="form-control text-black ml-10">
              <label className="label items-start flex flex-col">
                <p className="text-sm font-bold">Purwakarta Creative Center</p>
                {ruanganCreativeCenter.map((ruangan) => (
                  <div
                    key={ruangan}
                    className="flex mt-3 gap-4 justify-between w-36"
                  >
                    <span className="label-text text-black">{ruangan}</span>
                    {dataInput.lokasi_gedung ===
                      "Purwakarta Creative Center" && (
                      <input
                        type="checkbox"
                        value={ruangan}
                        checked={selectOptions.includes(ruangan)}
                        onChange={handleCheckboxChange}
                        className="checkbox border-black"
                      />
                    )}
                  </div>
                ))}
              </label>
            </div>

            {/* AD */}
            <div className="form-control text-black ml-10">
              <label className="label items-start flex flex-col">
                <p className="text-sm font-bold">Ruang Kreatif Ahmad Djuhara</p>
                {ruanganKreatifAD.map((ruangan) => (
                  <div
                    key={ruangan}
                    className="flex mt-3 gap-4 justify-between w-36"
                  >
                    <span className="label-text text-black">{ruangan}</span>
                    {dataInput.lokasi_gedung ===
                      "Ruang Kreatif Ahmad Djuhara" && (
                      <input
                        type="checkbox"
                        value={ruangan}
                        checked={selectOptions.includes(ruangan)}
                        onChange={handleCheckboxChange}
                        className="checkbox border-black"
                      />
                    )}
                  </div>
                ))}
              </label>
            </div>
          </div>

          <p className="mt-4 mb-2">Tanggal</p>
          <input
            disabled={!selectPemohon}
            value={dataInput.tanggal}
            onChange={(e) =>
              setDataInput({ ...dataInput, tanggal: e.target.value })
            }
            type="date"
            placeholder="Type here"
            name="tanggal"
            className="input input-bordered w-full max-w-xs bg-white disabled:bg-gray-100 disabled:border-none disabled:text-black disabled:cursor-not-allowed"
          />

          <p className="mt-4 mb-2">Denda</p>
          <input
            onChange={(e) =>
              setDataInput({ ...dataInput, denda: e.target.value })
            }
            type="number"
            placeholder="Type here"
            name="dendaKerusakan"
            className="input input-bordered w-full max-w-xs bg-white"
          />

          <div className="w-full max-w-xs mt-4 text-black ">
            <p className="text-sm mb-2">Bukti Kerusakan</p>
            <input
              type="file"
              onChange={(e) => setBukti(e.target.files[0])}
              className="file-input file-input-bordered file-input-md  w-full max-w-xs bg-white"
              name="buktiKerusakan"
            />
          </div>

          <button
            disabled={loadingUpload}
            onClick={handleSubmit}
            className="btn mt-4 bg-green-500 hover:bg-white text-black disabled:bg-slate-600 disabled:text-gray-300 disabled:cursor-not-allowed"
          >
            {loadingUpload ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

const ruanganBogor = [
  "Cafe Outdoor",
  "Cafe Indoor",
  "Ruang Galeri",
  "Ruang Fotografi",
  "Ruang Musik",
  "Auditorium",
];

const ruanganCreativeCenter = [
  "Ruang Flexible",
  "Workshop",
  "Auditorium",
  "Ruang Kelas",
  "Ruang Audio",
];

const ruanganKreatifAD = [
  "Gor",
  "Workshop",
  "Plaza Terbuka",
  "Co-working Space",
  "Auditorium",
  "Kantin",
];
