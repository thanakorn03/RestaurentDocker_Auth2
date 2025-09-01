import React from 'react';
import Card from './Card';
import { useAuthContext } from '../context/AuthContext';

const Restaurant = ({ restaurants = [], onRefresh }) => {
  const { user } = useAuthContext();

  const handleDelete = (id) => {
    console.log("🗑️ Delete called for ID:", id);
    if (onRefresh) onRefresh();
  };

  return (
    <div className="min-h-screen py-8">
      <div className='flex flex-wrap justify-center items-center gap-6 px-4'>
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => {
            const isOwner = user?.username === restaurant.owner; // owner check
            const isAdmin = user?.roles?.includes("admin"); // role check
            const canEditOrDelete = isOwner || isAdmin;

            return (
              <Card 
  key={restaurant.id}
  id={restaurant.id}
  name={restaurant.name}
  type={restaurant.type}
  imageURL={restaurant.imageURL}
  owner={restaurant.owner} // สำคัญ
  onDelete={handleDelete}
/>
            );
          })
        ) : (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-lg">ไม่มีข้อมูลร้านอาหาร</p>
            <p className="text-sm mt-2">
              {restaurants === null ? "กำลังโหลด..." : "ไม่พบร้านอาหาร"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurant;
