FROM node:22-alpine

WORKDIR /app

COPY tool/package*.json ./tool/
COPY testProject/package*.json ./testProject/

RUN cd tool && npm install
RUN cd ../testProject && npm install || true

COPY . .

RUN chmod +x /app/tool/bin/index.js

ENV PATH="/app/tool/bin:${PATH}"

ENTRYPOINT ["node", "/app/tool/bin/index.js"]

CMD ["--help"]
