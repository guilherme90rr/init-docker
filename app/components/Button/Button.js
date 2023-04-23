export default function Button(props){
    return (
        <>
            <button className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500" style={{width: props.largura, height: props.altura}} type={props.type}>{props.title}</button>
        </>
    )
}