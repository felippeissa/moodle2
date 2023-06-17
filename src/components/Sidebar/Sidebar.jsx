import { gql, useQuery } from '@apollo/client'
import { Lesson } from '../Lesson'
import { useDispatch, useSelector } from 'react-redux'
import { menuOpen } from "../../redux/action"
import classNames from 'classnames'

const GET_LESSONS_QUERY = gql`
    query {
        lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
            id
            lessonType
            availableAt
            title
            slug
        }
    }
`

export const Sidebar = () => {

    const { data } = useQuery(GET_LESSONS_QUERY)

    const menuOpened = useSelector(state => state)

    return(
        <aside className={classNames("w-[348px] bg-gray-700 p-6 border-l border-gray-600", {
            "lg:hidden": !menuOpened,
            "lg:w-full block absolute z-50 top-15 right-0": menuOpened
        })}>
            <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
                Cronograma de aulas
            </span>

            <div className='flex flex-col gap-8'>
                {data?.lessons.map(lesson => {
                    return(
                        <Lesson
                            key={lesson.id}
                            title={lesson.title}
                            slug={lesson.slug}
                            availableAt={new Date(lesson.availableAt)}
                            type={lesson.lessonType}
                        />
                    )
                })}
            </div>
        </aside>
    )
}