FROM debian:bookworm-slim

ENV TZ=Asia/Tokyo

RUN groupadd -g 1001 working-user
RUN useradd -m -g 1001 -u 1001 working-user

USER working-user
RUN mkdir -p /home/working-user/dev
WORKDIR /home/working-user/dev
