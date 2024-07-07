import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/Landing Page/LandingPage";
import Permohonan from "../pages/Permohonan/Permohonan";
import DetailPermohonan from "../pages/Permohonan/DetailPermohonan";
import PCC from "../pages/Permohonan/PCC";
import AD from "../pages/Permohonan/AD";
import DataIntansi from "../pages/Permohonan/DataIntansi";
import DataAcara from "../pages/Permohonan/DataAcara";
import PermohonanDitolak from "../pages/Permohonan/PermohonanDitolak";
import Laporan from "../pages/Laporan Akhir Acara/Laporan";
import DetailLaporan from "../pages/Laporan Akhir Acara/DetailLaporan";
import LaporanPCC from "../pages/Laporan Akhir Acara/LaporanPCC";
import LaporanAD from "../pages/Laporan Akhir Acara/LaporanAD";
import LaporanKerusakan from "../pages/Laporan Kerusakan/LaporanKerusakan";
import LaporanKerusakanPCC from "../pages/Laporan Kerusakan/LaporanKerusakanPCC";
import LaporanKerusakanAD from "../pages/Laporan Kerusakan/LaporanKerusakanAD";
import Permohonan2 from "../pages/Tim Kreasi/Permohonan2";
import Permohonan2AD from "../pages/Tim Kreasi/Permohonan2AD";
import Permohonan2PCC from "../pages/Tim Kreasi/Permohonan2PCC";
import Dashboard2 from "../pages/Landing Page/Dashboard2";
import LaporanKerusakanFasilitas from "../pages/Admin 3/LaporanKerusakanFasilitas";
import TambahLaporan from "../pages/Admin 3/TambahLaporan";
import Login from "../pages/LogIn/Login";
import PrivateRoute from "../components/private-route/PrivateRoute";
import PrivateRouteAuth from "../components/private-route/PrivateRouteAuth";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRouteAuth />}>
            <Route path="/login" Component={Login} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/" Component={LandingPage} />
            <Route path="/dashboard" Component={Dashboard2} />
            <Route path="/permohonan" Component={Permohonan} />
            <Route path="/permohonanTimKreasi" Component={Permohonan2} />
            <Route path="/permohonanPCCTimKreasi" Component={Permohonan2PCC} />
            <Route path="/permohonanADTimKreasi" Component={Permohonan2AD} />
            <Route path="/detailPermohonan" Component={DetailPermohonan} />
            <Route path="/detailPermohonanPCC" Component={PCC} />
            <Route path="/detailPermohonanAD" Component={AD} />
            <Route path="/dataIntansi" Component={DataIntansi} />
            <Route path="/dataAcara" Component={DataAcara} />
            <Route path="/permohonanDitolak" Component={PermohonanDitolak} />
            <Route path="/laporanAkhir" Component={Laporan} />
            <Route path="/detailLaporan" Component={DetailLaporan} />
            <Route path="/laporanAkhirPCC" Component={LaporanPCC} />
            <Route path="/laporanAkhirAD" Component={LaporanAD} />
            <Route path="/laporanKerusakan" Component={LaporanKerusakan} />
            <Route
              path="/laporanKerusakanPCC"
              Component={LaporanKerusakanPCC}
            />
            <Route path="/laporanKerusakanAD" Component={LaporanKerusakanAD} />
            <Route
              path="/laporanKerusakanFasilitas"
              Component={LaporanKerusakanFasilitas}
            />
            <Route path="/tambahLaporan" Component={TambahLaporan} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
