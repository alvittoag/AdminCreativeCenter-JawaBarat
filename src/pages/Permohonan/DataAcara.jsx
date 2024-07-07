import React from 'react'
import SideNav2 from '../../components/SideNav2/SideNav2'
import { NavLink } from 'react-router-dom'

export default function DataAcara() {
  return (
    <div className='bg-white h-screen'>
            <div className="flex">
                <SideNav2/>
                <div className="overflow-x-auto my-20 w-auto bg-slate-50 text-black rounded-md border p-10 ">
                    <div className="flex">
                        <div className="mr-20 font-semibold">
                            <p className='mb-2'>Lokasi Gedung</p>
                            <p className='mb-2'>Ruangan</p>
                            <p className='mb-2'>Subsektor Acara</p>
                            <p className='mb-2'>Jenis Acara</p>
                            <p className='mb-2'>Nama Acara</p>
                            <p className='mb-2'>Tanggal Mulai</p>
                            <p className='mb-2'>Tanggal Berakhir</p>
                            <p className='mb-2'>Jam Mulai</p>
                            <p className='mb-2'>Jam Berakhir</p>
                            <p className='mb-2'>Jumlah Peserta</p>
                            <p className='mb-2'>Surat Permohonan</p>
                        </div>
                        <div className="">
                            <p className='mb-2'>Fauziah Nur Syifa</p>
                            <p className='mb-2'>Jl.Bakti Mas II </p>
                            <p className='mb-2'>Leuwigajah</p>
                            <p className='mb-2'>Baros</p>
                            <p className='mb-2'>Bandung</p>
                            <p className='mb-2'>Bandung</p>
                            <p className='mb-2'>Bandung</p>
                            <p className='mb-2'>Bandung</p>
                            <p className='mb-2'>Bandung</p>
                            <p className='mb-2'>Bandung</p>
                            <p className='mb-2'>Bandung</p>
                        </div>
                    </div>
                    <div className="flex mt-5 justify-center">
                        <NavLink to='/permohonan'>
                            <div className="btn mr-5 bg-green-600 text-white border-none">Terima</div>
                        </NavLink>
                        <NavLink to='/permohonanDitolak'>
                            <div className="btn bg-red-600 text-white border-none">Tolak</div>
                        </NavLink>
                    </div>
                </div>
        </div>
    </div>
)}
