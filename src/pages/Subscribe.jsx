import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from "../components/Logo"
import { Footer } from "../components/Footer"
import code_mockup from "../assets/code-mockup.png"

const CREATE_SUBSCRIBER_MUTATION = gql`
    mutation CreateSubscriber($name: String!, $email: String!) {
        createSubscriber(data: {name: $name, email: $email}) {
            id
        }
}
`

export const Subscribe = () => {

    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const [createSubscriber, { loading }] = useMutation(CREATE_SUBSCRIBER_MUTATION)

    async function handleSubscribe (event) {
        event.preventDefault()

        await createSubscriber({
            variables: {
                name,
                email
            }
        })

        navigate('/event/lesson/abertura-do-evento-ignite-lab')
    }

    return (
        <div className="flex justify-between min-h-screen bg-blur bg-cover bg-no-repeat flex-col items-center before:content-[''] before:absolute before:w-full before:h-[100vh] before:bg-no-repeat before:bg-top before:bg-react before:mt-2.5">

            <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto lg:flex-col">
                <div className="max-w-[640px] lg:flex flex-col items-center lg:text-center px-6">
                    <Logo />
                    <h1 className="mt-8 text-[2.5rem] leading-tight">
                        Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500" >React</strong>
                    </h1>
                    <p className="mt-4 text-gray-200 leading-relaxed">
                        Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
                    </p>
                </div>
                <div className="p-8 bg-gray-700 border border-gray-500 rounded lg:w-full max-w-3xl mt-8 z-10">
                    <strong className="text-2xl mb-6 block">
                        Increva-se gratuitamente
                    </strong>
                    
                    <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
                        <input
                        className="bg-gray-900 rounded px-5 h-14 outline-none focus:border border-green-300 outline-1 focus:placeholder:text-transparent"
                        type="text"
                        placeholder="Seu nome completo" 
                        onChange={event => setName(event.target.value)}
                        />

                        <input
                        className="bg-gray-900 rounded px-5 h-14 outline-none focus:border border-green-300 outline-1 focus:placeholder:text-transparent"
                        type="email"
                        placeholder="Digite seu email" 
                        onChange={event => setEmail(event.target.value)}
                        />

                        <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Garantir minha vaga
                        </button>
                    </form>

                </div>
            </div>

            <img src={code_mockup} className="lg:px-1.5" alt=""/>
            <Footer variant={"secondary"} />
        </div>
    )
}