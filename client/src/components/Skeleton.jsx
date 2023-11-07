import React from 'react'
import "./skeleton.scss"
const Skeleton = ({ type, length }) => {
    const number = length
    const PopularHotelSkeleton = ({i}) => (
        <div className="popilarHotelSK" key={i}>
            <div className="imgSK"></div>
            <div className="InfoSK">
                <div className="titleSK"></div>
                <div className="subTitleSK"></div>
                <div className="priceSK"></div>
                <div className="reteAndCommentSK"></div>
            </div>
        </div>
    );
    const AmountSkeleton = () => (
        <div className="amountSK" />
    );

    if (type === "popilarHotel") return Array(number).fill().map((item, i) =><PopularHotelSkeleton key={i} />)

    if (type === "Amount") return <AmountSkeleton/>

}

export default Skeleton