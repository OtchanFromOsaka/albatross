FROM debian:bookworm-slim

ENV TZ=Asia/Tokyo

RUN groupadd -g 1001 albatross
RUN useradd -m -g 1001 -u 1001 albatross
USER albatross
RUN mkdir -p /home/albatross/dev
WORKDIR /home/albatross/dev
