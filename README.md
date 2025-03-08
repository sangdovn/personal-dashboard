This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, set up your environment variables:

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit the .env.local file and add your OpenAI API key
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment Variables

This project requires the following environment variables:

- `OPENAI_API_KEY`: Your OpenAI API key for the YouTube summarizer feature

## Deployment

### Using Docker Compose

1. Make sure you have Docker and Docker Compose installed on your server
2. Set up your environment variables in the docker-compose.yml file or in your CI/CD pipeline
3. Run the following commands:

```bash
# Pull the latest image
docker-compose pull

# Start the containers
docker-compose up -d
```

### Using GitHub Actions

This project includes a GitHub Actions workflow that automatically builds and deploys the application to your server. To use it:

1. Set up the following secrets in your GitHub repository:

   - `DOCKER_HUB_USERNAME`: Your Docker Hub username
   - `DOCKER_HUB_PASSWORD`: Your Docker Hub password
   - `SERVER_HOST`: Your server's hostname or IP address
   - `SERVER_USER`: SSH username for your server
   - `SERVER_SSH_KEY`: SSH private key for authentication
   - `OPENAI_API_KEY`: Your OpenAI API key

2. Push to the master branch to trigger the deployment

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
