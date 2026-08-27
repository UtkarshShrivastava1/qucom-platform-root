# Viztore Platform Specifications[cite: 2]

## System Architecture: Customer (User-Side) App Guidelines[cite: 2]

### Viztore Feature Specification[cite: 2]

> "Building a connected retail commerce platform that helps local retailers digitize their businesses, makes products instantly discoverable, and creates a better shopping experience for customers. Built for Local Businesses. Made for India."[cite: 2]

---

### 1. Customer Home & Discovery Experience[cite: 2]

The Customer Web/Mobile App provides a unified discovery experience across local stores and products[cite: 2]. Upon opening the app, the customer lands on a dynamic home feed structured as follows[cite: 2]:

#### Location & Search Bar[cite: 2]
The header displays the customer's active delivery address (editable via a dropdown selector) alongside a persistent search bar supporting text and voice input for products, stores, and categories[cite: 2]. Quick-access icons for Wishlist, Cart (with live item count), Notifications, and Account are always visible[cite: 2].

#### Category Navigation Strip[cite: 2]
A horizontally scrollable strip (All, Men, Women, Kids, Fashion, Beauty, Home & Living, Footwear, Electronics, Accessories, Value Store) allows the customer to jump directly into a vertical[cite: 2]. An expandable "More" grid surfaces the complete category list[cite: 2].

#### Promotional Carousel[cite: 2]
An auto-rotating banner module highlights active deals (e.g., "Up to 50% Off") with a direct "Shop Now" call-to-action, backed by a paginated indicator[cite: 2].

#### Trust & Service Assurance Bar[cite: 2]
A persistent strip communicates platform guarantees: Fast Delivery, Easy Returns, Secure Payments, and 24x7 Support[cite: 2].

#### Stores Near You[cite: 2]
A horizontally scrollable rail of nearby stores displays a cover image, estimated travel time, store name, and aggregate rating, with a "See All" link into the full directory[cite: 2].

#### Best Deals for You[cite: 2]
A curated product grid displays discount badges, wishlist toggle, price with strike-through MRP, rating with review count, and the originating store name[cite: 2].

#### Explore Stores & Category Browsing[cite: 2]

* **All-Stores Directory View:** A dedicated "Explore Stores" screen lists every local store with its category filter chips (All, Fashion, Footwear, Electronics, Home & Living, Beauty, More)[cite: 2]. Each store card shows rating, review count, a short category description (e.g., "Clothing, Accessories, Footwear & more"), and a Fast Delivery badge[cite: 2].
* **Category Browse (Mega-Menu Layout):** Selecting a top-level category (e.g., Men's Fashion) opens a two-pane layout: a fixed left-hand rail listing all verticals (Trending Now, Men's/Women's/Kids' Fashion, Footwear, Beauty & Grooming, Home & Living, Electronics, Grocery & Staples, Automotive, Sports & Fitness, Toys/Kids/Baby, Books & Stationery, More Categories), and a right-hand content pane organized into themed sub-sections (e.g., Casual Wear, Work Wear, Occasion Wear) with circular product-type thumbnails and a "View all" link per section[cite: 2].

---

### 2. Product Discovery & Purchase Flow[cite: 2]

The platform supports a structured path from browsing to purchase, moving the customer through listing, detail, cart, and checkout stages[cite: 2].

#### Step 1: Product Listing Page[cite: 2]
* **Filtering & Sorting Toolbar:** Customers can refine results via Sort, Size, Color, Brand, and an advanced Filter panel[cite: 2]. A secondary chip row (Round Neck, V Neck, Polo, Printed, Striped, Full Sleeve, More) narrows by product sub-type[cite: 2]. Seasonal promotional tiles (e.g., "Trending T-Shirts", "Classic T-Shirts") are embedded within the grid[cite: 2].
* **Product Grid Cards:** Each card surfaces a discount badge, wishlist heart icon, product image, name, current and struck-through price, rating with review volume, and the fulfilling store name[cite: 2]. A persistent prepaid-discount strip and the standard trust-assurance bar anchor the bottom of the page[cite: 2].

