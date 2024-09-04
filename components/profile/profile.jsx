import { getUser } from "@/app/store/actions/dataActions";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userData,setUserData] = useState(null)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        contactNumber: "",
        city: "",
        state: "",
    });

const dispatch = useDispatch()

const getUserData = async () => {
    try {
        // setLoading(true);
        const response = await dispatch(getUser());

        console.log("User Response:", response);

        if (response?.status === 200) {
            const data = response.data;
            setFormData({
                firstName: data.name || "",
                lastName: data.lastName || "",
                email: data.email || "",
                address: data.address || "",
                contactNumber: data.phoneNo || "",
                city: data.city || "",
                state: data.state || "",
            });
            setUserData(data);
        } else {
            setError("Failed to fetch user data.");
        }
    } catch (err) {
        console.error("Error fetching user data:", err);
        setError("An error occurred while fetching user data.");
    } finally {
        // setLoading(false);
    }
};

    useEffect(() => {
        getUserData()
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        // You can add your save logic here
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[85%]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">{isEditing ? "Edit profile" : "My Profile"}</h2>
                    <img
                        src="/images/avatars/1.png"
                        alt="Profile"
                        className="w-16 h-16 rounded-full"
                    />
                </div>
                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Contact Number</label>
                        <input
                            type="text"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700">City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">State</label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        {isEditing ? (
                            <>
                                <button
                                    type="button"
                                    onClick={handleSaveClick}
                                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                onClick={handleEditClick}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;
