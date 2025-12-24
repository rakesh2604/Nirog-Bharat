# Nirog Bharat (निरोग भारत)

**A Decentralized Health Data Sovereignty Platform for Bharat**

> Empowering citizens with complete ownership of their medical records through blockchain technology, Zero-Knowledge Proofs, and privacy-first architecture.

---

## 🎯 Problem Statement

India's healthcare system faces critical challenges:
- **Fragmented Medical Records**: Patient data scattered across hospitals with no unified access
- **Privacy Concerns**: Centralized databases vulnerable to breaches and misuse
- **Emergency Access Delays**: Critical patient information unavailable during golden hour emergencies
- **Research Barriers**: Lack of anonymized health data for medical research and drug development
- **Patient Disempowerment**: Citizens have no control over their own health data

## 💡 Our Solution

Nirog Bharat is a blockchain-powered healthcare infrastructure that puts citizens in control of their medical data while enabling:
- **Sovereign Health Records**: Cryptographically secured, patient-owned medical records
- **Emergency Break-Glass Access**: Instant access to critical patient data during emergencies
- **Privacy-Preserving Research**: Zero-Knowledge Proofs enable research without exposing personal data
- **Transparent Audit Trails**: Immutable blockchain logs of every data access
- **Incentivized Wellness**: NIROG token rewards for sharing anonymized health trends

---

## ✨ Key Features

### 👤 For Patients
- **Complete Data Ownership**: Your health records, your control
- **Consent Management**: Grant or revoke access to doctors and researchers
- **Emergency QR Code**: Instant access to critical health info during emergencies
- **Wellness Rewards**: Earn NIROG tokens for contributing to anonymized research
- **Audit Trail**: See exactly who accessed your data and when

### 👨‍⚕️ For Doctors
- **Patient Search**: Find and request access to patient records
- **Emergency Access**: Break-glass access during critical situations (Golden Hour)
- **Verified Credentials**: Blockchain-verified medical licenses
- **Audit Compliance**: All accesses permanently logged on-chain

### 🔬 For Researchers
- **ZK-Proof Queries**: Get aggregate health insights without accessing raw data
- **Anonymized Datasets**: Privacy-preserving access to population health trends
- **Verified Results**: Cryptographically proven query results
- **Ethical Research**: Built-in consent and privacy protection

### 💊 For Pharmaceutical Companies
- **Data Marketplace**: Purchase anonymized health trend data
- **Real-World Evidence**: Access to de-identified patient outcomes
- **Trend Analysis**: Population-level health insights for drug development
- **Compliance**: GDPR and privacy-law compliant data access

---

## 🚨 Emergency Mode (Golden Hour)

In critical medical emergencies, every second counts. Nirog Bharat's **Break-Glass Emergency Access** feature enables:

- **Instant Access**: Authorized doctors can access critical patient data immediately
- **Critical Information Display**: Allergies, chronic conditions, current medications, emergency contacts
- **One-Click Contact**: Direct calling to patient's emergency contacts
- **Immutable Audit**: Every emergency access permanently logged on blockchain
- **Post-Incident Review**: Patients can review who accessed their data during emergencies

This feature is designed for the **Golden Hour** - the critical first 60 minutes after a traumatic injury when immediate medical intervention can save lives.

---

## 🏗️ Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI, Radix UI
- **Icons**: Lucide React
- **State Management**: TRPC React Query Hooks

### Backend
- **Runtime**: Node.js
- **API**: TRPC (Type-safe RPC)
- **Database**: Prisma ORM with PostgreSQL (production) / SQLite (development)
- **Authentication**: NextAuth with wallet signatures

### Blockchain
- **Smart Contracts**: Solidity
- **Development**: Hardhat
- **Library**: Ethers.js
- **Network**: Ethereum-compatible chains

### Integration
- **MCP Server**: Model Context Protocol for AI assistant integration

---

## 📁 Repository Structure

