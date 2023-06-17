export const Card = ({ primaryIcon, primaryText, secondaryText, secondaryIcon }) => {
    return (
        <a href="" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
            <div className="bg-green-700 h-full p-6 flex items-center">
                {primaryIcon}
            </div>
            <div className="py-6 leading-relaxed">
                <strong className="text-2xl">
                    {primaryText}
                </strong>
                <p className="text-sm text-gray-200 mt-2">
                    {secondaryText}
                </p>
            </div>
            <div className="h-full p-6 flex items-center">
                {secondaryIcon}
            </div>
        </a>
    )
}