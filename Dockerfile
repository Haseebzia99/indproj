FROM localstack/localstack

# Set environment variables
ENV SERVICES=dynamodb
ENV DEFAULT_REGION=us-east-1
ENV AWS_DEFAULT_REGION=us-east-1
ENV EDGE_PORT=4566

# Create directory for init scripts
RUN mkdir -p /etc/localstack/init/ready.d

# Copy initialization script
COPY init-scripts/create-table.sh /etc/localstack/init/ready.d/
RUN chmod +x /etc/localstack/init/ready.d/create-table.sh

EXPOSE 4566

CMD ["docker-entrypoint.sh"]