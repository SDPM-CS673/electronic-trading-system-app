import axios from 'axios'; // Ensure axios is imported
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from './Sidebar.jsx'; // Make sure the path to Sidebar is correct

const Dashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for managing sidebar visibility

    // Function to toggle sidebar
    const toggleSidebar = () => setIsSidebarOpen(prevState => !prevState);
    
    // Function to close sidebar
    const closeSidebar = () => setIsSidebarOpen(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        console.log('dashboard token:', token);

        if (!token) {
            setError('No token found. Please log in.');
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/my_account', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`, // Pass the token in the Authorization header
                    },
                    withCredentials: true, // Optional depending on your API
                });

                if (response.data.success) {
                    console.log("SUCCESS in fetchUserData in dashboard.jsx frontend")
                    console.log(response.data.user);
                    setUserData(response.data.user); // Assuming 'user' contains the user info
                } else {
                    setError('Failed to fetch user data. Please try again later.');
                }
            } catch (error) {
                setError('Failed to fetch user data. Please try again later.');
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [navigate]);  // Added navigate to dependency to ensure it updates correctly when `navigate` changes

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex">
            {/* Sidebar component */}
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

            <div className="flex-1 p-4">
                <button
                    className="text-white p-2 bg-blue-500 rounded md:hidden"
                    onClick={toggleSidebar} // Toggle sidebar visibility
                >
                    Toggle Sidebar
                </button>

                <h1 className="text-2xl mt-4">My Account</h1>
                {userData ? (
                    <div>
                        <h1>Welcome, {userData.name}!</h1>
                        {/* Render other user data here */}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
