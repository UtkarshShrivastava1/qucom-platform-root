# Viztore Platform Specifications[cite: 1]

## System Architecture: Admin & Merchant Portal Guidelines[cite: 1]

### Viztore Feature Specification[cite: 1]

> "Building a connected retail commerce platform that helps local retailers digitize their businesses, makes products instantly discoverable, and creates a better shopping experience for customers. Built for Local Businesses. Made for India."[cite: 1]

---

### 1. Merchant Registration & Onboarding Workflow[cite: 1]

The platform supports a multi-tenant dual-channel onboarding approach[cite: 1]. Merchants can self-register via a dedicated link on the Merchant Web App, or they can be manually onboarded directly by administrators from the Super Admin portal[cite: 1]. The registration flow utilizes the following structured sequence[cite: 1]:

#### Step 1: Account Creation[cite: 1]
**Authentication & Identity Setup**[cite: 1]
Input parameters include Mobile Number, Email Address, Create Password, and Confirm Password[cite: 1]. Upon submitting these details, the merchant clicks "Register and Continue" to move to validation[cite: 1].

#### Step 2: Legal & Identity Verification[cite: 1]
**GSTIN & PAN Integration**[cite: 1]
Input parameters require the merchant to enter their GSTIN[cite: 1]. A "Verify" action validates the GSTIN in real-time[cite: 1]. Following this, the merchant enters their PAN and Business Legal Name before proceeding[cite: 1].

#### Step 3: Electronic Signature[cite: 1]
**E-Sign Capture & Generation**[cite: 1]
Merchants must authorize their profile[cite: 1]. They are presented with two options: physically draw their signature on the screen, or click an "Add/Create" button which dynamically generates a formal electronic signature based on their verified legal name[cite: 1].

#### Step 4: Store Setup & Geolocation[cite: 1]
**Store Profile & Mapping**[cite: 1]
Input parameters include Merchant Full Name, Store Display Name, and Detailed Store Description[cite: 1]. The address is collected in a detailed format, accompanied by an interactive map interface allowing the merchant to drop a pin to accurately set their store's geographical coordinates[cite: 1].

#### Step 5: Business Operations Information[cite: 1]
**Categorization & Timings**[cite: 1]
* **Category Selection:** Merchants select their primary vertical (e.g., Fashion, Footwear, Jewellery, Electronics, Home & Living, Beauty & Care, Gifts, Sports & Fitness)[cite: 1].
* **Operating Hours:** Merchants define their precise daily Open and Close timings[cite: 1].
* **Operational Days:** Selection of active working days mapped to the specific operational timeframes (e.g., Monday, Tuesday, etc.)[cite: 1].

#### Step 6: Financial Details[cite: 1]
**Bank Account Mapping**[cite: 1]
The final onboarding step requires banking information to map payout logic and settlements to the merchant's account[cite: 1].

---

### 2. Approval Flow & Role-Based Provisioning[cite: 1]

Upon completion of the registration flow, the merchant profile enters an administrative validation queue before activation[cite: 1].

* **Super Admin Queue:** The submitted profile is routed to the Super Admin dashboard for review[cite: 1].
* **Approval & Activation:** Once the admin approves the request, the merchant's digital storefront becomes active[cite: 1].
* **Credential Dispatch:** Automated secure credentials are emailed directly to the merchant[cite: 1].
* **Admin Oversight:** The merchant's finalized credentials and dashboard access status are logged and displayed on the admin portal for ongoing management[cite: 1].

---

### 3. Merchant Dashboard Architecture[cite: 1]

After successful login, the merchant is routed to a comprehensive management dashboard equipped with a collapsible sidebar for efficient navigation[cite: 1].

#### Elaborated Core Features[cite: 1]
* **Dashboard (Landing Area):** The central analytics and operations hub[cite: 1]. It displays an overarching sales overview, real-time alerts for new orders, lists of top-selling products, and low stock warnings[cite: 1]. It also contains a 'Quick Access' panel for frequently used actions[cite: 1].
* **Orders Management:** A granular interface displaying all incoming customer transactions[cite: 1]. This view provides a drill-down into specific product details within the order and links customer information directly to the items purchased[cite: 1].
* **Products / Catalog:** The central engine for inventory onboarding[cite: 1].
  * **Add a Product:** A section dedicated to onboarding individual SKUs with relevant details[cite: 1].
  * **Bulk Upload:** Functionality designed to parse and ingest massive product lists simultaneously[cite: 1].
* **Marketing:** An integrated advertising module allowing merchants to configure and push promotional banners or localized ads directly to the Viztore Customer Web App, increasing discoverability[cite: 1].

#### Additional Dashboard Modules[cite: 1]
The sidebar features additional suites to complete the merchant's operational toolkit[cite: 1]:
* Inventory Management[cite: 1]
* Billing & POS (Customer Invoicing)[cite: 1]
* Wallet & Settlements[cite: 1]
* Expense Tracking[cite: 1]
* Asset Management[cite: 1]
* Returns & Refunds[cite: 1]
* Reports & Analytics[cite: 1]
* Store Management[cite: 1]
* General Settings[cite: 1]
* Support & Help Center[cite: 1]