#### Step 2: Product Detail Page (PDP)[cite: 2]
* **Media & Quick Actions:** A swipeable image carousel is paired with floating action icons for Wishlist, Share, and "Similar" products[cite: 2].
* **Purchase Configuration:** Displays product title, attributes (colour, fabric, fit), pricing with percentage discount, and rating summary[cite: 2]. Customers select Size (with a Size Chart link), Quantity (stepper control), and Colour (swatch selector) before choosing Add to Cart or Buy Now[cite: 2].
* **Product Details Panel:** An expandable section itemizes structured attributes (Weave Pattern, Transparency, Fit, Sustainable, Fabric) alongside a descriptive paragraph[cite: 2].
* **Delivery Details Panel:** Shows the resolved delivery address (with a Change option), estimated delivery date/time window and cost (or FREE), and a summarized Return Policy with a "Know More" link[cite: 2].
* **Ratings, Reviews & Recommendations:** An aggregate rating with a five-star distribution bar chart sits alongside individual written reviews[cite: 2]. "More Products For You" and "You May Also Like" carousels recommend adjacent SKUs[cite: 2].

#### Step 3: Cart Management[cite: 2]
* **Cart Summary:** The cart header shows the item count and a savings banner (e.g., "You're saving Rs. 350 on this order")[cite: 2]. Each line item displays image, name, variant, stock status, unit price with discount, a quantity stepper, a delete action, and a "Move to Wishlist" shortcut[cite: 2].
* **Coupon Application & Price Breakdown:** An "Apply Coupon / Offer" entry point leads to code redemption[cite: 2]. The Price Details panel itemizes Total MRP, Discount on MRP, Delivery Charges, and Total Amount, followed by a "Proceed to Checkout" call-to-action[cite: 2].

#### Step 4: Checkout[cite: 2]
* **Delivery Address Confirmation:** Displays the selected saved address (name, phone, full address, and label such as "Home") with a "Change" action to switch addresses[cite: 2].
* **Delivery Options:** Customers choose among three fulfilment modes: Reserve (hold the order for a specific date/time), Pickup (collect in-store), or Deliver (home delivery), each with a radio selector and descriptive sub-text[cite: 2].
* **Payment Methods:** Supported options include UPI, Credit/Debit Card, Net Banking, and Cash on Delivery (COD), each presented as a selectable row[cite: 2].
* **Order Summary & Placement:** A consolidated summary (item count, MRP, discount, delivery charge, total payable) sits above a sticky "Place Order" action, reinforced by Secure Payments, Easy Returns, and Top Quality trust badges[cite: 2].

---

### 3. Store Discovery Module[cite: 2]

* **Stores Near Me:** A location-aware directory (with a "Change" location control) lists stores filterable by category (All Stores, Fashion, Footwear, Electronics, Beauty, Home & Living) and sortable (e.g., Nearest First)[cite: 2]. Each entry shows an open/closing-soon status badge, rating, review count, category description, distance, and a Fast Delivery indicator[cite: 2].
* **Individual Store Storefront:** Selecting a store opens its dedicated page: a cover banner with open-status badge and follow/favourite icon, store name, rating, category description, distance, and service badges (Fast Delivery, Easy Returns)[cite: 2]. Below sit the trust-assurance bar and a merchandised product catalogue organized into New Arrival, Best Deals, and Top Picks For You sections, each with a "View All" link[cite: 2].

---

### 4. Customer Account Management[cite: 2]

The Account section centralizes profile, order, and preference management behind a consistent navigation shell[cite: 2].