```
nirog-bharat/
├── apps/
│   ├── web/          # Next.js Frontend (Patient, Doctor, Pharma, Researcher dashboards)
│   ├── api/          # Express + TRPC Backend
│   └── mcp-server/   # Model Context Protocol server for LLM integration
├── packages/
│   └── contracts/    # Solidity Smart Contracts (Hardhat)
├── docs/             # Technical documentation
│   ├── architecture.md
│   ├── deployment.md
│   └── env-setup.md
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MetaMask (for blockchain interactions)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nirog-bharat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   **Backend** (`apps/api/.env`):
   ```bash
   cp apps/api/.env.example apps/api/.env
   # Edit apps/api/.env with your configuration
   ```
   
   **Frontend** (`apps/web/.env`):
   ```bash
   cp apps/web/.env.example apps/web/.env
   # Edit apps/web/.env with your configuration
   ```

4. **Initialize the database**
   ```bash
   cd apps/api
   npx prisma migrate dev --name init
   cd ../..
   ```

5. **Run the development servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or run individually:
   npm run dev:api      # Backend only (http://localhost:3001)
   npm run dev:web      # Frontend only (http://localhost:3000)
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

---

## 🌐 Production Deployment

### Backend Deployment (Render)

1. Create a new Web Service on [Render](https://render.com)
2. Configure:
   - **Root Directory**: `apps/api`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
3. Add environment variables (see [deployment.md](docs/deployment.md))
4. Deploy!

### Frontend Deployment (Vercel)

1. Import project on [Vercel](https://vercel.com)
2. Configure:
   - **Root Directory**: `apps/web`
   - **Framework**: Next.js (auto-detected)
3. Add environment variables:
   - `NEXT_PUBLIC_API_URL`: Your Render backend URL
   - `NEXT_PUBLIC_RPC_URL`: Your blockchain RPC endpoint
   - `NEXT_PUBLIC_CONTRACT_ADDRESS`: Deployed contract address
4. Deploy!

**📖 Detailed deployment instructions**: [docs/deployment.md](docs/deployment.md)

---

## 🎬 Demo Flow (For Judges)

### Patient Journey
1. **Dashboard**: View your health records and wellness score
2. **Upload Record**: Add a new medical document (encrypted and stored)
3. **Consent Management**: Grant access to a specific doctor
4. **Emergency QR**: Generate emergency access QR code
5. **Audit Log**: Review who has accessed your data

### Doctor Journey
1. **Dashboard**: View your patients and recent activities
2. **Patient Search**: Find a patient by Health ID
3. **Request Access**: Request consent to view patient records
4. **Emergency Access**: Use break-glass access for critical situations
5. **View Records**: Access granted patient medical history

### Researcher Journey
1. **Dashboard**: View available datasets and query credits
2. **ZK Query**: Submit a Zero-Knowledge Proof query
   - Example: "How many patients aged 40-50 have diabetes?"
3. **View Results**: Get aggregate statistics without accessing raw data
4. **Purchase Data**: Buy anonymized dataset access

### Pharma Journey
1. **Dashboard**: View market trends and available datasets
2. **Data Marketplace**: Browse anonymized health trend data
3. **Purchase Dataset**: Acquire population health insights
4. **Trend Analysis**: Analyze disease prevalence and treatment outcomes

---

## 📚 Documentation

- **[Architecture Overview](docs/architecture.md)**: System design and data flow
- **[Environment Setup](docs/env-setup.md)**: Detailed configuration guide
- **[Deployment Guide](docs/deployment.md)**: Production deployment instructions

---

## 🔒 Security & Privacy

- **End-to-End Encryption**: All medical records encrypted before storage
- **Zero-Knowledge Proofs**: Research queries never expose individual data
- **Blockchain Audit**: Immutable logs of all data access
- **Consent-First**: Patients control who can access their data
- **GDPR Compliant**: Privacy-by-design architecture

---

## 🎯 Future Roadmap

- [ ] Multi-language support (Hindi, Tamil, Bengali, etc.)
- [ ] Mobile app (React Native)
- [ ] Integration with government health schemes (Ayushman Bharat)
- [ ] AI-powered health insights
- [ ] Telemedicine integration
- [ ] Insurance claim automation
- [ ] Wearable device integration

---

## 🤝 Contributing

This project was built during a 48-hour hackathon. Contributions are welcome!

---

## 📄 License

MIT License - see LICENSE file for details

---

## 🙏 Acknowledgments

Built with ❤️ for Bharat's healthcare future.

**Nirog Bharat** - Your Health, Your Control
