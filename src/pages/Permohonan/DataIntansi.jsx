import React from 'react'
import SideNav2 from '../../components/SideNav2/SideNav2'

export default function DataIntansi() {
  return (
    <div className='bg-white h-screen'>
            <div className="flex">
                <SideNav2/>
                <div className="overflow-x-auto my-20 w-auto bg-slate-50 text-black rounded-md border p-10 ">
                    <div className="flex">
                        <div className="mr-20 font-semibold">
                            <p className='mb-2'>Nama Intansi</p>
                            <p className='mb-2'>Alamat Intansi</p>
                            <p className='mb-2'>No Telepon</p>
                            <p className='mb-2'>Email</p>
                            <p className='mb-2'>Status dalam Intansi</p>
                        </div>
                        <div className="">
                            <p className='mb-2'>Fauziah Nur Syifa</p>
                            <p className='mb-2'>Jl.Bakti Mas II </p>
                            <p className='mb-2'>Leuwigajah</p>
                            <p className='mb-2'>Baros</p>
                            <p className='mb-2'>Bandung</p>
                        </div>
                    </div>
                </div>
        </div>
    </div>
)}