* **Account Dashboard:** Surfaces the customer's name, phone, and email with an Edit Profile shortcut; order statistics (All Orders, To Be Delivered, Delivered, Returns) as tappable counters; quick links into Reserve Orders and Pickup Orders; a Favourite Stores rail; and a menu list covering My Addresses, Wishlist, Coupons & Offers, Sell on Viztore, Feedback, Help & Support, Privacy Policy, Terms & Conditions, and Logout[cite: 2].
* **Edit Profile:** Allows updates to profile picture, Full Name, Mobile Number, Email Address, Date of Birth, Gender, and Location, backed by a data-privacy assurance note and a "Save Changes" action[cite: 2].
* **My Orders:** A tabbed interface (All Orders, To Be Delivered, Delivered, Returns, Cancelled, plus dedicated Reserve and Pickup tabs) lists historical and active orders with order ID, date, status badge, item thumbnail, variant, quantity, amount, and an "Order Details" action[cite: 2]. Reserve and Pickup orders are visually distinguished with their own accent colour and status labels (e.g., "Reserved", "Ready for Pickup")[cite: 2].
* **Order Details & Tracking:** Displays delivery confirmation status, order/item summary with Download Bill and Buy Again actions, a Delivery OTP shown to the customer for handoff verification, a step-based Order Tracking timeline (Order Confirmed, Packed, Out for Delivery, Delivered), delivery address, and a Payment Summary (method, subtotal, delivery charges, total)[cite: 2]. Feedback and Need Help entry points close out the page[cite: 2].
* **My Addresses:** Manages multiple saved addresses (e.g., Home, Work, Parents' Home, Other), each labelled with an icon, full address, and phone number, with Edit/Delete actions and a single "Default Address" selection[cite: 2]. Backed by a data-security assurance note and an "Add New Address" action[cite: 2].
* **My Wishlist:** Lists saved items with variant selectors (size/colour), price, stock status, a "Move to Cart" action, and an overflow menu[cite: 2]. A "Share Wishlist" option and a Price Drop Alerts opt-in sit alongside the item count[cite: 2].
* **Coupons & Offers:** Segmented into All / Coupons / Bank Offers tabs, with a coupon-code redemption field, a list of available coupons (code, discount value, minimum order condition, validity, and expandable terms), and a grid of bank-specific instant-discount offers[cite: 2].
* **Sell on Viztore (Merchant Conversion Entry Point):** A dedicated in-app promotion invites customers to become merchants, explaining the value proposition (Local Customers, Grow Your Business, Secure & Reliable, Dedicated Support), a 3-step onboarding preview (Register, Verify & Setup, List & Sell), and a summary of seller tools (Promotions & Ads, Business Insights, Inventory Manager, Payouts)[cite: 2].
* **Feedback:** Captures an overall experience rating (Very Poor to Excellent via emoji scale), a feedback category selector (Overall Experience, Product Quality, Delivery Experience, Store Experience, App Experience), an optional free-text comment box (500-character limit), a 0-10 recommendation (NPS-style) scale, and an optional screenshot upload (up to 3 images) before submission[cite: 2].
* **Help & Support:** Offers a searchable help index, Quick Help tiles (Orders & Delivery, Returns & Refunds, Payments & Offers, Account & Profile, Selling on Viztore), a Top Help Topics FAQ list, and three direct Contact Us channels: Chat, Call, and Email[cite: 2].
* **Privacy Policy & Terms and Conditions:** Both are presented as structured informational pages: an intro summary, a Key Highlights card grid (e.g., Secure, Your Data, No Spam, Your Control for Privacy; User Agreement, Use of Services, Your Responsibilities, Policy Updates for Terms), and a numbered, expandable table of contents covering the full policy body, dated with a last-updated timestamp[cite: 2].
* **Logout:** A confirmation screen explains the consequences of logging out (account secured, logged out of all devices, notifications stopped) alongside a data-safety assurance, with "Yes, Logout" and "Cancel" actions[cite: 2]. A follow-up confirmation screen acknowledges the logout and offers guest-mode shortcuts (Local Stores, Best Deals, Categories, Wishlist) plus a Login / Sign Up call-to-action[cite: 2].

---

### 5. Authentication State Handling[cite: 2]

* **Guest Browsing with Login Prompt:** When a customer is signed out, the app continues to allow limited browsing (Local Stores, Best Deals, Categories, Wishlist previews) while surfacing a persistent "Login / Sign Up" call-to-action, ensuring discovery is never fully gated behind authentication[cite: 2].