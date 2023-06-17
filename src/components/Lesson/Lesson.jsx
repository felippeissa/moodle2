import { CaretLeft, CheckCircle } from 'phosphor-react'
import { Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { menuOpen }  from '../../redux/action'

export const Lesson = ({ title, slug, availableAt, type }) => {

    const dispatch = useDispatch()
    const menuOpened = useSelector(state => state)

    const location = useLocation()
    const lessonSlug = location.pathname.split('/')[3]

    const isActiveLesson = lessonSlug === slug
    
    const isLessonAvailable = isPast(availableAt)
    const availableDateFormatted = format(availableAt, "EEEE ' • ' d ' de ' MMMM ' • ' k'h'mm", {locale: ptBR})

    const URL = `/event/lesson/${slug}`

    return(
        <Link to={isLessonAvailable && URL} className={` relative group ${!isLessonAvailable ? "pointer-events-none" : "pointer-events-auto"}`} onClick={() => { menuOpened && setTimeout(() => dispatch(menuOpen(false)), 100)}}>
            {
                isActiveLesson && <CaretLeft size={32} weight="fill" className='text-green-500 absolute top-2/4 -left-[1.2rem]' />
            }
            <span className="text-gray-300">
                {availableDateFormatted}
            </span>

            <div className={classNames("rounded border border-gray-500 p-4 mt-2 transition-colors", {
                "bg-green-500 border-none": isActiveLesson,
                "group-hover:border-green-500": isLessonAvailable,

            })}>
                <header className="flex items-center justify-between">
                    { isLessonAvailable ? (
                    <span className={classNames("text-sm font-medium flex items-center gap-2", {
                        "text-white": isActiveLesson,
                        "text-blue-500": !isActiveLesson
                    })}>
                        <CheckCircle size={20} />
                        Conteúdo liberado
                    </span>
                    ) : (
                    <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                        <Lock size={20} />
                        Em breve
                    </span>
                    )
                    }
                    <span className={classNames("text-xs rounded py-{0.125rem} px-2 text-white border font-bold", {
                        "border-white": isActiveLesson,
                        "border-green-300": !isActiveLesson
                    })}>
                        {type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
                    </span>
                </header>

                <strong className={classNames("mt-5 block", {
                    "text-white": isActiveLesson,
                    "text-gray-200": !isActiveLesson
                })}>
                    {title}
                </strong>
            </div>
        </Link>
    )
}