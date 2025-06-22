import { useState } from 'react';
import UpdateOrderModal from './UpdateOrderModal';
import { Link } from 'react-router-dom';
import { useDeleteOrderMutation, useGetAllOrdersQuery } from '../../../../redux/features/orders/Order.Api';
import { formatDate } from '../../../../utils/dateFormater';

// Helper function to determine the color based on status
const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500';
    case 'processing':
      return 'bg-blue-500';
    case 'shipped':
      return 'bg-green-500';
    case 'completed':
      return 'bg-gray-500';
    default:
      return 'bg-gray-300';
  }
};

const ManageOrders = () => {

  const { data: orders, error, isLoading, refetch } = useGetAllOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId).unwrap();
      refetch();

    } catch (err) {
      console.error("Failed to delete order:", err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="section__container p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Orders</h2>

      {/* Orders Table */}
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b text-center">Order ID</th>
            <th className="py-3 px-4 border-b text-center">Customer</th>
            <th className="py-3 px-4 border-b text-center">Status</th>
            <th className="py-3 px-4 border-b text-center">Date</th>
            <th className="py-3 px-4 border-b text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders && orders.map((order, index) => (
            <tr key={index}>

              <td className="py-3 px-4 border-b text-center">
                {order?.orderId}
              </td>

              <td className="py-3 px-4 border-b text-center">
                {order?.email}
              </td>

              <td className="py-3 px-4 border-b text-center">
                <span className={`inline-block px-3 text-xs py-1 text-white rounded-full ${getStatusColor(order?.status)}`}>
                  {order?.status}
                </span>
              </td>

              {/* Date */}
              <td className="py-3 px-4 border-b text-center">
                {formatDate(order?.updatedAt)}
              </td>

              {/* Actions */}
              <td className="py-3 px-4 border-b space-x-4">
                <Link
                  to="#"
                  className="text-blue-500 hover:underline"
                >
                  View
                </Link>
                <button
                  onClick={() => handleEditOrder(order)}
                  className="text-green-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteOrder(order?._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Order Modal */}
      {selectedOrder && (
        <UpdateOrderModal order={selectedOrder} isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ManageOrders;
