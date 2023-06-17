import { List, X } from "phosphor-react"
import { Logo } from "../Logo"
import { useDispatch, useSelector } from 'react-redux'
import { menuOpen } from "../../redux/action"

export const Header = () => {

    const dispatch = useDispatch()
    const menuOpened = useSelector(state => state)

    return(
        
        <header className="w-full py-[19px] flex items-center justify-center bg-gray-700 border-b border-gray-600 lg:justify-between px-6">
            <Logo />
            {
                !menuOpened 
                ? <List
                    size={34}
                    className="hidden lg:block cursor-pointer"
                    onClick={() => dispatch(menuOpen(true))}
                />
                : <X
                    size={34}
                    className="hidden lg:block cursor-pointer"
                    onClick={() => dispatch(menuOpen(false))}
                />
            }
            
        </header>
    )
}