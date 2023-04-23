import { Outlet } from "react-router-dom"
import { Sidebar } from "../sidebar/sidebat"
import style from './layout.module.css'
import DenseAppBar from "../appbar/appbar"

export const Layout = () => {
  return (
    <div className={style.root}>
      <DenseAppBar />
      <div className={style.body}>
        <div className={style.sidebar}>
          <Sidebar />
        </div>
        <div className={style.pages}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}