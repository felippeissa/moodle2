import { gql, useQuery } from "@apollo/client"
import { DefaultUi, Player, Youtube } from "@vime/react"
import { DiscordLogo, Lightning, FileArrowDown, CaretRight, Image } from "phosphor-react"
import { Button } from "../Button"
import { Card } from "../Card"
import { Footer } from "../Footer"
import { useSelector } from 'react-redux'

import '@vime/core/themes/default.css'
import { useLocation } from "react-router-dom"

const GET_LESSON_BY_SLUG_QUERY = gql`
    query GetLessonBySlug($slug: String) {
        lesson(where: {slug: $slug}) {
            title
            videoId
            description
            teacher {
                bio
                avatarURL
                name
            }
        }
    }
`

// const GET_LESSON_BY_SLUG_QUERY = gql`
//     query GetLessonBySlug($slug: String) {
//         lesson(where: {slug: $slug}) {
//             videoId
//             title
//             description
//             availableAt
//             slug
//             teacher {
//                 bio
//                 avatarURL
//                 name
//             }

//         }
//     }
// `

const GET_LESSONS_QUERY = gql`
    query {
        lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
            id
            title
            description
            lessonType
            availableAt
            title
            slug
            teacher {
                bio
                avatarURL
                name
            }
        }
    }
`

export const Video = ({ lessonSlug }) => {

    const videoId = useQuery(GET_LESSON_BY_SLUG_QUERY, {
        variables: {
            slug: lessonSlug
        }
    })
    
    const menuOpened = useSelector(state => state)
    
    const { data } = useQuery(GET_LESSONS_QUERY)
    console.log(data)

    const location = useLocation()

    const dataMap = data?.lessons.map(lesson => lesson)
    const dataMapFilter = dataMap?.filter(lesson => lesson.slug == location.pathname.split('/')[3])

    if(!data || !dataMapFilter || !videoId) {
        return (
            <div className="flex flex-1 justify-center items-center">
                <p>Carregando...</p>
            </div>
        )
    }

    return(
        <div className={`flex-1 lg:${menuOpened ? "hidden" : "initial"}`}>
            <div className="bg-black flex justify-center">
                <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
                    <Player>
                        <Youtube key={videoId?.data?.lesson.videoId} cookies={true} videoId={videoId?.data?.lesson.videoId} />
                        <DefaultUi />
                    </Player>
                </div>
            </div>
            <div className="p-8 max-w-[1100px] mx-auto lg:pb-0">
                <div className="flex items-start gap-16 lg:flex-col lg:gap-6">
                    
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">
                            {dataMapFilter[0]?.title}
                        </h1>
                        <p className="mt-4 text-gray-200 leading-relaxed">
                            {dataMapFilter[0]?.description}
                        </p>

                       {dataMapFilter[0]?.teacher && (
                       <div className="flex items-center gap-4 mt-6">
                            <img
                            className="h-16  w-16 rounded-full border-2 border-blue-500"
                            src={dataMapFilter[0]?.teacher.avatarURL} alt="" />

                            <div className="leading-relaxed">
                                <strong className="font-bold text-2xl block">
                                    {dataMapFilter[0]?.teacher.name}
                                </strong>
                                <span className="text-gray-200 text-sm block">{dataMapFilter[0]?.teacher.bio}</span>
                            </div>

                        </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-4 lg:w-full">
                        <Button 
                        variant="primary"
                        text="Comunidade discord"
                        icon={<DiscordLogo size={24} />}
                        />
                        <Button 
                        variant="secondary"
                        text="Acesse o desafio"
                        icon={<Lightning size={24} />}
                        />
                    </div>

                </div>
                <div className="gap-8 mt-20 grid grid-cols-2 lg:grid-cols-1 lg:mt-16">
                    <Card 
                    primaryIcon={<FileArrowDown size={24} />}
                    primaryText="Material complementar"
                    secondaryText="Acesse o material complementar para acelerar seu desenvolvimento"
                    secondaryIcon={<CaretRight size={24} />}
                    />
                    <Card
                    primaryIcon={<Image size={24} />}
                    primaryText="Wallpapers exclusivos"
                    secondaryText="Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina"
                    secondaryIcon={<CaretRight size={24} />}
                    />
                </div>
            </div>
              <Footer />
        </div>
    )
}