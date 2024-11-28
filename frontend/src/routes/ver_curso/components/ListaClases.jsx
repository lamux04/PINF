export const ListaClases = ({ clases }) => {
    return (
        <>
            {
                clases.map(clase => (
                    <>
                        <h3 key={clase.codigo}>d</h3>
                    </>
                ))
            }
        </>
    )
}