export const Nutrition = ({ label, quantity, unit }) => {
    return (
        <div>
            <p>{label}-{quantity} {unit}</p>
        </div>
    )
}