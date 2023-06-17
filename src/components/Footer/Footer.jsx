import { LogoRocketseat } from '../LogoRocketseat'
import className from 'classnames'
import React from 'react'

export const Footer = ({ variant }) => {

    if (variant == "secondary") {
        return (
            <footer className="w-full bg-gray-900">
                <div className='flex items-center mx-8 mb-5 mt-6 lg:flex-col gap-6'>
                    <LogoRocketseat />
                    <div className='flex justify-between w-full lg:flex-col text-center gap-6'>
                        <p className='text-gray-300'>Rocketseat - Todos os direitos reservados</p>
                        <a href="" className='text-gray-300'>Políticas de privacidade</a>
                    </div>
                </div>
            </footer>
        )
    }

    return (
        <footer className="max-w-[1100px] mx-auto">
            <div className='flex items-center mx-8 mb-5 mt-14 pt-6 border-t border-gray-500 lg:flex-col gap-6 lg:mt-16'>
                <LogoRocketseat />
                <div className='flex justify-between w-full lg:flex-col text-center gap-6'>
                    <p className='text-gray-300'>Rocketseat - Todos os direitos reservados</p>
                    <a href="" className='text-gray-300'>Políticas de privacidade</a>
                </div>
            </div>
        </footer>
    )
}