# VIZTORE PLATFORM — FULL APPLICATION ARCHITECTURE & SYSTEM CONTEXT
# Target Audience: AI Coding Agents (Cursor, Windsurf, Claude Code, Cline)
# Platform Scope: Hyperlocal Multi-Vendor E-Commerce (3–4 km Radius)

---

## 1. HIGH-LEVEL SYSTEM TOPOLOGY

The Viztore platform is organized as a unified multi-app workspace with clean boundary separation:

```text
+---------------------------------------------------------------------------------------------------+
|                                       VIZTORE ECOSYSTEM                                           |
+------------------------------------+------------------------------------+-------------------------+
| Customer Mobile App                | Customer Web Storefront            | Merchant & Admin Panels |
| (React Native + Expo)              | (Next.js 14+ App Router)           | (React + Vite SPA)      |
| - GPS Location discovery           | - Server-Side Rendered (SSR)       | - 6-Step Store Onboard  |
| - 3-4km Store & Catalog Feed       | - Public SEO & OpenGraph Sharing   | - Live Orders Table     |
| - Cart, OTP, Checkout & Orders     | - Social Preview Metadata          | - Product Catalog Entry |
+------------------------------------+------------------------------------+-------------------------+
                                                  │
                                                  ▼ HTTPS / WSS
+---------------------------------------------------------------------------------------------------+
|                          BACKEND MODULAR MONOLITH (Node.js + TypeScript)                          |
|  - Domain Isolation: auth / stores / catalog / orders / delivery                                  |
|  - Real-Time Layer: Socket.io + @socket.io/redis-adapter                                          |
|  - Single-Store Cart Rule Enforced                                                                |
+-------------------------------------------------+-------------------------------------------------+
                                                  │
                         +------------------------+------------------------+
                         ▼                                                 ▼
+-------------------------------------------------+     +-------------------------------------------+
| MongoDB Atlas (Mongoose ODM)                    |     | Redis Cloud (Upstash / Memory Store)      |
| - Native 2dsphere Spatial Indexing              |     | - Socket.io Cross-Instance Event Bus      |
| - Polymorphic Attribute & Variant Pattern       |     | - Cart Session & Fast Key Caching         |
+-------------------------------------------------+     +-------------------------------------------+