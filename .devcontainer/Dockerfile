FROM alpine:latest

ENV TZ=Asia/Tokyo
RUN apk add --no-cache tzdata

RUN addgroup -g 1001 working-user
RUN adduser -u 1001 -G working-user -D working-user

USER working-user
RUN mkdir -p /home/working-user/dev
WORKDIR /home/working-user/dev
