FROM node:20-slim

# System setup (as root)
RUN apt-get update && \
    apt-get install -y git openssh-client sudo && \
    npm install -g pnpm && \
    rm -rf /var/lib/apt/lists/* && \
    # Create directories with correct permissions
    mkdir -p /app /home/node/.vscode-server/extensions && \
    chown -R node:node /app /home/node

# Switch to non-root user
USER node
WORKDIR /app

# Set PNPM environment variables
ENV PNPM_HOME=/app/.pnpm-store
ENV PATH=$PNPM_HOME:$PATH

# Copy dependency files
COPY --chown=node:node package.json pnpm-lock.yaml ./
COPY --chown=node:node prisma ./prisma

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy application code
COPY --chown=node:node . .

CMD ["pnpm", "dev"]
