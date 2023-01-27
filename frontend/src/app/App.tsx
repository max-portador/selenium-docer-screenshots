import { MainPage } from "pages/MainPage"
import { Suspense } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import { Navbar } from "widgets/Navbar"
import { Sidebar } from "widgets/Sidebar"
import { useTheme } from "./providers/ThemeProvider"



export const App = () => {
    const { theme } = useTheme();


    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    <MainPage />
                </div>
            </Suspense>
        </div>


    )
}