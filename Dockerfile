# syntax=docker/dockerfile:1

FROM node:24-alpine AS build
WORKDIR /app
RUN npm install -g pnpm@11

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

COPY . .
ARG NEXT_PUBLIC_ACCENT=orchid
ENV NEXT_PUBLIC_ACCENT=$NEXT_PUBLIC_ACCENT \
    NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

FROM nginxinc/nginx-unprivileged:1.29-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:8080/ >/dev/null || exit 1
