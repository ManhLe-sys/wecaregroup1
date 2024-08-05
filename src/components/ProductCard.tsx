import React from "react";

interface ChiNhanh {
  id: string;
  cr44a_name: string;
  cr44a_iachi: string;
  statuscode: number;
  createdon: string;
  // Add more fields as needed
}

interface ProductCardProps {
  chiNhanh: ChiNhanh;
}

const ProductCard: React.FC<ProductCardProps> = ({ chiNhanh }) => {
  return (
    <div>
      <h2>{chiNhanh.cr44a_name}</h2>
      <p>
        <strong>Address:</strong> {chiNhanh.cr44a_iachi}
      </p>
      <p>Status Code: {chiNhanh.statuscode}</p>
      <p>Created On: {new Date(chiNhanh.createdon).toLocaleDateString()}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default ProductCard;
