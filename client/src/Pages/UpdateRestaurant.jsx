import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Component/Navbar';
import Swal from 'sweetalert2';

const UpdateRestaurant = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState({
        name: '',
        type: '',
        imageURL: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/v1/restaurants/${id}`);
                if (!res.ok) throw new Error('Failed to fetch restaurant');
                const data = await res.json();
                setRestaurant({
                    name: data.name || '',
                    type: data.type || '',
                    imageURL: data.imageURL || '',
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'ไม่สามารถโหลดข้อมูลร้านอาหารได้',
                });
            }
            setLoading(false);
        };
        fetchRestaurant();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRestaurant((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:5000/api/v1/restaurants/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(restaurant),
            });
            if (res.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'อัปเดตร้านอาหารสำเร็จ',
                    timer: 1200,
                    showConfirmButton: false,
                });
                navigate('/');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'อัปเดตไม่สำเร็จ',
                    text: 'กรุณาตรวจสอบข้อมูลอีกครั้ง',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'ไม่สามารถอัปเดตร้านอาหารได้',
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200">
            <Navbar />
            <div className="flex flex-col items-center justify-center mt-10">
                <h1 className="text-4xl font-bold mb-6">Update Restaurant</h1>
                <div className="card w-full max-w-md bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img
                            src={restaurant.imageURL || "https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w="}
                            alt="Restaurant"
                            className="rounded-xl w-32 h-32 object-cover"
                        />
                    </figure>
                    <div className="card-body items-center text-responsive">
                        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">Restaurant Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Name here"
                                    className="input input-bordered w-full"
                                    name="name"
                                    onChange={handleChange}
                                    value={restaurant.name}
                                    required
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">Restaurant Type</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="ประเภทอาหาร"
                                    className="input input-bordered w-full"
                                    name="type"
                                    onChange={handleChange}
                                    value={restaurant.type}
                                    required
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">Image URL</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="URL รูปภาพ"
                                    className="input input-bordered w-full"
                                    name="imageURL"
                                    onChange={handleChange}
                                    value={restaurant.imageURL}
                                    required
                                />
                            </div>
                            <div className="card-actions justify-end">
                                <button type="submit" className="btn btn-primary w-full">
                                    Update Restaurant
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateRestaurant;