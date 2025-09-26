
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Store, Plus, Edit, Trash2, User, Eye, Search, Filter } from 'lucide-react';

const MarketplaceApp = () => {
  const [currentView, setCurrentView] = useState('customer'); // 'customer' or 'seller'
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Banann Boukannen',

      price: 150,
      category: 'Manje',
      description: 'Banann Boukannen fre nan Jacmel',
      seller: 'Marie Joseph',
      image: '🍌',
      stock: 50
    },
    {
      id: 2,
      name: 'Kafe Ayisyen',
      price: 500,
      category: 'Bwason',
      description: 'Kafe ble nan mòn yo',
      seller: 'Jean Baptiste',

      image: '☕',
      stock: 25
    },
    {
      id: 3,
      name: 'Artizana Ak Makout',
      price: 750,
      category: 'Atizana',
      description: 'Makout trese ak men nan kapab',
      seller: 'Rose Michel',
      image: '🧺',
      stock: 15
    }
  ]);
  

  const [cart, setCart] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    seller: '',
    stock: ''
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('');
  
  const categories = ['Manje', 'Bwason', 'Atizana', 'Rad', 'Teknoloji'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase

().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {

      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));

  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.category) {
      const product = {
        id: Date.now(),
        name: newProduct.name,

        price: parseInt(newProduct.price),
        category: newProduct.category,
        description: newProduct.description,
        seller: newProduct.seller || 'Moun ki ap vann',
        image: '📦',
        stock: parseInt(newProduct.stock) || 0
      };
      setProducts([...products, product]);
      setNewProduct({
        name: '',

        price: '',
        category: '',
        description: '',
        seller: '',
        stock: ''
      });
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price.toString(),
      category: product.category,

      description: product.description,
      seller: product.seller,
      stock: product.stock.toString()
    });
  };

  const handleUpdateProduct = () => {
    if (editingProduct && newProduct.name && newProduct.price && newProduct.category) {
      setProducts(products.map(produ

ct => 
        product.id === editingProduct.id 
          ? {
              ...product,
              name: newProduct.name,
              price: parseInt(newProduct.price),
              category: newProduct.category,
              description: newProduct.description,
              seller: newProduct.seller,
              stock: parseInt(newProduct.stock) || 0
            }

          : product
      ));
      setEditingProduct(null);
      setNewProduct({
        name: '',
        price: '',
        category: '',
        description: '',
        seller: '',
        stock: ''
      });
    }
  };

  const handleDeleteProduct = (productId) => {

    setProducts(products.filter(product => product.id !== productId));
  };

  const CustomerView = () => (
    <div className="space-y-6">
      {/* Header ak Search */}
      <div className="bg-blue-600 text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">🛒 Achte Pwodwi Yo</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 

relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Chèche pwodwi..."
              className="w-full pl-10 pr-4 py-2 rounded-lg text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select

            className="px-4 py-2 rounded-lg text-black"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Tout Kategori yo</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

        </div>
      </div>

      {/* Panier */}
      {cart.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-bold text-green-800 mb-2">Panier Ou ({cart.length} bagay)</h3>
          <div className="space-y-2">
            {cart.map(item => (
              <div key={item.id} className="flex items-center 

justify-between bg-white p-2 rounded">
                <span>{item.name} x{item.quantity}</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{item.price * item.quantity} HTG</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >

                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-2 border-t border-green-200">
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">Total: {getTotalPrice()} HTG</span>
              <button className="bg-green-600 text-white px-4 py-2 

rounded-lg hover:bg-green-700">
                Peye Achè Yo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Liste Pwodwi yo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} 

className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3 text-center">{product.image}</div>
            <h3 className="font-bold text-lg mb-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
            <div className="flex items-center justify-between mb-2">

              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                {product.category}
              </span>
              <span className="text-sm text-gray-500">Stock: {product.stock}</span>
            </div>
            <p className="text-sm text-gray-500 mb-3">Vendè: {product.seller}</p>
            <div className="flex items-center justify-between">
              <span className="font-bold text-xl text-

green-600">{product.price} HTG</span>
              <button
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" />

                {product.stock === 0 ? 'Pa gen' : 'Achte'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Pa gen pwodwi ki koresponn ak rechèch ou an</p>

        </div>
      )}
    </div>
  );

  const SellerView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-green-600 text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">🏪 Espas Vendè</h1>
        <p>Jere pwodwi ou yo ak wè vant yo</p>

      </div>

      {/* Ajoute/Modifye Pwodwi */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">
          {editingProduct ? 'Modifye Pwodwi' : 'Ajoute Nouvo Pwodwi'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"

            placeholder="Non pwodwi"
            className="border border-gray-300 rounded-lg px-4 py-2"
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
          />
          <input
            type="number"
            placeholder="Pri (HTG)"
            className="border border-gray-300 rounded-lg px-4 py-2"
            value={newProduct.price}

            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
          />
          <select
            className="border border-gray-300 rounded-lg px-4 py-2"
            value={newProduct.category}
            onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
          >
            <option value="">Chwazi kategori</option>

            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Kantite nan stock"
            className="border border-gray-300 rounded-lg px-4 py-2"
            value={newProduct.stock}
            onChange={(e) => 

setNewProduct({...newProduct, stock: e.target.value})}
          />
          <input
            type="text"
            placeholder="Non vendè"
            className="border border-gray-300 rounded-lg px-4 py-2"
            value={newProduct.seller}
            onChange={(e) => setNewProduct({...newProduct, seller: e.target.value})}
          />
        </div>
        <textarea

          placeholder="Deskripsyon pwodwi"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-4"
          rows="3"
          value={newProduct.description}
          onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
        />
        <div className="mt-4 flex gap-2">
          {editingProduct ? (
            <>

              <button
                onClick={handleUpdateProduct}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Mete Ajou
              </button>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setNewProduct({

                    name: '', price: '', category: '', description: '', seller: '', stock: ''
                  });
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Anile
              </button>
            </>
          ) : (
            <button
              onClick={handleAddProduct}

              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Ajoute Pwodwi
            </button>
          )}
        </div>
      </div>

      {/* Liste Pwodwi Vendè yo */}
      <div className="bg-white border border-gray-200 rounded-

lg p-6">
        <h2 className="text-xl font-bold mb-4">Pwodwi Ou Yo ({products.length})</h2>
        <div className="space-y-4">
          {products.map(product => (
            <div key={product.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{product.i

mage}</span>
                  <div>
                    <h3 className="font-bold">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {product.category}
                      </span>

                      <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                      <span className="font-bold text-green-600">{product.price} HTG</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditProduct(product)}

                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl 

mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <Store className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Mache Ayisyen</span>
            </div>
            <div className="flex items-center gap-4">
              <button

                onClick={() => setCurrentView('customer')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  currentView === 'customer' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ShoppingCart className="h-4 w-4" />
                Kliyan

              </button>
              <button
                onClick={() => setCurrentView('seller')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  currentView === 'seller' 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Store className="h-4 w-4" />

                Vendè
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'customer' ? <CustomerView /> : <SellerView />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-12">
        <p>&copy; 2025 Mache Ayisyen - Platfòm pou achte ak vann pwodwi nan Ayiti</p>
      </footer>
    </div>
  );
};

export default MarketplaceApp;
