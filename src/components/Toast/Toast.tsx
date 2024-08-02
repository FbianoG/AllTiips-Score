import { useEffect } from 'react'
import './Toast.css'

interface ToastProps {
    variant: "success" | "error" | "alert"
    text: string
    onClick: React.Dispatch<React.SetStateAction<any>>
}

let time = 0

const Toast: React.FC<ToastProps> = ({ variant, text, onClick }) => {

    useEffect(() => {
        clearTimeout(time)
        time = setTimeout(() => { onClick(false) }, 5000)
    }, [])
    
    return (
        <div className={`toast ${variant}`}>
            {variant === 'success' && <i className="fa-solid fa-circle-check"></i>}
            {variant === 'error' && <i className="fa-solid fa-circle-exclamation"></i>}
            {variant === 'alert' && <i className="fa-solid fa-triangle-exclamation"></i>}
            <div className="toast__data">
                {variant === 'success' && <h3>Sucesso</h3>}
                {variant === 'error' && <h3>Erro</h3>}
                {variant === 'alert' && <h3>Alerta</h3>}
                <span>{text}</span>
            </div>
            <button onClick={() => onClick(false)}>❌</button>
        </div>
    )
}

export default Toast