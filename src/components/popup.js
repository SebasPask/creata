"use client";
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRouter } from "next/navigation";

function Popup({ show, handleClose }) {
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    const navigateToDonations = () => {
        handleClose(); // Close the modal first
        router.push("/donations"); // Navigate to the donations page
    };

    useEffect(() => {
        setIsClient(true); // Ensure this component is only rendered on the client
    }, []);

    if (!isClient) { return null; } // Avoid rendering on the server

    return (
        <div style={{ display: 'block', position: 'initial' }}>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Donation submitted successfully!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, thank you for your donation.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={navigateToDonations}>
                        View Donations
                    </Button>
                    <Button variant="primary btn-yellow" onClick={handleClose}>
                        Donate Again
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
}

export default Popup;