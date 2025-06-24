export const API_URL = process.env.REACT_APP_API_URL ?? "";

export const storeToken = 'ifarm_token'

export const statuses = {
    positive: ['active', 'good', 'done', 'accept', 'accepted', 'successful', 'completed', 'verified', 'yes', 'approved', 'passed', 'employed', 'paid', "delivered", true],
    pending: ['pending', 'draft', 'processing', 'reviewing', 'pending_approval', "preparing", "low", 'medium'],
    negative: ['unavailable', 'inactive', 'bad', 'reject', 'rejected', 'failed', 'no', 'denied', 'failed', 'declined', 'disapproved', 'cancelled', 'urgent', false],
    other: ['available', 'unresolved', 'registered', 'blocked', 'dispatched', "open", "close", 'high'],
}

export const DEFAULT_SIZE_UNIT = 'px'


export const mockProductData = [
  {
    name: "Organic Tomato Seeds",
    id: "#23454GH6JY7T6",
    category: "Seeds",
    price: "₦1,200",
    stock: 250,
    date: "2025-05-20",
    status: "Active",
    image: "/images/tomato.png",
  },
  {
    name: "Premium Fertilizer",
    id: "#23454GH6JY7T6",
    category: "Fertilizers",
    price: "₦3,500",
    stock: 100,
    date: "2025-05-18",
    status: "inactive",
    image: "/images/fertilizer.png",
  },
    {
    name: "Organic Tomato Seeds",
    id: "#23454GH6JY7T6",
    category: "Seeds",
    price: "₦1,200",
    stock: 250,
    date: "2025-05-20",
    status: "pending",
    image: "/images/tomato.png",
  },
  {
    name: "Premium Fertilizer",
    id: "#23454GH6JY7T6",
    category: "Fertilizers",
    price: "₦3,500",
    stock: 100,
    date: "2025-05-18",
    status: "Active",
    image: "/images/fertilizer.png",
  },
    {
    name: "Organic Tomato Seeds",
    id: "#23454GH6JY7T6",
    category: "Seeds",
    price: "₦1,200",
    stock: 250,
    date: "2025-05-20",
    status: "Active",
    image: "/images/tomato.png",
  },
  {
    name: "Premium Fertilizer",
    id: "#23454GH6JY7T6",
    category: "Fertilizers",
    price: "₦3,500",
    stock: 100,
    date: "2025-05-18",
    status: "pending",
    image: "/images/fertilizer.png",
  },
    {
    name: "Organic Tomato Seeds",
    id: "#23454GH6JY7T6",
    category: "Seeds",
    price: "₦1,200",
    stock: 250,
    date: "2025-05-20",
    status: "Active",
    image: "/images/tomato.png",
  },
  {
    name: "Premium Fertilizer",
    id: "#23454GH6JY7T6",
    category: "Fertilizers",
    price: "₦3,500",
    stock: 100,
    date: "2025-05-18",
    status: "Active",
    image: "/images/fertilizer.png",
  },
    {
    name: "Organic Tomato Seeds",
    id: "#23454GH6JY7T6",
    category: "Seeds",
    price: "₦1,200",
    stock: 250,
    date: "2025-05-20",
    status: "inactive",
    image: "/images/tomato.png",
  },
  {
    name: "Premium Fertilizer",
    id: "#23454GH6JY7T6",
    category: "Fertilizers",
    price: "₦3,500",
    stock: 100,
    date: "2025-05-18",
    status: "inactive",
    image: "/images/fertilizer.png",
  },
  // Add remaining rows...
];