import { useParams } from "react-router-dom"

export default function Test(){
    const params = useParams()
    console.log(params.lessonId);
    return(
        <h1>Id:{params.lessonId}</h1>
    )
}