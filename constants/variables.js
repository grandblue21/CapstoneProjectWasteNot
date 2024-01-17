const COLLECTIONS = {
    user: 'users',
    chat: 'chatbot_conversation',
    restaurants: 'admin_users',
    market_request: 'market_request',
    ingredients: 'inventory',
    ingredients_history: 'ingredients_history',
    sale_items: 'sale_items',
    menu: 'menu_dish',
    wishlist: 'wishlist',
    recommendation: 'recommendations'
}

const ROLES = {
    customer: 'customer',
    staff: 'staff'
}

const CATEGORIES = [
    'Meat',
    'Seafood',
    'Fruits',
    'Vegetable',
    'Dairy and Alternative',
    'Grains and Cereals',
    'Herbs and Spices',
    'Nuts and Seeds',
    'Condiments and Sauces',
    'Beverages',
    'Sweeteners'
]

const MENU_CATEGORIES = [
    'Main Dish',
     'Appetizer',
     'Breakfast Food',
     'Dessert',
     'Restaurant Specials',
     'Kiddy Meals',
     'Drinks and Beverages',
     'Salads'
]

const INGREDIENT_CLASSIFICATIONS = [
    {
        name: 'Main Ingredient',
        required: true
    },
    {
        name: 'Base Ingredient',
        required: true
    },
    {
        name: 'Secondary Ingredient',
        required: false
    },
    {
        name: 'Seasonings',
        required: false
    },
    {
        name: 'Accompaniments',
        required: false
    },
    {
        name: 'Binding Agents',
        required: false
    },
    {
        name: 'Aromatics',
        required: false
    },
    {
        name: 'Fats',
        required: false
    }
]

export { COLLECTIONS, ROLES, CATEGORIES, MENU_CATEGORIES, INGREDIENT_CLASSIFICATIONS };