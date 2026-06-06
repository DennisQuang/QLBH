import { useState, useEffect, useRef } from 'react'

// Dummy Data
const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    name: 'Bánh ăn kiêng Oat Krunch',
    price: 45000,
    category: 'Bánh ăn kiêng',
    emoji: '🍪',
    gradient: 'from-amber-400 to-orange-500'
  },
  {
    id: 'p2',
    name: 'Ngũ cốc Calbee Trái Cây 800g',
    price: 155000,
    category: 'Ngũ cốc',
    emoji: '🥣',
    gradient: 'from-rose-400 to-red-500'
  },
  {
    id: 'p3',
    name: 'Yến mạch Quaker Oats Gold',
    price: 85000,
    category: 'Yến mạch',
    emoji: '🌾',
    gradient: 'from-yellow-400 to-amber-500'
  },
  {
    id: 'p4',
    name: 'Kẹo dẻo Haribo Goldbears 150g',
    price: 32000,
    category: 'Kẹo',
    emoji: '🧸',
    gradient: 'from-green-400 to-emerald-500'
  },
  {
    id: 'p5',
    name: 'Bánh quy bơ Danisa hộp thiếc',
    price: 120000,
    category: 'Bánh ăn kiêng',
    emoji: '🥮',
    gradient: 'from-yellow-300 to-orange-400'
  },
  {
    id: 'p6',
    name: 'Kẹo sâm không đường Hàn Quốc',
    price: 65000,
    category: 'Kẹo',
    emoji: '🍬',
    gradient: 'from-purple-400 to-indigo-500'
  },
  {
    id: 'p7',
    name: 'Yến mạch ngũ cốc ăn liền',
    price: 75000,
    category: 'Yến mạch',
    emoji: '🍇',
    gradient: 'from-teal-400 to-cyan-500'
  }
]

const DUMMY_CUSTOMERS = [
  { id: 'c1', name: 'Chị Mai Tạp Hoá', phone: '0905123456', address: '12 Cầu Giấy, Hà Nội' },
  { id: 'c2', name: 'Đại lý Hùng Thịnh', phone: '0913987654', address: '45 Lê Lợi, Quận 1, TP. HCM' },
  { id: 'c3', name: 'Cửa hàng tiện lợi An Bình', phone: '0987111222', address: '78 Nguyễn Trãi, Thanh Xuân, Hà Nội' },
  { id: 'c4', name: 'Anh Minh Smart-Mart', phone: '0935333444', address: '102 Hải Phòng, Đà Nẵng' }
]

// Icons Components (Inline SVGs for modern style, scale and accessibility)
const Icons = {
  Catalog: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  Cart: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Customers: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  History: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  Settings: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Plus: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
    </svg>
  ),
  Minus: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4" />
    </svg>
  ),
  Trash: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Edit: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
    </svg>
  ),
  Copy: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
    </svg>
  ),
  Search: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  ArrowRight: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  ),
  Upload: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
  ),
  Download: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  ),
  Close: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  ProductPlaceholder: ({ emoji, gradient }) => (
    <div className={`w-full h-full bg-gradient-to-tr ${gradient || 'from-amber-400 to-orange-500'} flex items-center justify-center text-4xl shadow-inner select-none transition-transform duration-300 group-hover:scale-110`}>
      {emoji || '🍬'}
    </div>
  )
}

