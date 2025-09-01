import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import RestaurantService from '../service/Restuarent.service';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Card = ({ id, name, type, imageURL, owner, onDelete }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const canEditOrDelete = user && (user.username === owner || user.roles?.includes("admin"));

  const handleDelete = async () => {
    if (!canEditOrDelete) return;
    const confirm = await Swal.fire({
      title: `ลบร้าน ${name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก'
    });

    if (confirm.isConfirmed) {
      try {
        await RestaurantService.deleteRestaurant(id);
        Swal.fire({ icon: 'success', title: 'ลบสำเร็จ', timer: 1000, showConfirmButton: false });
        if (onDelete) onDelete(id);
      } catch (error) {
        Swal.fire({ icon: 'error', title: 'ลบไม่สำเร็จ', text: error.response?.data?.message || 'Error' });
      }
    }
  };

  const handleEdit = () => {
    if (!canEditOrDelete) return;
    navigate(`/update-restaurant/${id}`);
  };

  return (
    <div className="card bg-gray-800 w-96 shadow-lg rounded-lg overflow-hidden">
      <figure className="h-48 max-h-48 overflow-hidden">
        <img
          src={imageURL || "https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w="}
          alt={name}
          className="w-full h-full max-h-48 object-cover"
        />
      </figure>
      <div className="card-body p-4 text-white">
        <h2 className="card-title text-white text-lg font-semibold mb-2">{name}</h2>
        <p className="text-gray-300 text-sm mb-4">{type}</p>
        {canEditOrDelete && (
          <div className="card-actions justify-end gap-2">
            <button onClick={handleDelete} className="btn btn-error btn-sm px-4 py-2">
              Delete
            </button>
            <button onClick={handleEdit} className="btn btn-warning btn-sm px-4 py-2">
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
