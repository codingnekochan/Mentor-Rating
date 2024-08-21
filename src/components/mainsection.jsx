import PropTypes from 'prop-types'

export default function Main({children}){
    return <main className="w-full h-[87%] md:h-[85%]  lg:h-full[] flex">
        {children}
    </main> 
}

Main.propTypes = {
    children : PropTypes.any,
}
