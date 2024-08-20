import PropTypes from 'prop-types'

export default function Main({children}){
    return <main className="w-full h-[80%] md:h-[70%] flex justify-center items-center">
        {children}
    </main> 
}

Main.propTypes = {
    children : PropTypes.any,
}
