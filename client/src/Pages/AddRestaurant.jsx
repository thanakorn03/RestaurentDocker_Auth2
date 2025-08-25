import React, { useState } from 'react';
import Navbar from '../Component/Navbar';
import Swal from "sweetalert2";

const AddRestaurant = () => {
    const [restaurant, setRestaurant] = useState({
    name: '',
    type: '',
    imageURL: '', // ต้องเป็น imageURL
});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRestaurant(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!restaurant.name || !restaurant.type || !restaurant.imageURL) {
            Swal.fire({
                icon: "warning",
                title: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
            });
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/v1/restaurants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(restaurant),
            });

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "เพิ่มร้านอาหารสำเร็จ",
                    timer: 1200,
                    showConfirmButton: false,
                });
                setRestaurant({ name: '', type: '', imageURL: '' });
            } else {
                const errorData = await response.json().catch(() => ({}));
                Swal.fire({
                    icon: "error",
                    title: "เพิ่มร้านอาหารไม่สำเร็จ",
                    text: errorData.message || response.statusText,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: "Error adding restaurant",
            });
        }
    };

    return (
        <div className="min-h-screen bg-base-200">
            <Navbar />
            <div className="flex flex-col items-center justify-center mt-10">
                <h1 className="text-4xl font-bold mb-6">Add Restaurant</h1>
                <div className="card w-full max-w-md bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img
                            src={restaurant.imageURL || "https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w="}
                            alt="Upload"
                            className="rounded-xl w-32 h-32 object-cover"
                        />
                    </figure>
                    <div className="card-body items-center text-responsive">
                        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">ชื่อร้านอาหาร</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={restaurant.name}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                    placeholder="กรุณากรอกชื่อร้านอาหาร"
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">ประเภทอาหาร</span>
                                </label>
                                <input
                                    type="text"
                                    name="type"
                                    value={restaurant.type}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                    placeholder="กรุณากรอกประเภทอาหาร"
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">URL รูปภาพ</span>
                                </label>
                                <input
                                    type="text"
                                    name="imageURL"
                                    value={restaurant.imageURL}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                    placeholder="กรุณากรอก URL รูปภาพ"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-4">เพิ่มร้านอาหาร</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRestaurant;