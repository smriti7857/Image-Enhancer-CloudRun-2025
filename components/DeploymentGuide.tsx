
import React from 'react';

interface DeploymentGuideProps {
  onClose: () => void;
}

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <pre className="bg-gray-900 text-gray-300 p-4 rounded-md overflow-x-auto text-sm my-2">
    <code>{children}</code>
  </pre>
);

const CloseIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);


export const DeploymentGuide: React.FC<DeploymentGuideProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-base-200 text-gray-200 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
        <div className="sticky top-0 bg-base-300/80 backdrop-blur-sm p-5 border-b border-base-300 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Deploying to Cloud Run</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <CloseIcon className="w-7 h-7" />
            </button>
        </div>
        
        <div className="p-6 md:p-8 space-y-6">
          <p>This guide provides steps to deploy a containerized web application (like this React app) to Google Cloud Run.</p>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-brand-light">1. Prerequisites</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Google Cloud SDK (gcloud CLI) installed and authenticated.</li>
              <li>Docker installed on your local machine.</li>
              <li>A Google Cloud project with billing enabled.</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2 text-brand-light">2. Create a Dockerfile</h3>
            <p>Create a file named <code className="bg-gray-900 px-1 rounded-sm">Dockerfile</code> in your project root. This example is for a Vite-based React app.</p>
            <CodeBlock>
{`# Stage 1: Build the React application
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the static files with a lightweight web server
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`}
            </CodeBlock>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-brand-light">3. Build the Docker Image</h3>
            <p>Enable the Artifact Registry API and create a repository.</p>
            <CodeBlock>gcloud services enable artifactregistry.googleapis.com</CodeBlock>
            <CodeBlock>{`gcloud artifacts repositories create my-repo --repository-format=docker \\
    --location=us-central1 --description="My Docker repository"`}</CodeBlock>
            <p>Then, build and tag your Docker image. Replace <code className="bg-gray-900 px-1 rounded-sm">[PROJECT-ID]</code> with your Google Cloud Project ID.</p>
            <CodeBlock>{`docker build -t us-central1-docker.pkg.dev/[PROJECT-ID]/my-repo/image-enhancer:latest .`}</CodeBlock>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-brand-light">4. Push the Image to Artifact Registry</h3>
            <p>First, configure Docker to authenticate with Artifact Registry.</p>
            <CodeBlock>gcloud auth configure-docker us-central1-docker.pkg.dev</CodeBlock>
            <p>Then, push your image.</p>
            <CodeBlock>docker push us-central1-docker.pkg.dev/[PROJECT-ID]/my-repo/image-enhancer:latest</CodeBlock>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-brand-light">5. Deploy to Cloud Run</h3>
            <p>Deploy your container image to Cloud Run. This command will create a new service.</p>
            <CodeBlock>
{`gcloud run deploy image-enhancer-service \\
    --image=us-central1-docker.pkg.dev/[PROJECT-ID]/my-repo/image-enhancer:latest \\
    --platform=managed \\
    --region=us-central1 \\
    --allow-unauthenticated`}
            </CodeBlock>
            <p>After deployment, the command will output a service URL where you can access your live application.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
