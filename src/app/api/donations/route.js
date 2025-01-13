import db from '../../../lib/db';

export async function GET() {
    try {
        const [rows] = await db.query('SELECT * FROM donations');
        console.log('Database query successful, rows:', rows);
        return new Response(JSON.stringify(rows), { status: 200 });
    } catch (error) {
        console.error('Error fetching donations:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch donations', details: error.message }), {
            status: 500,
        });
    }
}


export async function POST(req) {
    try {
        // Parse the request body
        const { uniqueCode, firstName, lastName, email, amount } = await req.json();

        // Validate input
        if (!uniqueCode || uniqueCode.length !== 18) {
            return new Response(JSON.stringify({ error: 'Invalid unique code' }), { status: 400 });
        }
        if (!firstName || firstName.length < 2 || firstName.length > 16) {
            return new Response(JSON.stringify({ error: 'Invalid first name' }), { status: 400 });
        }
        if (!lastName || lastName.length < 2 || lastName.length > 16) {
            return new Response(JSON.stringify({ error: 'Invalid last name' }), { status: 400 });
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return new Response(JSON.stringify({ error: 'Invalid email address' }), { status: 400 });
        }
        if (!amount || isNaN(amount) || amount <= 0) {
            return new Response(JSON.stringify({ error: 'Invalid donation amount' }), { status: 400 });
        }

        // Insert donation into the database
        const [result] = await db.query(
            'INSERT INTO donations (unique_code, first_name, last_name, email, amount) VALUES (?, ?, ?, ?, ?)',
            [uniqueCode, firstName, lastName, email, amount]
        );

        return new Response(
            JSON.stringify({ message: 'Donation created successfully!', donationId: result.insertId }),
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating donation:', error);
        return new Response(JSON.stringify({ error: 'Failed to create donation', details: error.message }), {
            status: 500,
        });
    }
}