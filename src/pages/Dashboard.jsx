import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from './Sidebar.jsx';

const Dashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [file, setFile] = useState(null);  // State to store selected file for upload
    const [profilePicUrl, setProfilePicUrl] = useState('');  // State to hold the updated profile picture URL

    // Function to toggle sidebar
    const toggleSidebar = () => setIsSidebarOpen(prevState => !prevState);

    // Function to close sidebar
    const closeSidebar = () => setIsSidebarOpen(false);

    // Handle file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle file upload (for updating profile picture)
    const handleFileUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            setError("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);
        formData.append("username", userData.name);
        console.log("USERDATA", userData);

        for (let pair of formData.entries()) {
            console.log(pair[0] + ": " + pair[1]);  // Logs key and value of FormData
        }

        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.post('https://team-2-cs673-deployment.onrender.com/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`, // Send token for authentication
                },
            });

            console.log(response.data);
            if (response.data.success) {
                const newProfilePicUrl = response.data.profilePicUrl;
                setUserData((prevUserData) => ({
                    ...prevUserData,
                    user_image_ref: newProfilePicUrl,
                }));
                setProfilePicUrl(newProfilePicUrl);  // Optional, if `profilePicUrl` is being used elsewhere
            } else {
                setError("Failed to upload profile picture.");
            }
        } catch (error) {
            setError("An error occurred while uploading the profile picture.");
            console.error('Error uploading profile picture:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        console.log('dashboard token:', token);

        if (!token) {
            setError('No token found. Please log in.');
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await axios.get('https://team-2-cs673-deployment.onrender.com/my_account', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    withCredentials: true,
                });

                if (response.data.success) {
                    console.log("RESPONSE SUCCESS", response.data.user);
                    setUserData(response.data.user);
                    setProfilePicUrl(response.data.user.user_image_ref || '');  // Set profile picture URL if available
                } else {
                    setError('Failed to fetch user data. Please try again later.');
                }
            } catch (error) {
                setError('Failed to fetch user data. Please try again later.');
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [navigate]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar component */}
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

            <div className="flex-1 flex justify-center items-center p-4">
                <div key={profilePicUrl || userData?.user_image_ref} className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
                    <button
                        className="text-white p-2 bg-blue-500 rounded md:hidden"
                        onClick={toggleSidebar}
                    >
                        Toggle Sidebar
                    </button>

                    <h1 className="text-2xl mt-4">My Account</h1>
                    {userData ? (
                        <div>
                            <h1>Welcome, {userData.name}!</h1>

                            {/* Display profile picture */}
                            <div className="mt-4 text-center">
                                {userData?.user_image_ref ? (
                                    <img 
                                        src={`http://localhost:3000${userData.user_image_ref}`} 
                                        alt="Profile Picture" 
                                        className="w-32 h-32 rounded-full object-cover mx-auto"
                                    />
                                ) : (
                                    <p className="text-gray-500">User does not have an image</p>
                                )}
                            </div>

                            {/* Upload new profile picture */}
                            <form onSubmit={handleFileUpload} className="mt-6 text-center">
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleFileChange} 
                                    className="block mb-4 p-2 border border-gray-300 rounded-md mx-auto"
                                />
                                <button
                                    type="submit"
                                    className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Upload New Profile Picture
                                </button>
                            </form>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;