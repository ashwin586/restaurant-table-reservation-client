import React from 'react'
import './Dashboard.css'
import AdminHeader from '../AdminHeader'
import AdminSideBar from '../AdminSideBar'

const Dashboard = () => {
    return (
        <>
            <AdminHeader />
            <AdminSideBar />
            <div className="ml-[260px]">
                <h1>The Dashboard</h1>
            </div>
        </>
    )
}

export default Dashboard