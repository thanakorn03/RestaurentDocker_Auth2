import React from 'react'
import Card from './Card'

const Restaurant = ({ restaurants = [], onRefresh }) => {
  // Debug: เช็คข้อมูลที่ได้รับ
  console.log("🏪 Restaurant component - restaurants:", restaurants);
  console.log("🏪 Restaurant component - restaurants length:", restaurants.length);
  console.log("🏪 Restaurant component - restaurants type:", typeof restaurants);

  const handleDelete = (deletedId) => {
    console.log("🗑️ Delete called for ID:", deletedId);
    if (onRefresh) {
      onRefresh();
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className='flex flex-wrap justify-center items-center gap-6 px-4'>
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => {
            console.log("🏪 Rendering restaurant:", restaurant); // Debug แต่ละ restaurant
            return (
              <Card 
                key={restaurant.id}
                id={restaurant.id}
                name={restaurant.name}
                type={restaurant.type}
                imageURL={restaurant.imageURL}
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
  )
}

export default Restaurant