export default function App() {
  // Navigation Tabs state
  const [activeTab, setActiveTab] = useState('catalog')

  // Main Datastores with LocalStorage Persistence
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('qlbh_products')
    return saved ? JSON.parse(saved) : DUMMY_PRODUCTS
  })
  
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('qlbh_customers')
    return saved ? JSON.parse(saved) : DUMMY_CUSTOMERS
  })

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('qlbh_orders')
    return saved ? JSON.parse(saved) : []
  })

  // Cart & checkout process
  const [cart, setCart] = useState({}) // { [productId]: quantity }
  const [salesName, setSalesName] = useState(() => {
    return localStorage.getItem('qlbh_sales_name') || ''
  })
  const [customerForm, setCustomerForm] = useState({
    name: '',
    phone: '',
    address: ''
  })
  const [editingOrderId, setEditingOrderId] = useState(null)

  // Floating notifications
  const [toasts, setToasts] = useState([])

  // Modal receipt display
  const [activeReceipt, setActiveReceipt] = useState(null)

  // Catalog Tab Helpers
  const [activeCategory, setActiveCategory] = useState('Tất cả')

  // Settings Forms state
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'Bánh ăn kiêng', image: '' })
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', address: '' })

  const fileInputRef = useRef(null)
  const jsonImportRef = useRef(null)

  // Sync state stores to localStorage when changed
  useEffect(() => {
    localStorage.setItem('qlbh_products', JSON.stringify(products))
  }, [products])

  useEffect(() => {
    localStorage.setItem('qlbh_customers', JSON.stringify(customers))
  }, [customers])

  useEffect(() => {
    localStorage.setItem('qlbh_orders', JSON.stringify(orders))
  }, [orders])

  useEffect(() => {
    localStorage.setItem('qlbh_sales_name', salesName)
  }, [salesName])

  // Toast Handler
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9)
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }

  // Currency Formatter
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
  }

  // Cart Operations
  const handleAddToCart = (productId) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }))
    addToast('Đã thêm sản phẩm vào giỏ hàng!')
  }

  const handleDecreaseCart = (productId) => {
    setCart(prev => {
      const currentQty = prev[productId] || 0
      if (currentQty <= 1) {
        const updated = { ...prev }
        delete updated[productId]
        return updated
      }
      return {
        ...prev,
        [productId]: currentQty - 1
      }
    })
  }

  const handleRemoveFromCart = (productId) => {
    setCart(prev => {
      const updated = { ...prev }
      delete updated[productId]
      return updated
    })
    addToast('Đã xóa sản phẩm khỏi giỏ hàng', 'info')
  }

  // Get total count of cart items
  const getCartTotalCount = () => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0)
  }

  // Get total cart sum
  const getCartTotalAmount = () => {
    return Object.entries(cart).reduce((sum, [pId, qty]) => {
      const product = products.find(p => p.id === pId)
      return sum + (product ? product.price * qty : 0)
    }, 0)
  }

  // Generate Unique Order ID
  const generateOrderCode = () => {
    return 'DH-' + Math.floor(10000 + Math.random() * 90000)
  }

  // Checkout submission
  const handlePlaceOrder = (e) => {
    e.preventDefault()

    // Form valid validation
    if (!salesName.trim()) {
      addToast('Vui lòng điền tên Sales!', 'error')
      return
    }
    if (!customerForm.name.trim()) {
      addToast('Vui lòng điền tên khách hàng!', 'error')
      return
    }
    if (!customerForm.phone.trim()) {
      addToast('Vui lòng điền số điện thoại khách hàng!', 'error')
      return
    }
    if (Object.keys(cart).length === 0) {
      addToast('Giỏ hàng trống!', 'error')
      return
    }

    // Build items list
    const orderItems = Object.entries(cart).map(([pId, qty]) => {
      const product = products.find(p => p.id === pId)
      return {
        id: pId,
        name: product ? product.name : 'Sản phẩm không xác định',
        price: product ? product.price : 0,
        quantity: qty
      }
    })

    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    if (editingOrderId) {
      // Editing existing order mode
      const updatedOrders = orders.map(ord => {
        if (ord.id === editingOrderId) {
          return {
            ...ord,
            salesName: salesName.trim(),
            customerName: customerForm.name.trim(),
            customerPhone: customerForm.phone.trim(),
            customerAddress: customerForm.address.trim(),
            items: orderItems,
            total,
            date: new Date().toLocaleString('vi-VN')
          }
        }
        return ord
      })
      setOrders(updatedOrders)
      
      const updatedOrder = updatedOrders.find(ord => ord.id === editingOrderId)

      // Auto update or add to Customer directory if needed
      updateCustomerDirectory(customerForm.name.trim(), customerForm.phone.trim(), customerForm.address.trim())

      addToast('Cập nhật đơn hàng thành công!', 'success')
      setActiveReceipt(updatedOrder)
      setEditingOrderId(null)
    } else {
      // Create new order
      const newOrder = {
        id: Date.now().toString(),
        code: generateOrderCode(),
        date: new Date().toLocaleString('vi-VN'),
        salesName: salesName.trim(),
        customerName: customerForm.name.trim(),
        customerPhone: customerForm.phone.trim(),
        customerAddress: customerForm.address.trim(),
        items: orderItems,
        total
      }

      setOrders(prev => [newOrder, ...prev])
      updateCustomerDirectory(customerForm.name.trim(), customerForm.phone.trim(), customerForm.address.trim())
      
      addToast('Lên đơn hàng thành công!', 'success')
      setActiveReceipt(newOrder)
    }

    // Clear cart & checkout form
    setCart({})
    setCustomerForm({ name: '', phone: '', address: '' })
  }

  // Handle adding customer to list or updating customer count
  const updateCustomerDirectory = (name, phone, address) => {
    const existing = customers.find(c => c.phone.trim() === phone.trim())
    if (!existing) {
      const newCust = {
        id: 'c_' + Date.now(),
        name,
        phone,
        address
      }
      setCustomers(prev => [newCust, ...prev])
    } else {
      // Update address if it was empty and is now filled
      if (!existing.address && address) {
        setCustomers(prev => prev.map(c => c.id === existing.id ? { ...c, address } : c))
      }
    }
  }

  // Edit order flow
  const handleEditOrder = (order) => {
    setEditingOrderId(order.id)
    
    // Load products into cart
    const loadedCart = {}
    order.items.forEach(item => {
      loadedCart[item.id] = item.quantity
    })
    setCart(loadedCart)

    // Load customer data
    setCustomerForm({
      name: order.customerName,
      phone: order.customerPhone,
      address: order.customerAddress || ''
    })

    setSalesName(order.salesName)
    setActiveTab('cart')
    addToast(`Đang chỉnh sửa đơn ${order.code}`, 'info')
  }

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingOrderId(null)
    setCart({})
    setCustomerForm({ name: '', phone: '', address: '' })
    addToast('Đã hủy chỉnh sửa đơn hàng', 'info')
    setActiveTab('history')
  }

  // Delete Order
  const handleDeleteOrder = (orderId, orderCode) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa đơn hàng ${orderCode}?`)) {
      setOrders(prev => prev.filter(o => o.id !== orderId))
      addToast(`Đã xóa đơn hàng ${orderCode}`, 'info')
    }
  }

  // Customer Click -> Autofill checkout & redirect
  const handleSelectCustomerForCheckout = (customer) => {
    setCustomerForm({
      name: customer.name,
      phone: customer.phone,
      address: customer.address || ''
    })
    setActiveTab('cart')
    addToast(`Đã chọn khách hàng: ${customer.name}`)
  }

  // Excel CSV exporter (with BOM \uFEFF for Vietnamese accents support)
  const handleExportCSV = () => {
    if (orders.length === 0) {
      addToast('Không có đơn hàng nào để xuất!', 'error')
      return
    }

    let csvContent = '\uFEFF' // UTF-8 BOM
    csvContent += 'Mã đơn,Thời gian,Tên Sales,Tên Khách hàng,Số điện thoại,Địa chỉ,Sản phẩm,Tổng tiền (VND)\n'

    orders.forEach(order => {
      const itemsFormatted = order.items.map(i => `${i.name} (${i.quantity})`).join('; ')
      const escapeCsv = (text) => {
        if (!text) return ''
        const formatted = text.toString().replace(/"/g, '""')
        return formatted.includes(',') || formatted.includes('\n') || formatted.includes('"') ? `"${formatted}"` : formatted
      }

      csvContent += [
        escapeCsv(order.code),
        escapeCsv(order.date),
        escapeCsv(order.salesName),
        escapeCsv(order.customerName),
        escapeCsv(order.customerPhone),
        escapeCsv(order.customerAddress),
        escapeCsv(itemsFormatted),
        order.total
      ].join(',') + '\n'
    })

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `DSDonHang_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    addToast('Xuất file CSV thành công!')
  }

  // Copy details formatted for Zalo with Emoji
  const handleCopyZalo = (order) => {
    let itemsText = ''
    order.items.forEach((item, index) => {
      itemsText += `${index + 1}. ${item.name} x${item.quantity}: ${formatCurrency(item.price * item.quantity)}\n`
    })

    const text = `🍭 *PHIẾU GIAO HÀNG BÁNH KẸO* 🍭\n` +
      `-----------------------------------\n` +
      `📌 *Mã đơn:* ${order.code}\n` +
      `⏰ *Thời gian:* ${order.date}\n` +
      `👤 *Nhân viên Sales:* ${order.salesName}\n` +
      `🤝 *Khách hàng:* ${order.customerName}\n` +
      `📞 *Số điện thoại:* ${order.customerPhone}\n` +
      `${order.customerAddress ? `🏠 *Địa chỉ:* ${order.customerAddress}\n` : ''}` +
      `-----------------------------------\n` +
      `📦 *Danh sách hàng hoá:*\n${itemsText}` +
      `-----------------------------------\n` +
      `💰 *TỔNG CỘNG:* ${formatCurrency(order.total)}\n` +
      `-----------------------------------\n` +
      `🎉 *Cám ơn Quý khách! Chúc buôn may bán đắt!*`

    navigator.clipboard.writeText(text)
      .then(() => {
        addToast('Đã copy thông tin định dạng Zalo!')
      })
      .catch(() => {
        addToast('Lỗi khi sao chép clipboard', 'error')
      })
  }

  // Product Manager - Base64 uploader & Add Product
  const handleProductImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      addToast('Ảnh quá lớn! Vui lòng chọn ảnh nhỏ hơn 2MB', 'error')
      e.target.value = ''
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      setNewProduct(prev => ({
        ...prev,
        image: event.target.result
      }))
      addToast('Tải ảnh lên thành công!')
    }
    reader.readAsDataURL(file)
  }

  const handleAddProduct = (e) => {
    e.preventDefault()
    if (!newProduct.name.trim()) {
      addToast('Nhập tên sản phẩm!', 'error')
      return
    }
    if (!newProduct.price || isNaN(newProduct.price) || Number(newProduct.price) <= 0) {
      addToast('Nhập giá sản phẩm hợp lệ!', 'error')
      return
    }

    const brandGradients = [
      'from-amber-400 to-orange-500',
      'from-rose-400 to-red-500',
      'from-yellow-400 to-amber-500',
      'from-green-400 to-emerald-500',
      'from-purple-400 to-indigo-500',
      'from-teal-400 to-cyan-500'
    ]
    const randomGradient = brandGradients[Math.floor(Math.random() * brandGradients.length)]

    const newProdItem = {
      id: 'p_' + Date.now(),
      name: newProduct.name.trim(),
      price: Number(newProduct.price),
      category: newProduct.category,
      image: newProduct.image || null,
      emoji: '🍬',
      gradient: randomGradient
    }

    setProducts(prev => [...prev, newProdItem])
    setNewProduct({ name: '', price: '', category: 'Bánh ăn kiêng', image: '' })
    if (fileInputRef.current) fileInputRef.current.value = ''
    addToast('Thêm sản phẩm thành công!')
  }

  const handleDeleteProduct = (id, name) => {
    if (window.confirm(`Xóa sản phẩm "${name}"?`)) {
      setProducts(prev => prev.filter(p => p.id !== id))
      // Clean up in cart if exists
      if (cart[id]) {
        setCart(prev => {
          const updated = { ...prev }
          delete updated[id]
          return updated
        })
      }
      addToast(`Đã xóa sản phẩm ${name}`, 'info')
    }
  }

  // Customer Manager
  const handleAddCustomer = (e) => {
    e.preventDefault()
    if (!newCustomer.name.trim()) {
      addToast('Nhập tên khách hàng!', 'error')
      return
    }
    if (!newCustomer.phone.trim()) {
      addToast('Nhập số điện thoại!', 'error')
      return
    }

    const newCust = {
      id: 'c_' + Date.now(),
      name: newCustomer.name.trim(),
      phone: newCustomer.phone.trim(),
      address: newCustomer.address.trim()
    }

    setCustomers(prev => [newCust, ...prev])
    setNewCustomer({ name: '', phone: '', address: '' })
    addToast('Thêm khách hàng thành công!')
  }

  const handleDeleteCustomer = (id, name) => {
    if (window.confirm(`Xóa khách hàng "${name}"?`)) {
      setCustomers(prev => prev.filter(c => c.id !== id))
      addToast(`Đã xóa khách hàng ${name}`, 'info')
    }
  }

  // Backup & Restore
  const handleDownloadBackup = () => {
    const backupObj = {
      products,
      customers,
      orders
    }
    const blob = new Blob([JSON.stringify(backupObj, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `SalesConfectionery_Backup_${new Date().toISOString().slice(0, 10)}.json`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    addToast('Tải dữ liệu backup thành công!')
  }

  const handleImportBackup = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result)
        if (parsed.products && Array.isArray(parsed.products) &&
            parsed.customers && Array.isArray(parsed.customers) &&
            parsed.orders && Array.isArray(parsed.orders)) {
          
          setProducts(parsed.products)
          setCustomers(parsed.customers)
          setOrders(parsed.orders)
          addToast('Phục hồi dữ liệu backup thành công!', 'success')
        } else {
          addToast('File backup không đúng định dạng mẫu!', 'error')
        }
      } catch (err) {
        addToast('Lỗi đọc file JSON. File bị lỗi!', 'error')
      }
    }
    reader.readAsText(file)
    e.target.value = '' // reset
  }

  // Dynamic filter for Catalog Tab
  const categoriesList = ['Tất cả', 'Bánh ăn kiêng', 'Ngũ cốc', 'Yến mạch', 'Kẹo']
  const filteredProducts = activeCategory === 'Tất cả'
    ? products
    : products.filter(p => p.category === activeCategory)

  // Dynamic calculation of order count per customer
  const getCustomerStats = (phone) => {
    const count = orders.filter(o => o.customerPhone.trim() === phone.trim()).length
    return count
  }

  return (
    <div className="max-w-md w-full mx-auto h-screen bg-slate-50 flex flex-col relative shadow-2xl rounded-none md:rounded-[40px] md:border-[8px] md:border-slate-800 md:h-[840px] overflow-hidden transition-all duration-300">
      
      {/* Toast Notification Container */}
      <div className="absolute top-4 left-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`shadow-lg rounded-xl px-4 py-3 text-sm font-semibold flex items-center gap-2 transform transition-all duration-300 translate-y-0 scale-100 animate-bounce pointer-events-auto ${
              toast.type === 'success' ? 'bg-emerald-600 text-white' :
              toast.type === 'error' ? 'bg-rose-600 text-white' :
              'bg-blue-600 text-white'
            }`}
          >
            {toast.type === 'success' && <Icons.Check />}
            <span className="flex-1">{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Simulated Mobile Notch / Header */}
      <header className="bg-gradient-to-r from-orange-500 to-brand-600 text-white py-4 px-4 flex flex-col gap-1 shadow-md select-none shrink-0 relative">
        <div className="absolute top-1 left-0 right-0 flex justify-center opacity-30 text-[10px] tracking-widest hidden md:flex font-mono">
          ••••• SALES PRO DEVICE •••••
        </div>
        <div className="flex justify-between items-center mt-1">
          <div>
            <h1 className="text-xl font-bold tracking-tight flex items-center gap-1.5">
              <span>🍭</span> Confectionery Sales
            </h1>
            <p className="text-xs text-orange-100 font-medium">
              {salesName ? `Sales: ${salesName}` : 'Chưa nhập tên Sales'}
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold border border-white/10 flex items-center gap-1">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
            Online
          </div>
        </div>
      </header>

      {/* Content Scroller */}
      <main className="flex-1 overflow-y-auto pb-20 no-scrollbar flex flex-col bg-slate-50">
        
        {/* Tab 1: Catalog */}
        {activeTab === 'catalog' && (
          <div className="p-4 flex flex-col gap-4 animate-fadeIn">
            {/* Category Filter Bar */}
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar shrink-0 select-none">
              {categoriesList.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 border-2 shrink-0 ${
                    activeCategory === cat
                      ? 'bg-brand-500 text-white border-brand-500 shadow-md shadow-orange-100'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Cards List */}
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <span className="text-4xl mb-2">📦</span>
                <p className="text-sm font-medium">Không có sản phẩm nào</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3.5">
                {filteredProducts.map(product => {
                  const qtyInCart = cart[product.id] || 0
                  return (
                    <div key={product.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col overflow-hidden group hover:shadow-md transition-shadow duration-300">
                      {/* Product Thumbnail Container */}
                      <div className="aspect-square w-full relative overflow-hidden bg-slate-100 shrink-0">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <Icons.ProductPlaceholder emoji={product.emoji} gradient={product.gradient} />
                        )}
                        <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 bg-white/95 backdrop-blur-md text-slate-700 rounded-full shadow-sm border border-slate-100">
                          {product.category}
                        </span>
                      </div>
                      
                      {/* Info & Buy Button */}
                      <div className="p-3 flex-1 flex flex-col justify-between gap-2.5">
                        <div>
                          <h3 className="font-semibold text-slate-800 text-xs line-clamp-2 leading-tight">
                            {product.name}
                          </h3>
                          <p className="text-brand-600 text-sm font-bold mt-1">
                            {formatCurrency(product.price)}
                          </p>
                        </div>

                        {qtyInCart === 0 ? (
                          <button
                            onClick={() => handleAddToCart(product.id)}
                            className="w-full py-2 bg-brand-500 hover:bg-brand-600 active:scale-95 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Icons.Plus /> Chọn mua
                          </button>
                        ) : (
                          <div className="flex items-center justify-between border border-brand-200 bg-brand-50/50 rounded-xl overflow-hidden p-0.5">
                            <button
                              onClick={() => handleDecreaseCart(product.id)}
                              className="p-1.5 hover:bg-brand-100 active:scale-90 text-brand-600 rounded-lg transition-all cursor-pointer"
                            >
                              <Icons.Minus />
                            </button>
                            <span className="font-extrabold text-sm text-brand-700 px-2">
                              {qtyInCart}
                            </span>
                            <button
                              onClick={() => handleAddToCart(product.id)}
                              className="p-1.5 hover:bg-brand-100 active:scale-90 text-brand-600 rounded-lg transition-all cursor-pointer"
                            >
                              <Icons.Plus />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Cart */}
        {activeTab === 'cart' && (
          <div className="p-4 flex flex-col gap-5 animate-fadeIn">
            {/* Header info */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-1.5">
                <span>🛒</span> Giỏ hàng của bạn
              </h2>
              {editingOrderId && (
                <span className="text-[10px] font-extrabold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200 uppercase tracking-wider">
                  Chế độ sửa đơn
                </span>
              )}
            </div>

            {/* List of Cart Items */}
            {Object.keys(cart).length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <span className="text-4xl mb-2">🛒</span>
                <p className="text-sm font-medium">Giỏ hàng đang trống.</p>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="mt-4 px-4 py-2 bg-brand-500 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  Đến Trang Sản Phẩm
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {Object.entries(cart).map(([productId, qty]) => {
                  const product = products.find(p => p.id === productId)
                  if (!product) return null
                  return (
                    <div key={productId} className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm relative">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100 relative">
                        {product.image ? (
                          <img src={product.image} className="w-full h-full object-cover" />
                        ) : (
                          <Icons.ProductPlaceholder emoji={product.emoji} gradient={product.gradient} />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-800 text-xs truncate">{product.name}</h4>
                        <p className="text-slate-400 text-[10px]">{product.category}</p>
                        <p className="text-brand-600 text-xs font-bold mt-0.5">
                          {formatCurrency(product.price)}
                        </p>
                      </div>

                      {/* Add/Remove */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 p-0.5 shrink-0">
                          <button
                            onClick={() => handleDecreaseCart(productId)}
                            className="p-1 hover:bg-slate-200 rounded text-slate-600 transition-colors"
                          >
                            <Icons.Minus />
                          </button>
                          <span className="font-bold text-xs text-slate-700 px-2">
                            {qty}
                          </span>
                          <button
                            onClick={() => handleAddToCart(productId)}
                            className="p-1 hover:bg-slate-200 rounded text-slate-600 transition-colors"
                          >
                            <Icons.Plus />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemoveFromCart(productId)}
                          className="p-1 text-slate-300 hover:text-rose-500 rounded transition-colors cursor-pointer"
                        >
                          <Icons.Trash />
                        </button>
                      </div>
                    </div>
                  )
                })}

                {/* Subtotal card */}
                <div className="bg-brand-50/50 border border-brand-100 rounded-2xl p-4 flex justify-between items-center mt-2">
                  <span className="text-slate-600 font-bold text-sm">Tổng cộng:</span>
                  <span className="text-brand-600 font-extrabold text-lg">
                    {formatCurrency(getCartTotalAmount())}
                  </span>
                </div>
              </div>
            )}

            {/* Information Form */}
            <form onSubmit={handlePlaceOrder} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3.5 mt-2">
              <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2 flex items-center gap-1">
                <span>📋</span> Thông tin đơn hàng
              </h3>
              
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">TÊN NHÂN VIÊN SALES <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  placeholder="Nhập tên nhân viên sales..."
                  value={salesName}
                  onChange={(e) => setSalesName(e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">TÊN KHÁCH HÀNG <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  placeholder="Nhập tên khách hàng..."
                  value={customerForm.name}
                  onChange={(e) => setCustomerForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">SỐ ĐIỆN THOẠI <span className="text-rose-500">*</span></label>
                  <input
                    type="tel"
                    placeholder="Nhập số điện thoại khách..."
                    value={customerForm.phone}
                    onChange={(e) => setCustomerForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">ĐỊA CHỈ (KHÔNG BẮT BUỘC)</label>
                <textarea
                  placeholder="Nhập địa chỉ chi tiết khách hàng..."
                  value={customerForm.address}
                  onChange={(e) => setCustomerForm(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium h-16 resize-none"
                />
              </div>

              {/* Action checkout buttons */}
              <div className="flex gap-2.5 mt-2">
                {editingOrderId ? (
                  <>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="flex-1 py-3 border-2 border-slate-200 hover:border-slate-300 text-slate-600 font-bold rounded-xl text-xs active:scale-95 transition-all text-center"
                    >
                      Hủy Sửa
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl text-xs active:scale-95 transition-all shadow-md shadow-orange-100 flex items-center justify-center gap-1.5"
                    >
                      <Icons.Check /> Cập nhật đơn
                    </button>
                  </>
                ) : (
                  <button
                    type="submit"
                    className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl text-xs active:scale-95 transition-all shadow-md shadow-orange-100 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>🚀</span> Lên đơn hàng
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Tab 3: Customers */}
        {activeTab === 'customers' && (
          <div className="p-4 flex flex-col gap-4 animate-fadeIn">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-1.5">
              <span>👥</span> Danh bạ khách hàng
            </h2>

            {/* Customer Add form */}
            <form onSubmit={handleAddCustomer} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3">
              <h3 className="font-bold text-slate-700 text-xs uppercase tracking-wider">Thêm khách hàng mới</h3>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Tên khách hàng *"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, name: e.target.value }))}
                  className="text-xs border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-brand-500"
                  required
                />
                <input
                  type="tel"
                  placeholder="Số điện thoại *"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, phone: e.target.value }))}
                  className="text-xs border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-brand-500"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Địa chỉ giao hàng (Tùy chọn)"
                value={newCustomer.address}
                onChange={(e) => setNewCustomer(prev => ({ ...prev, address: e.target.value }))}
                className="text-xs border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-brand-500"
              />
              <button
                type="submit"
                className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                + Thêm vào danh bạ
              </button>
            </form>

            {/* List of Directory customers */}
            <div className="flex flex-col gap-3 mt-1">
              {customers.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-sm">Không có khách hàng nào.</div>
              ) : (
                customers.map(cust => {
                  const oCount = getCustomerStats(cust.phone)
                  return (
                    <div key={cust.id} className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between gap-2.5">
                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-800 text-sm truncate">{cust.name}</h4>
                        <p className="text-slate-500 text-xs font-semibold mt-0.5">{cust.phone}</p>
                        {cust.address && (
                          <p className="text-slate-400 text-[10px] mt-0.5 truncate max-w-[240px]">
                            📍 {cust.address}
                          </p>
                        )}
                        <span className="inline-block mt-1.5 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-orange-50 text-brand-700 border border-orange-100">
                          Đã mua: {oCount} đơn
                        </span>
                      </div>
                      
                      <button
                        onClick={() => handleSelectCustomerForCheckout(cust)}
                        className="px-3.5 py-2 bg-brand-500 hover:bg-brand-600 active:scale-95 text-white font-bold text-xs rounded-xl transition-all shadow-sm shrink-0 flex items-center gap-1 cursor-pointer"
                      >
                        Chọn lên đơn <Icons.ArrowRight />
                      </button>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}

        {/* Tab 4: History */}
        {activeTab === 'history' && (
          <div className="p-4 flex flex-col gap-4 animate-fadeIn">
            {/* Header info & Export Excel */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-1.5">
                <span>📜</span> Lịch sử đơn hàng
              </h2>
              {orders.length > 0 && (
                <button
                  onClick={handleExportCSV}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                >
                  <Icons.Download /> Xuất Excel
                </button>
              )}
            </div>

            {/* List of Previous Orders */}
            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <span className="text-4xl mb-2">📜</span>
                <p className="text-sm font-medium">Chưa có đơn hàng nào được tạo.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {orders.map(order => (
                  <div key={order.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col gap-3.5 hover:shadow-md transition-shadow">
                    
                    {/* Header: ID & Time */}
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-extrabold text-brand-600 uppercase bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-md">
                          {order.code}
                        </span>
                        <p className="text-[10px] text-slate-400 font-semibold mt-1">{order.date}</p>
                      </div>
                      <span className="text-slate-800 font-extrabold text-sm">
                        {formatCurrency(order.total)}
                      </span>
                    </div>

                    {/* Customer & sales rep */}
                    <div className="bg-slate-50 p-2.5 rounded-xl text-xs flex flex-col gap-1">
                      <p className="text-slate-600 font-medium"><strong className="text-slate-700">Khách hàng:</strong> {order.customerName} ({order.customerPhone})</p>
                      <p className="text-slate-600 font-medium"><strong className="text-slate-700">Sales:</strong> {order.salesName}</p>
                      <p className="text-slate-500 text-[10px] truncate"><strong className="text-slate-700">Món:</strong> {order.items.map(i => `${i.name} (${i.quantity})`).join(', ')}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between gap-2.5 pt-1">
                      <button
                        onClick={() => setActiveReceipt(order)}
                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer flex-1 text-center"
                      >
                        Xem hoá đơn
                      </button>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditOrder(order)}
                          className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl transition-colors cursor-pointer"
                          title="Sửa đơn"
                        >
                          <Icons.Edit />
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order.id, order.code)}
                          className="p-2 border border-rose-200 hover:bg-rose-50 text-rose-500 rounded-xl transition-colors cursor-pointer"
                          title="Xoá đơn"
                        >
                          <Icons.Trash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Settings */}
        {activeTab === 'settings' && (
          <div className="p-4 flex flex-col gap-5.5 animate-fadeIn">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-1.5">
              <span>⚙️</span> Hệ thống & Cấu hình
            </h2>

            {/* Management block: Products */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
              <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">📦 Quản lý Sản phẩm</h3>
              
              <form onSubmit={handleAddProduct} className="flex flex-col gap-3.5">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">TÊN SẢN PHẨM *</label>
                    <input
                      type="text"
                      placeholder="Tên sản phẩm..."
                      value={newProduct.name}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-brand-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">GIÁ (VND) *</label>
                    <input
                      type="number"
                      placeholder="Giá..."
                      value={newProduct.price}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-brand-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">DANH MỤC *</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-brand-500 bg-white"
                    >
                      <option>Bánh ăn kiêng</option>
                      <option>Ngũ cốc</option>
                      <option>Yến mạch</option>
                      <option>Kẹo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">TẢI ẢNH (DƯỚI 2MB)</label>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleProductImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                      className="w-full text-xs border border-slate-200 hover:border-slate-300 rounded-xl px-3 py-2 outline-none text-slate-600 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Icons.Upload /> Chọn file
                    </button>
                  </div>
                </div>

                {newProduct.image && (
                  <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <img src={newProduct.image} className="w-12 h-12 object-cover rounded-lg border border-slate-300" />
                    <span className="text-[10px] text-slate-500 truncate max-w-[180px]">File ảnh đã chọn</span>
                    <button
                      type="button"
                      onClick={() => setNewProduct(prev => ({ ...prev, image: '' }))}
                      className="text-xs text-rose-500 hover:font-bold ml-auto"
                    >
                      Xóa
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-sm shadow-orange-100"
                >
                  + Tạo sản phẩm mới
                </button>
              </form>

              {/* Product catalog scrollable list */}
              <div className="max-h-60 overflow-y-auto mt-2 border border-slate-100 rounded-xl divide-y divide-slate-100">
                {products.map(prod => (
                  <div key={prod.id} className="p-2.5 flex items-center justify-between text-xs bg-slate-50/50 hover:bg-slate-50">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        {prod.image ? (
                          <img src={prod.image} className="w-full h-full object-cover" />
                        ) : (
                          <Icons.ProductPlaceholder emoji={prod.emoji} gradient={prod.gradient} />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-800 truncate">{prod.name}</p>
                        <p className="text-[9px] text-slate-400">{prod.category} - {formatCurrency(prod.price)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteProduct(prod.id, prod.name)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      <Icons.Trash />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Management block: Customers */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
              <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">👥 Quản lý Khách hàng</h3>
              <div className="max-h-60 overflow-y-auto border border-slate-100 rounded-xl divide-y divide-slate-100">
                {customers.map(cust => (
                  <div key={cust.id} className="p-2.5 flex items-center justify-between text-xs bg-slate-50/50 hover:bg-slate-50">
                    <div className="min-w-0">
                      <p className="font-bold text-slate-800">{cust.name}</p>
                      <p className="text-[10px] text-slate-400">{cust.phone}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteCustomer(cust.id, cust.name)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      <Icons.Trash />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Backup & Restore file actions */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
              <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">💾 Sao lưu & Khôi phục</h3>
              
              <div className="grid grid-cols-2 gap-3.5">
                <button
                  onClick={handleDownloadBackup}
                  className="py-3 border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Icons.Download />
                  <span>Tải file Backup</span>
                </button>
                
                <div>
                  <input
                    type="file"
                    accept=".json"
                    ref={jsonImportRef}
                    onChange={handleImportBackup}
                    className="hidden"
                  />
                  <button
                    onClick={() => jsonImportRef.current && jsonImportRef.current.click()}
                    className="w-full py-3 border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Icons.Upload />
                    <span>Nhập file Backup</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center text-[10px] text-slate-400 font-semibold select-none py-1">
              Confectionery Sales Manager v1.0.0 (Offline Mode)
            </div>
          </div>
        )}
      </main>

      {/* BOTTOM TAB BAR NAVIGATION */}
      <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 py-2.5 px-4 flex justify-between items-center z-40 select-none shadow-lg rounded-b-none md:rounded-b-[32px]">
        {/* Tab 1 */}
        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex flex-col items-center gap-1 flex-1 cursor-pointer transition-colors ${
            activeTab === 'catalog' ? 'text-brand-500 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Icons.Catalog />
          <span className="text-[10px]">Hàng hóa</span>
        </button>

        {/* Tab 2 (Cart) with Badge */}
        <button
          onClick={() => setActiveTab('cart')}
          className={`flex flex-col items-center gap-1 flex-1 cursor-pointer relative transition-colors ${
            activeTab === 'cart' ? 'text-brand-500 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className="relative">
            <Icons.Cart />
            {getCartTotalCount() > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white animate-pulse">
                {getCartTotalCount()}
              </span>
            )}
          </div>
          <span className="text-[10px]">Giỏ hàng</span>
        </button>

        {/* Tab 3 */}
        <button
          onClick={() => setActiveTab('customers')}
          className={`flex flex-col items-center gap-1 flex-1 cursor-pointer transition-colors ${
            activeTab === 'customers' ? 'text-brand-500 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Icons.Customers />
          <span className="text-[10px]">Khách hàng</span>
        </button>

        {/* Tab 4 */}
        <button
          onClick={() => setActiveTab('history')}
          className={`flex flex-col items-center gap-1 flex-1 cursor-pointer transition-colors ${
            activeTab === 'history' ? 'text-brand-500 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Icons.History />
          <span className="text-[10px]">Lịch sử</span>
        </button>

        {/* Tab 5 */}
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center gap-1 flex-1 cursor-pointer transition-colors ${
            activeTab === 'settings' ? 'text-brand-500 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Icons.Settings />
          <span className="text-[10px]">Cài đặt</span>
        </button>
      </nav>

      {/* PAPER RECEIPT DETAIL OVERLAY MODAL */}
      {activeReceipt && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white w-full max-h-[85%] rounded-[30px] shadow-2xl flex flex-col overflow-hidden animate-scaleUp">
            
            {/* Modal Header */}
            <div className="bg-slate-50 border-b border-slate-100 p-4.5 flex justify-between items-center shrink-0">
              <span className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">Chi tiết hóa đơn</span>
              <button
                onClick={() => setActiveReceipt(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <Icons.Close />
              </button>
            </div>

            {/* Paper Ticket Scroller */}
            <div className="flex-1 overflow-y-auto p-5 no-scrollbar bg-slate-100/50">
              {/* Paper Roll Wrapper */}
              <div className="bg-white border border-slate-200/60 shadow-md rounded-2xl relative p-5 select-text">
                
                {/* Torn pattern simulation */}
                <div className="absolute -top-1.5 left-0 right-0 h-1.5 bg-repeat-x bg-[linear-gradient(45deg,transparent_33.333%,#fff_33.333%,#fff_66.666%,transparent_66.666%),linear-gradient(-45deg,transparent_33.333%,#fff_33.333%,#fff_66.666%,transparent_66.666%)] bg-[size:10px_10px]" style={{ transform: 'rotate(180deg)' }}></div>

                {/* Receipt Title */}
                <div className="text-center mt-2 pb-4 border-b border-dashed border-slate-200 flex flex-col gap-1">
                  <h3 className="text-lg font-black text-slate-800 uppercase tracking-wide">PHIẾU GIAO HÀNG</h3>
                  <p className="text-[11px] font-extrabold text-brand-600 bg-orange-50 px-3 py-0.5 rounded-full border border-orange-100 inline-block mx-auto uppercase">
                    {activeReceipt.code}
                  </p>
                </div>

                {/* Main receipt details */}
                <div className="py-4 border-b border-dashed border-slate-200 text-xs flex flex-col gap-2">
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-400">Thời gian:</span>
                    <span className="text-slate-700 text-right">{activeReceipt.date}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-400">Nhân viên Sales:</span>
                    <span className="text-slate-700 text-right font-bold">{activeReceipt.salesName}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-400">Khách hàng:</span>
                    <span className="text-slate-700 text-right font-bold">{activeReceipt.customerName}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-400">Số điện thoại:</span>
                    <span className="text-slate-700 text-right">{activeReceipt.customerPhone}</span>
                  </div>
                  {activeReceipt.customerAddress && (
                    <div className="flex justify-between font-medium">
                      <span className="text-slate-400 shrink-0">Địa chỉ:</span>
                      <span className="text-slate-700 text-right ml-4 break-words max-w-[200px]">{activeReceipt.customerAddress}</span>
                    </div>
                  )}
                </div>

                {/* Items List */}
                <div className="py-4 border-b border-dashed border-slate-200">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2.5">Hàng hóa giao</span>
                  <div className="flex flex-col gap-3">
                    {activeReceipt.items.map((item, index) => (
                      <div key={item.id} className="flex justify-between items-start text-xs font-semibold text-slate-800">
                        <span className="flex-1 min-w-0 pr-2">
                          {index + 1}. {item.name}
                          <p className="text-[10px] text-slate-400 mt-0.5">{item.quantity} x {formatCurrency(item.price)}</p>
                        </span>
                        <span className="shrink-0 text-slate-700">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total Payment display */}
                <div className="pt-4 flex justify-between items-center text-slate-800">
                  <span className="text-sm font-bold">Tổng thanh toán:</span>
                  <span className="text-lg font-black text-brand-600">
                    {formatCurrency(activeReceipt.total)}
                  </span>
                </div>

                {/* Thank message & QR barcode simulation */}
                <div className="text-center mt-6 pt-2 flex flex-col gap-2.5 items-center">
                  <p className="text-[10px] text-slate-400 italic">Cám ơn Quý khách! Hẹn gặp lại!</p>
                  
                  {/* Fake Barcode */}
                  <div className="flex flex-col items-center opacity-70">
                    <div className="flex items-center h-7 gap-[1px]">
                      <div className="w-[2px] h-full bg-slate-900"></div>
                      <div className="w-[1px] h-full bg-slate-900"></div>
                      <div className="w-[3px] h-full bg-slate-900"></div>
                      <div className="w-[1px] h-full bg-slate-900"></div>
                      <div className="w-[2px] h-full bg-slate-900"></div>
                      <div className="w-[4px] h-full bg-slate-900"></div>
                      <div className="w-[1px] h-full bg-slate-900"></div>
                      <div className="w-[2px] h-full bg-slate-900"></div>
                      <div className="w-[3px] h-full bg-slate-900"></div>
                      <div className="w-[1px] h-full bg-slate-900"></div>
                      <div className="w-[2px] h-full bg-slate-900"></div>
                      <div className="w-[4px] h-full bg-slate-900"></div>
                      <div className="w-[2px] h-full bg-slate-900"></div>
                      <div className="w-[1px] h-full bg-slate-900"></div>
                    </div>
                    <span className="text-[8px] font-mono text-slate-500 tracking-widest uppercase">{activeReceipt.code}</span>
                  </div>
                </div>

                {/* Torn bottom simulation */}
                <div className="absolute -bottom-1.5 left-0 right-0 h-1.5 bg-repeat-x bg-[linear-gradient(45deg,transparent_33.333%,#fff_33.333%,#fff_66.666%,transparent_66.666%),linear-gradient(-45deg,transparent_33.333%,#fff_33.333%,#fff_66.666%,transparent_66.666%)] bg-[size:10px_10px]"></div>

              </div>
            </div>

            {/* Modal Actions */}
            <div className="bg-slate-50 border-t border-slate-100 p-4.5 flex gap-3 shrink-0">
              <button
                onClick={() => handleCopyZalo(activeReceipt)}
                className="flex-1 py-3 bg-brand-500 hover:bg-brand-600 active:scale-95 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-orange-100 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Icons.Copy /> Copy Zalo
              </button>
              <button
                onClick={() => setActiveReceipt(null)}
                className="py-3 px-5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs active:scale-95 transition-all cursor-pointer"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
