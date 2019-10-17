import React, { useState, useMemo } from 'react';
import api from '../../services/api'
import camera from '../../assets/camera.jpg';
import './styles.css'

export default function New({history}) {
    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('')

    const preview = useMemo(() => {
            return thumbnail ? URL.createObjectURL(thumbnail) : null;
        }, [thumbnail]
    )

    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user')

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: { user_id }
        });
        console.log(data)
        history.push('/dashboard')
    }
    return (
        <form onSubmit={handleSubmit}>
            <label id="thumbnail" style={{ backgroundImage: `url(${preview})`}}
            className={thumbnail ? 'has-thumbnail' : ''}>
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} style={{width:40}} alt="Select img"/>
            </label>
            <label htmlFor="company">EMPRESA *</label>
                <input 
                id="company"
                placeholder="Sua empresa incrível"
                value={company}
                onChange={event => setCompany(event.target.value)}
                />
        

            <label htmlFor="techs">TECNOLOGIA * <span>(separadas por vírgula)</span></label>
                <input
            id="techs"
            placeholder="Quais tecnologias usam?"
            value={techs}
            onChange={event => setTechs(event.target.value)} />

            <label htmlFor="techs">VALOR DA DIÁRIA * <span>(Em branco para GRATUITO)</span></label>
                <input
            id="price"
            placeholder="Valor cobrado por diária? (sem vírgula)"
            value={price}
            onChange={event => setPrice(event.target.value)} />

            <button type="submit" className="btn">Cadastrar</button>
        </form>
    )
}