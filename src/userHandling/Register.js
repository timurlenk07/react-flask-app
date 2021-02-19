import {useState, useEffect} from 'react';

export default function Register(props) {
    return (
        <div>
            <h1>Regisztrációs űrlap</h1>
            Kérem töltse ki az alábbi mezőket.
            <form>
                <label><input type='radio'/>Magánszemély</label>
                <label><input type='radio'/>Cég</label>
            </form>
        </div>
    )
}