"use client";
import { useEffect } from 'react';

const InputDonations = ({ disabled, value, onChange }) => {

    useEffect(() => {
        onChange(0);
    }, [disabled]);

    const addHandler = () => {
        onChange(value + 1);
    };

    const subHandler = () => {
        if (value === 0) return;
        onChange(value - 1);
    }

    return (
        <div className="input-group mb-3 input-donation-group">
            <button className="btn btn-yellow" type="button" disabled={!disabled} onClick={addHandler}>+</button>
            <input
                type="number"
                className="form-control input-donation"
                value={value}
                disabled={true}
            />
            <button className="btn btn-yellow" type="button" disabled={!disabled} onClick={subHandler}>-</button>
        </div>
    );
};

export default InputDonations;