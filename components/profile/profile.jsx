import { cancelTheSubscription, getSubscriptionData, getUser, updateUser } from "@/app/store/actions/dataActions";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userData,setUserData] = useState(null)
    const [selectedCountry, setSelectedCountry] = useState({});
    const [subscriptionData, setSubscriptionData] = useState(null)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNo: "",
        country: "",
        
    });
const options = useMemo(() => countryList().getData(), [])
const dispatch = useDispatch()

const getUserData = async () => {
    try {
        // setLoading(true);
        const response = await dispatch(getUser());

        console.log("User Response:", response);

        if (response?.status === 200) {
            const data = response.data;
            setFormData({
                name: data.name || "",
                email: data.email || "",
                phoneNo: data.phoneNo || "",
                country: data.country || "",
               
            });
            setSelectedCountry({ label: data.country , value:options.find(item => item.label === data.country).value } );
            setUserData(data);
        } else {
            setError("Failed to fetch user data.");
            toast.error("Couldn't fetch user! Try Loging in again!")
        }
    } catch (err) {
        console.error("Error fetching user data:", err);
        setError("An error occurred while fetching user data.");
        toast.error("An error occurred while fetching user data.");
    } finally {
        // setLoading(false);
    }
};

    const fetchSubscriptionData = async () => {
        try {
            const response = await dispatch(getSubscriptionData());

            console.log("Subscription Response:", response);

            if (response?.status === 200) {
                const data = response.data;
                setSubscriptionData(data);
            } else {
                setError("Failed to fetch subscription data.");
                toast.error("Couldn't fetch subscription data!")
            }
        } catch (err) {
            console.error("Error fetching subscription data:", err);
            toast.error("An error occurred while fetching subscription data.");
        }
    }

    useEffect(() => {
        getUserData()
        fetchSubscriptionData()
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const cancelSubscription = () => {
        try {
            dispatch(cancelTheSubscription()).then((item)=>{
                console.log("item????",item)
                toast.success("Subscription Cancelled Successfully")
                getUserData()
                fetchSubscriptionData()
            })
        } catch (error) {
            console.log(error)
            toast.error("Error Occurred while Cancelling the Subscription.")
        }
    };

    // const handleSaveClick = () => {
    //     setIsEditing(false);
    //     // You can add your save logic here
    // };

    const handleSaveClick = () => {
        console.log(selectedCountry)
        formData["country"] = selectedCountry.label;
        
        // Compare formData with userData and log the changed fields
        const changedFields = {};
        for (let key in formData) {
            if (formData[key] !== userData[key]) {
                changedFields[key] = formData[key];
            }
        }
    
        if (Object.keys(changedFields).length > 0) {
            console.log("Changed fields:", changedFields);

            dispatch(updateUser(changedFields,userData.id)).then((item)=>{
                console.log("item????",item)
                toast.success("Profile Updated Successfully")
                setIsEditing(false);
            })

        } else {
            console.log("No changes made.");
        }
        
        // You can add your save logic here
    };

    const formatDate = (dateString) => {
        if(!dateString)return "Not Available"
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    }
    
    
    

    return (
        <>
        <div className="bg-[rgb(0,43,66)] flex flex-col p-6">
        <div className="flex justify-center items-center mt-4 ">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[85%]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">{isEditing ? "Update profile" : "Profile"}</h2>
                    <img
                        src="/images/avatars/1.png"
                        alt="Profile"
                        className="w-16 h-16 rounded-full"
                    />
                </div>
                <form className="space-y-4">
                    <div>
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                            />
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
                    {/* <div>
                        <label className="block text-gray-700">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                        />
                    </div> */}
                    <div>
                            <label className="block text-gray-700">Country</label>
                            <Select 
                                options={options} 
                                name="country"  
                                value={selectedCountry} 
                                isDisabled={!isEditing} 
                                onChange={(selectedOption) => setSelectedCountry(selectedOption)}
                            />
                    </div>
                    <div>
                        <label className="block text-gray-700">Phone</label>
                        <input
                            type="text"
                            name="phoneNo"
                            value={formData.phoneNo}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                        />
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
                                className="bg-[rgb(0,43,66)]  text-white px-4 py-2 rounded hover:bg-[rgb(0,43,66)] "
                            >
                                Update Profile
                            </button>
                        )}
                    </div>
                </form>
                {subscriptionData &&
                <div className="bg-white py-8 rounded-lg w-full max-w-[85%] mt-8">
                    <div className="mb-6 border-b pb-3">
                        <h2 className="text-2xl font-semibold">Subscription</h2>
                        <p>Manage your profile settings and subscriptions.</p>
                    </div>
                    <div>
                        <div className="text-gray-700 py-2">
                            <div className="text-sm font-bold text-gray-400"> Subscription Plan </div>
                            <div>{subscriptionData.name} ( $ {subscriptionData.cost} )</div>
                        </div>
                        <div className="text-gray-700 py-2">
                            <div className="text-sm font-bold text-gray-400"> Subscription Started </div>
                            <div>{formatDate(userData.subscriptionStartDate)}</div>
                        </div>
                        <div className="text-gray-700 py-2">
                            <div className="text-sm font-bold text-gray-400"> Subscription Ended </div>
                            <div>{formatDate(userData.subscriptionEndDate)}</div>
                        </div>
                        <div className="text-gray-700 py-2">
                            <div className="text-sm font-bold text-gray-400"> Joined </div>
                            <div>{formatDate(userData.createdAt)}</div>
                        </div>
                        <div className="py-2">
                            <button
                                type="button"
                                onClick={cancelSubscription}
                                className="bg-[rgb(0,43,66)]  text-white px-4 py-2 rounded hover:bg-[rgb(0,43,66)] "
                            >
                                Cancel Subscription
                            </button>
                        </div>
                    </div>
                </div>
            }
            </div>
            
        </div>
        </div>
        <ToastContainer/>
        </>
    );
};

export default ProfilePage;
