import axios from "axios";
import {BASE_URL} from "../base/BaseUrl";
import {useParams, useNavigate} from 'react-router-dom'
import {useEffect, useState} from "react";

export const Product = () => {
    const navigate = useNavigate()
    const id = useParams().id
    const chatId = useParams().chatId
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [like, setLike] = useState(false)
    const [basket, setBasket] = useState(false)

    const getAll = async () => {
        try {
            const res = await axios.get(BASE_URL + "/product/" + id)
            setProducts(res.data)
            const likeRes = await axios.get(BASE_URL + "/product/like/" + id + "?chatId=" + chatId)
            const basketRes = await axios.get(BASE_URL + "/product/basket/" + id + "?chatId=" + chatId)
            setLike(likeRes.data.success)
            setBasket(basketRes.data.success)
            setLoading(true)
        } catch (err) {

        }
    }
    useEffect(() => {
        getAll()
    }, [])
    const basketAndLike = async (status) => {
        try {
            const res = await axios.put(BASE_URL + "/product/like-basket/" + id + "?chatId=" + chatId + "&status=" + status)
            await getAll()
            navigate("/product/" + id + "/" + chatId)
            await getAll()
        } catch (err) {
        }
    }
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
                                        {products.photoId ? (
                                            <img
                                                src={BASE_URL + "/attachment/download?id=" + products.photoId}
                                                style={{borderTopLeftRadius: "15px", borderTopRightRadius: "15px"}}
                                                className="img-fluid"
                                                alt="Laptop"/>
                                        ) : (
                                            <></>
                                        )}
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
                                                    <i className="fas fa-star"/>
                                                    <i className="fas fa-star"/>
                                                    <i className="fas fa-star"/>
                                                    <i className="fas fa-star"/>
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
                                            <button type="button" className="btn"
                                                    onClick={() => basketAndLike('like')}><i
                                                className="bi bi-suit-heart"
                                                style={like ? {color: 'red'} : {color: 'black'}}/>
                                            </button>
                                            <button type="button" className="btn btn-success"
                                                    onClick={() => basketAndLike('basket')}><i
                                                className="bi bi-cart4"
                                                style={basket ? {color: 'green'} : {color: 'yellow'}}/></button>
                                            <button type="button" className="btn btn-primary">Buy now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <section className={"w-100"} style={{backgroundColor: "#eee", height: '100vh'}}>
                    <div className={"w-100"}>
                        <div>
                            <div className={"w-100 d-flex align-items-center justify-content-center"}>
                                <div className="card media" style={{borderRadius: "15px", width: "90%"}}>
                                    <div className="card" aria-hidden="true">
                                        <div className="w-100 bg-secondary placeholder" style={{
                                            height: '42vh',
                                            borderTopLeftRadius: "15px",
                                            borderTopRightRadius: "15px"
                                        }}/>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title placeholder-glow">
                                            <span className="placeholder col-6"/>
                                        </h5>
                                    </div>
                                    <hr className="my-0"/>
                                    <p className="card-text placeholder-glow p-3">
                                        <span className="placeholder col-7"/>
                                        <span className="placeholder col-4"/>
                                        <span className="placeholder col-4"/>
                                        <span className="placeholder col-6"/>
                                        <span className="placeholder col-8"/>
                                    </p>
                                    <a className="btn btn-primary disabled placeholder col-6" aria-disabled="true"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}