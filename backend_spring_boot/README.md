Food Order Platform:

Entities:

User:
    Long id;
	fullName;
	email;
	password;
	role;
	orders; //one to many relationship
	favorites
	addresses //one to many
	status;

Restaurant:
    id;
    owner;
    name;
    description;
    cuisineType;
    address;//one to one
    contactInformation;
    openingHours;
    reviews;
    orders;//one to many
    numRating;
    images;
    registrationDate;
    open;
    foods;//one to many

Food:
    id
    name
    description
    price
    foodCategory;//many to one
    images
    available
    restaurant; //many to one
    isVegetarian;
    isSeasonal;
    ingredients; //many to many
    creationDate;

Food Category:
     id
     name
     restaurant

Ingredients:
     id;
     name;
     restaurant; //many to one
     ingredients; //one to many

IngredientsItem:
     id;
    name;
    category; //many to one
    restaurant; //many to one
    inStock;

Order:

     id;
    customer; //many to one
    restaurant;// many to one
    totalAmount;
    orderStatus;
    createdAt;
    deliveryAddress; //many to one
    items; // one to many
    payment;
    totalItem;
    totalPrice;

OrderItem:

    id;
    food; //many to one
    quantity;
    totalPrice;
    ingredients;

Cart:

    id;
    customer; // one to one
    items; // one to many
    total;

CartItem:
     id;
    cart;
    food;
    quantity;
    ingredients;
    totalPrice;


