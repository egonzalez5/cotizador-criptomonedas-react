import axios from 'axios';
import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import useCriptomoneda from '../hooks/useCriptomoneda';
import useMoneda from '../hooks/useMoneda';


const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326ac0;
        cursor:pointer
    }
`;

const Formulario = () => {

    // state listado criptomonedas

    const [listacripto, guardarCriptomonedas] = useState([]);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' },
        { codigo: 'CLP', nombre: 'Peso Chileno' }
    ];


    //utilizamos useMoneda (se pueden utilizar nombres distintaos a los retornados en useMoneda)
    const [ moneda, SelectMonedas, actualizarState] = useMoneda('elige tu moneda', '', MONEDAS);

    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto)

    useEffect (() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);

            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    return ( 
        <form>

            <SelectMonedas />
            
            <SelectCripto />

            <Boton 
                 type="submit"
                 value="Calcular"
            />
        </form>
     );
}
 
export default Formulario;