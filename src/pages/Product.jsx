import axios from "axios";
import {BASE_URL} from "../base/BaseUrl";
import {useParams} from 'react-router-dom'
import {useEffect, useState} from "react";

export const Product = () => {
    const id = useParams().id
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const getAll = async () => {
        try {
            const res = await axios.get(BASE_URL + "/product/" + id)
            setProducts(res.data)
            setLoading(true)
        } catch (err) {

        }
    }
    useEffect(() => {
        getAll()
    }, [])
    return (
        <div>
            {loading ? (
                <section className={"w-100"} style={{backgroundColor: "#eee", height: '100vh'}}>
                    <div className={"w-100"}>
                        <div>
                            <div className={"w-100 d-flex align-items-center justify-content-center"}>
                                <div className="card media" style={{borderRadius: "15px", width: "90%"}}>
                                    <div className="bg-image hover-overlay ripple ripple-surface ripple-surface-light"
                                         data-mdb-ripple-color="light">
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/12.webp"
                                            style={{borderTopLeftRadius: "15px", borderTopRightRadius: "15px"}}
                                            className="img-fluid"
                                            alt="Laptop"/>
                                        <a href="#!">
                                            <div className="mask"/>
                                        </a>
                                    </div>
                                    <div className="card-body pb-0">
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <p><a href="#!" className="text-dark">{products.name}</a></p>
                                                {/*<p className="small text-muted">{products.category.name}</p>*/}
                                            </div>
                                            <div>
                                                <div
                                                    className="d-flex flex-row justify-content-end mt-1 mb-4 text-danger">
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                </div>
                                                <p className="small text-muted">Rated 4.0/5</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-0"/>
                                    <div className="card-body pb-0">
                                        <div className="d-flex justify-content-between">
                                            <p><a href="#!" className="text-dark">${products.price}</a></p>
                                            <p className="text-dark">#### 8787</p>
                                        </div>
                                        <p className="small text-muted">VISA Platinum</p>
                                    </div>
                                    <hr className="my-0"/>
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center pb-2 mb-1">
                                            <a href="#!" className="text-dark fw-bold">Cancel</a>
                                            <button type="button" className="btn btn-primary">Buy now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <h1>loading...</h1>
            )}
        </div>
    )
}