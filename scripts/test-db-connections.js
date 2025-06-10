const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const { Pool } = require('pg');

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Supabase (Neon) configuration
const supabaseConnectionString = 'postgresql://neondb_owner:npg_mdSgtJp8b4Yl@ep-dark-term-a5n1nxn8-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require';

async function testFirebaseConnection() {
  try {
    console.log('Testing Firebase connection...');
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    // Try to fetch a collection
    const querySnapshot = await getDocs(collection(db, 'users'));
    console.log('✅ Firebase connection successful!');
    console.log(`Found ${querySnapshot.size} documents in users collection`);
    
    return true;
  } catch (error) {
    console.error('❌ Firebase connection error:', error.message);
    return false;
  }
}

async function testSupabaseConnection() {
  const pool = new Pool({
    connectionString: supabaseConnectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('\nTesting Supabase connection...');
    
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time');
    
    console.log('✅ Supabase connection successful!');
    console.log('Current database time:', result.rows[0].current_time);
    
    // Test if tables exist
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('\nExisting tables in database:');
    tablesResult.rows.forEach(row => {
      console.log(`- ${row.table_name}`);
    });

    client.release();
    return true;
  } catch (err) {
    console.error('❌ Supabase connection error:', err.message);
    return false;
  } finally {
    await pool.end();
  }
}

async function runTests() {
  console.log('Starting database connection tests...\n');
  
  const firebaseResult = await testFirebaseConnection();
  const supabaseResult = await testSupabaseConnection();
  
  console.log('\nTest Summary:');
  console.log('Firebase:', firebaseResult ? '✅ Connected' : '❌ Failed');
  console.log('Supabase:', supabaseResult ? '✅ Connected' : '❌ Failed');
}

runTests().catch(console.error); 