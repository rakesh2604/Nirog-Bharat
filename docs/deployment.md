# Deployment Guide

This guide provides step-by-step instructions for deploying Nirog Bharat to production.

## Overview

- **Backend**: Deploy to [Render](https://render.com) (Node.js service)
- **Frontend**: Deploy to [Vercel](https://vercel.com) (Next.js application)
- **Database**: PostgreSQL (provided by Render)

---

## Backend Deployment (Render)

### Prerequisites

- GitHub account with access to the repository
- Render account (free tier available)

### Step 1: Create a New Web Service

1. Log in to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select the repository containing Nirog Bharat

### Step 2: Configure the Service

**Basic Settings:**
- **Name**: `nirog-bharat-api` (or your preferred name)
- **Region**: Choose closest to your users
- **Branch**: `main` (or your production branch)
- **Root Directory**: `apps/api`
- **Runtime**: `Node`

**Build & Deploy Settings:**
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### Step 3: Add Environment Variables

In the Render dashboard, add the following environment variables:

| Key | Value | Notes |
|-----|-------|-------|
| `PORT` | (leave empty) | Render provides this automatically |
| `DATABASE_URL` | (from Render PostgreSQL) | See Step 4 below |
| `JSON_RPC_PROVIDER` | Your RPC URL | e.g., Infura/Alchemy endpoint |
| `PRIVATE_KEY` | Your private key | ⚠️ Use Render's secret variables |
| `CONTRACT_ADDRESS` | Deployed contract address | Update after contract deployment |
| `NODE_VERSION` | `18` | Specify Node.js version |

> [!CAUTION]
> Never expose your `PRIVATE_KEY` in logs or public repositories. Use Render's environment variable encryption.

### Step 4: Add PostgreSQL Database

1. In Render dashboard, click **"New +"** → **"PostgreSQL"**
2. Create a new PostgreSQL database
3. Copy the **Internal Database URL**
4. Add it as `DATABASE_URL` environment variable in your web service

### Step 5: Run Database Migrations

After the first deployment, you need to run Prisma migrations:

1. Go to your web service in Render
2. Click **"Shell"** tab
3. Run:
   ```bash
   cd apps/api
   npx prisma migrate deploy
   ```

### Step 6: Deploy

1. Click **"Create Web Service"**
2. Render will automatically build and deploy your backend
3. Note the service URL (e.g., `https://nirog-bharat-api.onrender.com`)

---

## Frontend Deployment (Vercel)

### Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier available)

### Step 1: Import Project

1. Log in to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository

### Step 2: Configure Project

**Framework Preset:** Next.js (auto-detected)

**Build Settings:**
- **Root Directory**: `apps/web`
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### Step 3: Add Environment Variables

Add the following environment variables in Vercel project settings:

| Key | Value | Notes |
|-----|-------|-------|
| `NEXT_PUBLIC_API_URL` | Your Render backend URL | e.g., `https://nirog-bharat-api.onrender.com` |
| `NEXT_PUBLIC_RPC_URL` | Your blockchain RPC URL | e.g., Infura/Alchemy endpoint |
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | Deployed contract address | Update after contract deployment |

> [!IMPORTANT]
> All environment variables for Next.js client-side code must be prefixed with `NEXT_PUBLIC_`

### Step 4: Deploy

1. Click **"Deploy"**
2. Vercel will automatically build and deploy your frontend
3. Your app will be available at `https://your-project.vercel.app`

### Step 5: Configure Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Follow Vercel's DNS configuration instructions

---

## Smart Contract Deployment (Optional)

If you need to deploy the smart contract to a production network:

### Step 1: Configure Hardhat

1. Navigate to `packages/contracts`
2. Update `hardhat.config.ts` with your target network
3. Add network RPC URL and deployer private key to `.env`

### Step 2: Deploy Contract

```bash
cd packages/contracts
npx hardhat run scripts/deploy.js --network <your-network>
```

### Step 3: Update Environment Variables

After deployment, update the `CONTRACT_ADDRESS` in both:
- Backend Render service environment variables
- Frontend Vercel project environment variables

---

## Post-Deployment Verification

### Backend Health Check

Visit your backend URL:
```
https://your-backend.onrender.com/trpc
```

You should see TRPC endpoint information.

### Frontend Check

1. Visit your Vercel deployment URL
2. Test key user flows:
   - Patient dashboard
   - Doctor emergency access
   - Researcher queries
   - Pharma marketplace

### Database Verification

Check that Prisma migrations ran successfully:
```bash
# In Render shell
npx prisma db push
```

---

## Troubleshooting

### Backend Issues

**Build fails:**
- Check that `package.json` has correct `build` script
- Verify Node.js version compatibility
- Check build logs for TypeScript errors

**Database connection fails:**
- Verify `DATABASE_URL` is set correctly
- Ensure PostgreSQL database is running
- Check Prisma schema is up to date

**Port binding issues:**
- Ensure code uses `process.env.PORT`
- Don't hardcode port numbers

### Frontend Issues

**Build fails:**
- Check for TypeScript errors
- Verify all dependencies are in `package.json`
- Check Next.js version compatibility

**API calls fail:**
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check CORS configuration in backend
- Ensure backend is deployed and running

**Environment variables not working:**
- Verify all client-side vars have `NEXT_PUBLIC_` prefix
- Redeploy after adding new environment variables

---

## Monitoring and Maintenance

### Render

- Monitor service logs in Render dashboard
- Set up health check endpoints
- Configure auto-deploy on git push

### Vercel

- Monitor deployment logs
- Set up custom error pages
- Configure analytics (optional)

### Database

- Regular backups (Render provides automatic backups)
- Monitor database size and performance
- Plan for scaling as user base grows

---

## Security Checklist

- [ ] All private keys stored in encrypted environment variables
- [ ] CORS properly configured for production domains
- [ ] Database credentials not exposed in logs
- [ ] HTTPS enabled on all endpoints
- [ ] Rate limiting configured (if applicable)
- [ ] Authentication tokens properly secured

---

## Cost Considerations

**Free Tier Limits:**
- **Render**: 750 hours/month for web services, 90 days for PostgreSQL free tier
- **Vercel**: Unlimited deployments, 100GB bandwidth/month

**Scaling:**
- Both platforms offer paid tiers for production workloads
- Monitor usage and upgrade as needed

---

## Support

For deployment issues:
- Render: [Render Documentation](https://render.com/docs)
- Vercel: [Vercel Documentation](https://vercel.com/docs)
- Hardhat: [Hardhat Documentation](https://hardhat.org/docs)
