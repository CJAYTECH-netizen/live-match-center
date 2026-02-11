# Deployment Guide - EPL Live Match Center

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit http://localhost:3000

## Deployment Platforms

### 1. Vercel (Recommended - Zero Config)

**Benefits:**
- Automatic deployments from Git
- Free tier available
- Global CDN
- Built-in analytics

**Steps:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set up automatic deployments
# Connect your GitHub repo at vercel.com
```

**Environment Variables:**
- `NEXT_PUBLIC_API_BASE_URL`: https://profootball.srv883830.hstgr.cloud
- `NEXT_PUBLIC_SOCKET_URL`: wss://profootball.srv883830.hstgr.cloud

### 2. Docker + Heroku

**Build and Push Docker Image:**
```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set NEXT_PUBLIC_API_BASE_URL=https://profootball.srv883830.hstgr.cloud

# Deploy using Docker
heroku container:push web
heroku container:release web
```

### 3. Docker + AWS ECS / AppRunner

**Create ECR Repository:**
```bash
aws ecr create-repository --repository-name live-match-center

# Build and push
docker build -t live-match-center .
docker tag live-match-center:latest <account-id>.dkr.ecr.<region>.amazonaws.com/live-match-center:latest
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/live-match-center:latest
```

### 4. DigitalOcean App Platform

**Via Web Dashboard:**
1. Connect GitHub repository
2. Create app from Dockerfile
3. Set environment variables
4. Deploy

**Or via CLI:**
```bash
# Install doctl
brew install doctl

# Authenticate
doctl auth init

# Deploy from spec
doctl apps create --spec app.yaml
```

### 5. Railway.app

**Simple Deploy:**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up
```

**Or connect GitHub:**
- Visit railway.app
- Connect GitHub repo
- Deploy automatically

## Environment Configuration

**Production (.env):**
```env
NODE_ENV=production
NEXT_PUBLIC_API_BASE_URL=https://profootball.srv883830.hstgr.cloud
NEXT_PUBLIC_SOCKET_URL=wss://profootball.srv883830.hstgr.cloud
```

**Development (.env.local):**
```env
NODE_ENV=development
NEXT_PUBLIC_API_BASE_URL=https://profootball.srv883830.hstgr.cloud
NEXT_PUBLIC_SOCKET_URL=wss://profootball.srv883830.hstgr.cloud
```

## Performance Checklist

- [ ] Enable compression (Vercel/CDN does this automatically)
- [ ] Set up caching headers properly
- [ ] Enable automatic image optimization
- [ ] Monitor bundle size (`npm run analyze`)
- [ ] Set up error tracking (Sentry)
- [ ] Enable analytics (Vercel Analytics)

## Monitoring & Logging

### Vercel Analytics
- Built-in Web Vitals
- Built-in Error reporting
- Custom events tracking

### External Services
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **DataDog**: Full observability

Installation:
```bash
npm install @sentry/nextjs
npm install logrocket
```

## Database (for Chat Persistence)

If you want to persist chat messages, add MongoDB:

```bash
npm install mongoose
```

Add to `.env`:
```env
MONGODB_URI=your_mongodb_connection_string
```

## API Rate Limiting

The backend has rate limits:
- Chat: Multiple messages per second may be rejected
- API: Standard rate limits apply

**Handle in client:**
```typescript
if (error.response?.status === 429) {
  // Rate limited - show user-friendly message
  toast.error("Please slow down");
}
```

## Scaling Considerations

### At 100 concurrent users:
- Current setup handles fine
- WebSocket connections scale well

### At 10,000 concurrent users:
- Consider load balancer
- Use Redis for Socket.IO adapter
- Scale to multiple server instances

**Setup Socket.IO with Redis:**
```typescript
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";

const pubClient = createClient();
const subClient = pubClient.duplicate();

io.adapter(createAdapter(pubClient, subClient));
```

## Disaster Recovery

### Backup Strategy
1. Backend snapshots (handled by backend team)
2. Monitor dashboard (no data to backup)

### Rollback Plan
```bash
# Revert to previous deployment
vercel rollback
# or
git revert <commit-hash> && git push
```

## Security Checklist

- [ ] HTTPS enforced (all platforms provide this)
- [ ] CSP headers configured
- [ ] XSS protection enabled (Next.js default)
- [ ] CSRF tokens (not needed for read-only WebSocket)
- [ ] Rate limiting on backend
- [ ] Input validation in chat
- [ ] No sensitive data in localStorage

## Health Checks

**Vercel:**
- Automatic health checks configured
- Auto-rollback on failed deployments

**Manual Health Check:**
```bash
curl https://your-app.com/api/health

# Should return:
# {"success": true, "data": {}}
```

## Cost Estimates

### Vercel Free Tier
- ✅ 12 GB bandwidth/month
- ✅ 100GB CDN cache
- ✅ Unlimited function invocations
- ✅ Perfect for this app

### Paid Options
- **Vercel Pro**: $20/month for increased limits
- **Docker (Heroku)**: $7/month dyno minimum
- **AWS**: Pay-as-you-go, typically $5-20/month for this scale
- **Railway/DigitalOcean**: $5-10/month

## Maintaining Deployed App

### Weekly
- Monitor error rates
- Check performance metrics
- Review chat messages for spam (if persisting)

### Monthly
- Review and update dependencies
- Check for security updates
- Analyze user behavior

### Quarterly
- Performance audit
- Load testing
- Plan new features

---

**Questions?** Check the main README.md or contact the team.
