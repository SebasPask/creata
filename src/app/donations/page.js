'use client';
import "../global.css";
import { useState, useEffect } from 'react';

export default function DonationsPage() {
    const [donations, setDonations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchDonations() {
            try {
                const response = await fetch('/api/donations');
                if (!response.ok) {
                    throw new Error('Failed to fetch donations');
                }
                const data = await response.json();
                setDonations(data);
            } catch (err) {
                setError(err.message);
            }
        }
        fetchDonations();
    }, []);

    return (
        <div className="container  h-100">
            <div className="row align-items-center h-100">
                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-10 mx-auto donations-list">
                    <h1 className="text-center p-5">Donation List</h1>
                    <p className="text-center px-5">Sapien et ligula ullamcorper malesuada proin libero nunc consequat. Sed lectus vestibulum mattis ullamcorper.</p>
                    <div className="table-responsive">
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {donations.length > 0 ? (
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Unique Code</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Amount</th>
                                        <th>Created At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {donations.map((donation) => (
                                        <tr key={donation.id}>
                                            <td>{donation.unique_code}</td>
                                            <td>{donation.first_name}</td>
                                            <td>{donation.last_name}</td>
                                            <td>{donation.email}</td>
                                            <td>${donation.amount}</td>
                                            <td>{new Date(donation.created_at).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No donations found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
