import * as React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Category.css";


export default function Category(props) {
    const {id, categoryName, handleGetList, setActive, index, active} = props;
    const handleClick = () => {
        setActive(index);
        handleGetList(id);
    };
    return (
        <div className={(index === active ? "active " : "") + "category"} onClick={() => {handleClick();}}>
            {categoryName}
        </div>
    )
}