import styles from './Input.module.css'
export default function Input(props){
    
    return (
        <>
            <input className={styles.input} value={props.value} name={props.name} type={props.type} placeholder={props.placeholder} onChange={props.onchange} minLength={props.lengthMinimo} maxLength={props.lengthMaximo} required></input>
        </>
    )
}