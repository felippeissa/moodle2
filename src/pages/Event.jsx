import { useParams } from "react-router-dom"
import { Header } from "../components/Header"
import { Lesson } from "../components/Lesson"
import { Sidebar } from "../components/Sidebar"
import { Video } from "../components/Video"

export const Event = () => {

    const { slug } = useParams()

    return(
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex flex-1 w-full">
                { slug 
                ? <Video lessonSlug={slug} />
                : <div className="flex flex-1 justify-center items-center">
                    <p className="text-lg text-gray-300 uppercase">Selecione uma aula</p>
                    </div>
                }
                <Sidebar />
            </main>
        </div>
    )
}